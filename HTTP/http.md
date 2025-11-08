# HTTPサーバーの仕組み：OSレベルからアプリケーションレベルまで

## 概要

Go言語で`http.ListenAndServe(":8080", handler)`と書くだけで簡単にHTTPサーバーを起動できますが、この裏側では多層的な仕組みが動作しています。本ドキュメントでは、OSのシステムコールレベルから、ネットワークポーリング機構、HTTPプロトコル処理まで、階層的に解説します。

## アーキテクチャの全体像

HTTPサーバーは以下の階層で構成されています：

```
[アプリケーション層]
  ↓
[HTTPプロトコル層] (net/http/server.go)
  ↓
[TCP接続管理層] (net/tcpsock.go)
  ↓
[ファイルディスクリプタ管理層] (net/fd_unix.go, internal/poll)
  ↓
[ネットワークポーリング層] (runtime/netpoll.go, runtime/netpoll_kqueue.go)
  ↓
[OSシステムコール層] (syscall)
```

---

## 1. OSレベル：ソケットとシステムコール

### 1.1 ソケットの生成

HTTPサーバーの基盤となるのは、OSが提供する**ソケット**です。Go言語では`socket()`システムコールを使ってネットワーク通信用のファイルディスクリプタを生成します。

**実装箇所**: `net/sock_posix.go:18`

```go
func socket(ctx context.Context, net string, family, sotype, proto int,
            ipv6only bool, laddr, raddr sockaddr, ...) (fd *netFD, err error) {
    s, err := sysSocket(family, sotype, proto)
    // ...
}
```

**使用されるシステムコール**:
- `socket(AF_INET/AF_INET6, SOCK_STREAM, IPPROTO_TCP)`: TCPソケットを作成
- 返り値：ファイルディスクリプタ（整数値）

### 1.2 ソケットのバインドとリッスン

生成されたソケットを特定のアドレスとポートに紐付け、接続待ち状態にします。

**実装箇所**: `net/sock_posix.go:150-178`

```go
func (fd *netFD) listenStream(ctx context.Context, laddr sockaddr, backlog int, ...) error {
    // 1. ソケットオプションの設定
    if err = setDefaultListenerSockopts(fd.pfd.Sysfd); err != nil {
        return err
    }

    // 2. bind(): ソケットをアドレスに紐付け
    if err = syscall.Bind(fd.pfd.Sysfd, lsa); err != nil {
        return os.NewSyscallError("bind", err)
    }

    // 3. listen(): 接続待ち状態にする
    if err = listenFunc(fd.pfd.Sysfd, backlog); err != nil {
        return os.NewSyscallError("listen", err)
    }

    // 4. ネットワークポーリングに登録
    if err = fd.init(); err != nil {
        return err
    }
    return nil
}
```

**使用されるシステムコール**:
- `bind(fd, sockaddr, addrlen)`: ソケットをローカルアドレスに紐付け
- `listen(fd, backlog)`: 接続待ち行列を作成（backlogは待ち行列の最大長）

### 1.3 接続の受け入れ

クライアントからの接続要求を受け入れます。

**使用されるシステムコール**:
- `accept(listenfd, &clientaddr, &addrlen)`: 新しい接続を受け入れ、新しいファイルディスクリプタを返す

---

## 2. ネットワークポーリング層：効率的なI/O多重化

### 2.1 問題：ブロッキングI/Oの限界

単純に`accept()`や`read()`を呼ぶと、データが来るまでスレッドがブロック（待機）してしまいます。数千の接続を扱う場合、各接続にスレッドを割り当てるのは非効率です。

### 2.2 解決策：I/O多重化機構

OSは複数のファイルディスクリプタを効率的に監視する仕組みを提供しています：

- **Linux**: `epoll` (edge-triggered notification)
- **macOS/BSD**: `kqueue` (kernel event notification)
- **Windows**: `IOCP` (I/O Completion Ports)

Go言語のランタイムは、これらのOSネイティブな機構を利用してネットワークI/Oを非同期化します。

### 2.3 kqueueの仕組み（macOS/BSD）

**実装箇所**: `runtime/netpoll_kqueue.go`

#### 初期化

```go
func netpollinit() {
    kq = kqueue()  // kqueueファイルディスクリプタを生成
    if kq < 0 {
        throw("runtime: netpollinit failed")
    }
    closeonexec(kq)
}
```

**システムコール**: `kqueue()` - イベント通知用のファイルディスクリプタを返す

#### ファイルディスクリプタの登録

```go
func netpollopen(fd uintptr, pd *pollDesc) int32 {
    var ev [2]keventt
    ev[0].ident = fd
    ev[0].filter = _EVFILT_READ   // 読み込み可能イベント
    ev[0].flags = _EV_ADD | _EV_CLEAR  // エッジトリガーモード

    ev[1] = ev[0]
    ev[1].filter = _EVFILT_WRITE  // 書き込み可能イベント

    n := kevent(kq, &ev[0], 2, nil, 0, nil)
    return 0
}
```

**システムコール**: `kevent()` - イベントの登録と取得を行う

- `_EVFILT_READ`: ソケットが読み込み可能になったら通知
- `_EVFILT_WRITE`: ソケットが書き込み可能になったら通知
- `_EV_CLEAR`: エッジトリガーモード（状態変化時のみ通知）

#### イベント待ち受け

```go
func netpoll(delay int64) (gList, int32) {
    var events [64]keventt
    n := kevent(kq, nil, 0, &events[0], int32(len(events)), tp)

    // イベントが発生したファイルディスクリプタを処理
    for i := 0; i < int(n); i++ {
        ev := &events[i]
        switch ev.filter {
        case _EVFILT_READ:
            // 読み込み可能 → 対応するゴルーチンを起床
        case _EVFILT_WRITE:
            // 書き込み可能 → 対応するゴルーチンを起床
        }
    }
}
```

**動作原理**:
1. 複数のソケットを`kqueue`に登録
2. `kevent()`でブロック（またはタイムアウト付き待機）
3. いずれかのソケットでイベント発生 → `kevent()`が返る
4. 該当するゴルーチンを起床させ、処理を再開

### 2.4 pollDescとゴルーチンの連携

**実装箇所**: `runtime/netpoll.go:75-115`

```go
type pollDesc struct {
    fd    uintptr        // 監視対象のファイルディスクリプタ
    rg    atomic.Uintptr // 読み込み待ちゴルーチンのポインタ
    wg    atomic.Uintptr // 書き込み待ちゴルーチンのポインタ
    lock  mutex
    rd    int64          // 読み込みデッドライン
    wd    int64          // 書き込みデッドライン
}
```

**ゴルーチンのパーク/アンパーク**:
- ゴルーチンがI/Oを待つとき → `pollDesc`に自身を登録してパーク（休止）
- kqueueがイベントを検知 → 該当する`pollDesc`のゴルーチンをアンパーク（再開）

この仕組みにより、**ゴルーチンはブロックしているように見えるが、実際にはランタイムが効率的にスケジューリング**しています。

---

## 3. ファイルディスクリプタ管理層：非ブロッキングI/O

### 3.1 FD構造体

**実装箇所**: `internal/poll/fd_unix.go:19-48`

```go
type FD struct {
    Sysfd      int       // システムファイルディスクリプタ
    pd         pollDesc  // ネットワークポーリング用記述子
    IsStream   bool      // TCP等のストリーム型か
    isBlocking uint32    // ブロッキングモードか
}
```

### 3.2 読み込み処理

**実装箇所**: `internal/poll/fd_unix.go:141`

```go
func (fd *FD) Read(p []byte) (int, error) {
    if err := fd.readLock(); err != nil {
        return 0, err
    }
    defer fd.readUnlock()

    for {
        n, err := syscall.Read(fd.Sysfd, p)
        if err == syscall.EAGAIN {
            // データがまだ来ていない → ポーリング待機
            if err = fd.pd.waitRead(); err != nil {
                return 0, err
            }
            continue  // 再度read()を試行
        }
        return n, err
    }
}
```

**動作フロー**:
1. `read()`システムコールを呼ぶ
2. データがない場合、`EAGAIN`エラーが返る（非ブロッキングモード）
3. `waitRead()`でゴルーチンをパーク
4. kqueueがデータ到着を検知してゴルーチンを起床
5. 再度`read()`を試行

---

## 4. TCP接続管理層

### 4.1 TCPListener

**実装箇所**: `net/tcpsock.go`

```go
type TCPListener struct {
    fd *netFD
}

func (ln *TCPListener) Accept() (Conn, error) {
    fd, err := ln.fd.accept()
    return &TCPConn{conn: conn{fd}}, nil
}
```

### 4.2 TCPConn

```go
type TCPConn struct {
    conn
}
```

TCPコネクションは`conn`型を埋め込んでおり、以下のメソッドを提供：
- `Read([]byte) (int, error)`
- `Write([]byte) (int, error)`
- `Close() error`
- `SetDeadline(t time.Time) error`

---

## 5. HTTPプロトコル層

### 5.1 Serverの起動

**実装箇所**: `net/http/server.go`

```go
func (srv *Server) ListenAndServe() error {
    ln, err := net.Listen("tcp", srv.Addr)
    if err != nil {
        return err
    }
    return srv.Serve(ln)
}
```

### 5.2 接続の処理ループ

```go
func (srv *Server) Serve(l net.Listener) error {
    for {
        rw, err := l.Accept()  // 新しい接続を待つ
        if err != nil {
            return err
        }
        c := srv.newConn(rw)
        go c.serve(connCtx)  // ゴルーチンで並行処理
    }
}
```

### 5.3 HTTPリクエストの読み取りとレスポンス

```go
func (c *conn) serve(ctx context.Context) {
    for {
        // 1. HTTPリクエストの読み取り
        req, err := c.readRequest(ctx)

        // 2. ハンドラの呼び出し
        serverHandler{c.server}.ServeHTTP(w, req)

        // 3. レスポンスのフラッシュ
        w.finishRequest()

        // Keep-Aliveの場合は次のリクエストを待つ
    }
}
```

### 5.4 Handlerインターフェース

**実装箇所**: `net/http/server.go:88-90`

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

ユーザーが実装するハンドラはこのインターフェースを満たすだけで、HTTPリクエストを処理できます。

### 5.5 ResponseWriter

**実装箇所**: `net/http/server.go:96-161`

```go
type ResponseWriter interface {
    Header() Header
    Write([]byte) (int, error)
    WriteHeader(statusCode int)
}
```

アプリケーション開発者は、このインターフェースを通じてHTTPレスポンスを書き込みます。裏側では、TCPソケットへの書き込み、バッファリング、チャンク転送エンコーディングなどが自動的に処理されます。

---

## 6. 全体の動作フロー

実際にHTTPリクエストを受け取ってレスポンスを返すまでの流れをまとめます。

### 6.1 サーバー起動時

```
1. socket(AF_INET, SOCK_STREAM, 0)
   → ソケットファイルディスクリプタ生成

2. bind(fd, {127.0.0.1:8080}, 16)
   → ソケットをアドレスに紐付け

3. listen(fd, 128)
   → 接続待ち行列を作成

4. kqueue() / epoll_create()
   → I/O多重化機構を初期化

5. kevent(kq, {fd, EVFILT_READ, EV_ADD}, ...)
   → リスニングソケットをポーリング登録

6. ゴルーチンがAccept()でパーク
```

### 6.2 クライアント接続時

```
1. kqueueがEVFILT_READイベントを検知
   → リスニングソケットに接続要求あり

2. Acceptゴルーチンがアンパーク

3. accept(listenfd, ...)
   → 新しい接続用ファイルディスクリプタ生成

4. kevent(kq, {clientfd, EVFILT_READ, EV_ADD}, ...)
   → クライアントソケットをポーリング登録

5. 新しいゴルーチンでc.serve()を起動
```

### 6.3 HTTPリクエスト処理

```
1. kqueueがクライアントfdのEVFILT_READイベントを検知

2. Read()ゴルーチンがアンパーク

3. read(clientfd, buf, len)
   → HTTPリクエストデータを読み込み

4. HTTPリクエストをパース
   GET /hello HTTP/1.1
   Host: localhost:8080

5. handler.ServeHTTP(w, req)
   → ユーザー定義のハンドラを呼び出し

6. w.Write([]byte("Hello, World!"))
   → レスポンスボディを書き込み

7. write(clientfd, "HTTP/1.1 200 OK\r\n...", len)
   → TCPソケットにレスポンスを送信

8. Keep-Aliveでない場合、close(clientfd)
```

---

## 7. 学術的背景と論文

### 7.1 I/O多重化の理論的背景

**C10K問題** (Dan Kegel, 1999)
- 1台のサーバーで同時に1万接続を処理する問題
- 従来のスレッド-per-接続モデルでは限界
- イベント駆動型アーキテクチャ（epoll/kqueue）の必要性

**参考論文**:
- Banga, G., Mogul, J. C., & Druschel, P. (1999). "A scalable and explicit event delivery mechanism for UNIX." *USENIX Annual Technical Conference*.

### 7.2 エッジトリガー vs レベルトリガー

- **レベルトリガー**: ソケットが読み込み可能な状態である限り通知し続ける
- **エッジトリガー**: 状態が変化した瞬間のみ通知（Go言語はこちらを使用）

**利点**:
- 無駄な通知が減る
- 高効率

**欠点**:
- 実装が複雑（一度の通知で可能な限りデータを読み切る必要がある）

### 7.3 非ブロッキングI/Oとゴルーチン

Go言語は**ユーザー空間スレッド（ゴルーチン）とネットワークポーラーの組み合わせ**により、以下を実現：

1. 開発者は同期的なコードを書ける（`Read()`がブロックしているように見える）
2. 実行時は非同期I/O（ランタイムがゴルーチンをパーク/アンパーク）

この設計は、**Communicating Sequential Processes (CSP)** モデル（C.A.R. Hoare, 1978）に基づいています。

**参考論文**:
- Hoare, C. A. R. (1978). "Communicating sequential processes." *Communications of the ACM*, 21(8), 666-677.

---

## 8. まとめ

HTTPサーバーは以下の技術要素の組み合わせで実現されています：

| 層 | 技術要素 | 役割 |
|----|---------|------|
| アプリケーション層 | `Handler`インターフェース | HTTPリクエストのビジネスロジック処理 |
| HTTPプロトコル層 | `net/http` パッケージ | HTTPプロトコルのパース/生成、Keep-Alive管理 |
| TCP接続管理層 | `net.TCPListener`, `net.TCPConn` | TCPコネクションの抽象化 |
| FD管理層 | `internal/poll.FD` | 非ブロッキングI/O、デッドライン管理 |
| ネットワークポーリング層 | `runtime/netpoll` | kqueue/epollによるI/O多重化 |
| OSシステムコール層 | `socket`, `bind`, `listen`, `accept`, `read`, `write` | カーネルとの通信 |

### キーポイント

1. **ソケット**: OSが提供するネットワーク通信の基本単位（ファイルディスクリプタ）
2. **I/O多重化**: kqueue/epollで複数の接続を1つのスレッドで効率的に処理
3. **非ブロッキングI/O**: `EAGAIN`エラーを利用してゴルーチンをパーク
4. **ゴルーチン**: 軽量スレッドにより、同期的なコードで非同期I/Oを実現
5. **エッジトリガー**: 状態変化時のみ通知することで効率化

これらの仕組みにより、Go言語では数万の同時接続を効率的に処理できるHTTPサーバーを、わずか数行のコードで実装できます。

---

## 参考実装ファイル

- `net/http/server.go`: HTTPサーバーの実装
- `net/tcpsock.go`: TCP接続の抽象化
- `net/sock_posix.go`: ソケット生成、bind、listen
- `net/fd_unix.go`: ファイルディスクリプタの初期化
- `internal/poll/fd_unix.go`: 非ブロッキングI/O、Read/Write
- `runtime/netpoll.go`: ネットワークポーリング（プラットフォーム非依存部分）
- `runtime/netpoll_kqueue.go`: kqueue実装（macOS/BSD）
- `runtime/netpoll_epoll.go`: epoll実装（Linux）

---

## 参考文献

- RFC 7230-7235: HTTP/1.1 仕様
- POSIX.1-2017: socket, bind, listen, accept システムコール仕様
- kqueue(2), kevent(2) man pages (BSD)
- epoll(7) man page (Linux)
- Hoare, C. A. R. (1978). "Communicating sequential processes." *Communications of the ACM*
- Dan Kegel (1999). "The C10K problem" http://www.kegel.com/c10k.html
