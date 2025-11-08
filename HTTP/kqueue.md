# kqueue: カーネルイベント通知機構の完全ガイド

## 目次
1. [kqueueとは何か（小学生でもわかる例え）](#1-kqueueとは何か小学生でもわかる例え)
2. [技術的詳細](#2-技術的詳細)
3. [実装の解説](#3-実装の解説)
4. [epollとの比較](#4-epollとの比較)
5. [採用事例](#5-採用事例)
6. [学術的背景](#6-学術的背景)

---

## 1. kqueueとは何か（小学生でもわかる例え）

### 1.1 レストランの例え

想像してみてください。あなたはとても人気のあるレストランのオーナーです。

#### 昔ながらのやり方（select/poll）

お客さんが10テーブルいます。料理ができたかどうか確かめるために、あなたは：

```
1番テーブル → 「料理できましたか？」「まだです」
2番テーブル → 「料理できましたか？」「まだです」
3番テーブル → 「料理できましたか？」「まだです」
4番テーブル → 「料理できましたか？」「できました！」
5番テーブル → 「料理できましたか？」「まだです」
...
```

全てのテーブルを毎回確認しなければなりません。お客さんが1000人いたら？とても大変ですね。

#### kqueueのやり方（賢い通知システム）

kqueueは**呼び鈴システム**のようなものです：

```
各テーブルに呼び鈴を設置
↓
料理ができたテーブルだけが呼び鈴を鳴らす
↓
オーナーは鳴った呼び鈴のテーブルだけに行けばOK
```

こうすれば、1000テーブルあっても、実際に料理ができた3つのテーブルだけに対応すればいいのです！

### 1.2 郵便配達の例え

#### 昔ながらのやり方

郵便配達員が毎日、街中の全ての家を訪問：
- 「手紙はありますか？」「ありません」
- 「手紙はありますか？」「ありません」
- 「手紙はありますか？」「あります！」

これを毎日繰り返すのは非効率です。

#### kqueueのやり方

郵便局に「興味のある郵便物のリスト」を登録：
- 佐藤さんからの手紙
- Amazonからの荷物
- 請求書

登録したものが届いたときだけ、郵便配達員が通知してくれます。それ以外は待っているだけでOK。

### 1.3 図書館の本の予約システム

#### 従来の方法

毎日図書館に行って「借りたい本、返ってきましたか？」と確認する。

#### kqueue方式

図書館に予約を入れておく。本が返却されたら図書館から連絡が来る。それまでは家で待っていればOK。

---

## 2. 技術的詳細

### 2.1 kqueueとは

**kqueue**（Kernel Queue）は、BSD系OS（FreeBSD、macOS、OpenBSD、NetBSD、DragonFly BSD）が提供する**カーネルイベント通知機構**です。

**歴史**:
- 2000年7月、FreeBSD 4.1で初めて導入
- Jonathan Lemonによって設計
- POSIX標準の`select()`や`poll()`の限界を克服

**目的**:
- 大量のファイルディスクリプタを効率的に監視
- C10K問題（10,000同時接続）の解決
- 様々なカーネルイベントの統一的な扱い

### 2.2 監視できるイベントの種類

kqueueは単なるソケット監視ではなく、**汎用的なイベント通知機構**です。

| フィルタ | 説明 | 用途 |
|---------|------|------|
| `EVFILT_READ` | ファイルディスクリプタが読み込み可能 | ソケット、パイプ、ファイル |
| `EVFILT_WRITE` | ファイルディスクリプタが書き込み可能 | ソケット、パイプ |
| `EVFILT_VNODE` | ファイルシステムイベント（削除、変更等） | ファイル監視 |
| `EVFILT_PROC` | プロセスイベント（終了、fork等） | プロセス管理 |
| `EVFILT_SIGNAL` | シグナル受信 | UNIX シグナル処理 |
| `EVFILT_TIMER` | タイマー満了 | 定期処理 |
| `EVFILT_USER` | ユーザー定義イベント | カスタムイベント |

### 2.3 基本的なAPI

kqueueは2つのシステムコールで構成されます。

#### kqueue()

```c
int kqueue(void);
```

**機能**: イベントキューを作成
**戻り値**: キューファイルディスクリプタ（整数）

#### kevent()

```c
int kevent(int kq,
           const struct kevent *changelist, int nchanges,
           struct kevent *eventlist, int nevents,
           const struct timespec *timeout);
```

**機能**:
1. イベントの登録/変更/削除（changelist）
2. 発生したイベントの取得（eventlist）

**引数**:
- `kq`: kqueue()で作成したファイルディスクリプタ
- `changelist`: 登録/変更するイベントの配列
- `nchanges`: changelistの要素数
- `eventlist`: 発生したイベントを受け取る配列
- `nevents`: eventlistのサイズ
- `timeout`: タイムアウト（NULL=無限待機、0=ポーリング）

**戻り値**: 発生したイベント数（負の値はエラー）

### 2.4 kevent構造体

```c
struct kevent {
    uintptr_t ident;   // イベント識別子（通常はファイルディスクリプタ）
    short     filter;  // イベントフィルタ（EVFILT_READ等）
    u_short   flags;   // アクション/状態フラグ
    u_int     fflags;  // フィルタ固有フラグ
    intptr_t  data;    // フィルタ固有データ
    void      *udata;  // ユーザーデータ（任意のポインタ）
};
```

#### 主要なflagsの値

| フラグ | 説明 |
|-------|------|
| `EV_ADD` | イベントをkqueueに追加 |
| `EV_DELETE` | イベントをkqueueから削除 |
| `EV_ENABLE` | イベントを有効化 |
| `EV_DISABLE` | イベントを無効化 |
| `EV_CLEAR` | エッジトリガーモード（イベント取得後にクリア） |
| `EV_ONESHOT` | イベント発生後に自動削除 |
| `EV_EOF` | 接続終了（読み取り専用フラグ） |
| `EV_ERROR` | エラー発生（読み取り専用フラグ） |

---

## 3. 実装の解説

### 3.1 Go言語での実装例

Go言語のランタイムでは、kqueueを使ってネットワークI/Oを効率化しています。

**実装箇所**: `runtime/netpoll_kqueue.go`

#### 初期化

```go
func netpollinit() {
    kq = kqueue()  // kqueueファイルディスクリプタを生成
    if kq < 0 {
        println("runtime: kqueue failed with", -kq)
        throw("runtime: netpollinit failed")
    }
    closeonexec(kq)
    addWakeupEvent(kq)
}
```

**解説**:
1. `kqueue()`システムコールでイベントキューを作成
2. エラーチェック（負の値はエラー）
3. `closeonexec`フラグを設定（forkした子プロセスでkqueueを継承しない）
4. ウェイクアップイベントを追加（ポーリングの中断用）

#### ファイルディスクリプタの登録

```go
func netpollopen(fd uintptr, pd *pollDesc) int32 {
    // 読み込みイベントと書き込みイベントの両方を登録
    var ev [2]keventt

    // 読み込みイベント
    *(*uintptr)(unsafe.Pointer(&ev[0].ident)) = fd
    ev[0].filter = _EVFILT_READ
    ev[0].flags = _EV_ADD | _EV_CLEAR  // エッジトリガーモード
    ev[0].fflags = 0
    ev[0].data = 0

    // ユーザーデータにpollDesc構造体のポインタを格納
    tp := taggedPointerPack(unsafe.Pointer(pd), pd.fdseq.Load())
    ev[0].udata = (*byte)(unsafe.Pointer(uintptr(tp)))

    // 書き込みイベント
    ev[1] = ev[0]
    ev[1].filter = _EVFILT_WRITE

    // 2つのイベントを一度に登録
    n := kevent(kq, &ev[0], 2, nil, 0, nil)
    if n < 0 {
        return -n
    }
    return 0
}
```

**ポイント**:
- `EV_ADD`: イベントをkqueueに追加
- `EV_CLEAR`: エッジトリガーモード（状態変化時のみ通知）
- 1回の`kevent()`呼び出しで読み込みと書き込み両方を登録（効率的）
- `udata`フィールドに`pollDesc`ポインタを保存（イベント発生時に取り出す）

#### イベントの待ち受け

```go
func netpoll(delay int64) (gList, int32) {
    if kq == -1 {
        return gList{}, 0
    }

    var tp *timespec
    var ts timespec
    if delay < 0 {
        tp = nil  // 無限待機
    } else if delay == 0 {
        tp = &ts  // ポーリング（即座に返る）
    } else {
        ts.setNsec(delay)  // タイムアウト付き待機
        if ts.tv_sec > 1e6 {
            ts.tv_sec = 1e6  // Darwinの制限対策
        }
        tp = &ts
    }

    var events [64]keventt  // 最大64個のイベントを一度に取得
retry:
    n := kevent(kq, nil, 0, &events[0], int32(len(events)), tp)
    if n < 0 {
        if n != -_EINTR && n != -_ETIMEDOUT {
            println("runtime: kevent on fd", kq, "failed with", -n)
            throw("runtime: netpoll failed")
        }
        if delay > 0 {
            return gList{}, 0
        }
        goto retry
    }

    var toRun gList
    delta := int32(0)
    for i := 0; i < int(n); i++ {
        ev := &events[i]

        // ウェイクアップイベントは特別処理
        if isWakeup(ev) {
            isBlocking := delay != 0
            processWakeupEvent(kq, isBlocking)
            if isBlocking {
                netpollWakeSig.Store(0)
            }
            continue
        }

        var mode int32
        switch ev.filter {
        case _EVFILT_READ:
            mode += 'r'
            // パイプのクローズ検出
            if ev.flags&_EV_EOF != 0 {
                mode += 'w'
            }
        case _EVFILT_WRITE:
            mode += 'w'
        }

        if mode != 0 {
            // udataから元のpollDescを取り出す
            tp := taggedPointer(uintptr(unsafe.Pointer(ev.udata)))
            pd := (*pollDesc)(tp.pointer())
            tag := tp.tag()

            // シーケンス番号チェック（stale通知の検出）
            if pd.fdseq.Load() != tag {
                continue
            }

            pd.setEventErr(ev.flags == _EV_ERROR, tag)
            delta += netpollready(&toRun, pd, mode)
        }
    }
    return toRun, delta
}
```

**動作フロー**:
1. `kevent()`でイベント待ち（最大64個まで一度に取得）
2. タイムアウトまたはイベント発生で返る
3. 各イベントを処理：
   - `EVFILT_READ` → 読み込み可能
   - `EVFILT_WRITE` → 書き込み可能
   - `EV_EOF` → 接続終了
4. 対応するゴルーチンを起床リスト（`toRun`）に追加
5. 呼び出し元がゴルーチンをスケジュール

### 3.2 エッジトリガー vs レベルトリガー

**レベルトリガー**（`select`, `poll`）:
```
ソケットにデータがある限り、kevent()は毎回通知する

時刻  状態              kevent()の戻り値
0秒   データなし        待機
1秒   データ到着(100バイト)  通知
2秒   50バイト読み取り  通知（まだ50バイト残っている）
3秒   50バイト読み取り  通知なし（データなし）
```

**エッジトリガー**（kqueueで`EV_CLEAR`使用時）:
```
状態が変化した瞬間のみ通知

時刻  状態              kevent()の戻り値
0秒   データなし        待機
1秒   データ到着(100バイト)  通知
2秒   50バイト読み取り  通知なし（状態変化なし）
3秒   追加データ到着    通知（新しい変化）
```

**利点**:
- 無駄な通知が減る → CPU効率向上
- 高スループット

**注意点**:
- 一度の通知で可能な限りデータを読み切る必要がある
- 実装が複雑になる

---

## 4. epollとの比較

### 4.1 基本的な違い

| 項目 | kqueue (BSD/macOS) | epoll (Linux) |
|------|-------------------|---------------|
| **対応OS** | FreeBSD, macOS, OpenBSD, NetBSD | Linux |
| **初登場** | 2000年 (FreeBSD 4.1) | 2002年 (Linux 2.5.44) |
| **設計思想** | 汎用イベント通知機構 | ソケットI/O特化 |
| **API** | `kqueue()` + `kevent()` | `epoll_create()` + `epoll_ctl()` + `epoll_wait()` |

### 4.2 性能比較

#### 複数のファイルディスクリプタの更新

**epollの弱点**:
```c
// 100個のファイルディスクリプタを更新する場合
for (int i = 0; i < 100; i++) {
    epoll_ctl(epfd, EPOLL_CTL_MOD, fds[i], &event);  // 100回のシステムコール
}
```

**kqueueの強み**:
```c
// 100個のイベントを一度に更新
struct kevent events[100];
// ... イベントを設定 ...
kevent(kq, events, 100, NULL, 0, NULL);  // 1回のシステムコール
```

**学術的根拠**:
- Berkeley大学の研究によると、kqueueはこの点でepollを上回る
- 大量のファイルディスクリプタを動的に更新する場合、kqueueの方がスケーラブル

#### 計算量

両者とも **O(1)** の計算量でイベント取得が可能（従来の`select`や`poll`はO(n)）。

### 4.3 機能面の違い

#### kqueueの優位性

1. **汎用性**: ファイルシステム、プロセス、シグナル、タイマーなど多様なイベント
2. **一貫したAPI**: 登録も待機も`kevent()`一つで完結
3. **バッチ更新**: 複数イベントを1回のシステムコールで処理

#### epollの特徴

1. **シンプル**: ソケットI/O専用で理解しやすい
2. **Linuxに最適化**: Linux固有の最適化が施されている

### 4.4 実測パフォーマンス

Dublin Institute of Technologyの研究（2006年）:
- 接続数が少ない場合（<1000）: ほぼ同等
- 接続数が多い場合（>10000）: kqueueがやや有利（特に更新が多い場合）
- 実用上はどちらも十分高速

---

## 5. 採用事例

### 5.1 Webサーバー / リバースプロキシ

#### Nginx

**概要**: 世界で最も使われているWebサーバーの一つ

**kqueue採用箇所**:
```nginx
events {
    use kqueue;  # macOS/BSDで自動選択
    worker_connections 10000;
}
```

**実装詳細**:
- `ngx_kqueue_module.c`で実装
- macOS/BSDで自動的にkqueueを選択
- エッジトリガーモードで効率化
- C10K問題を解決した代表例

**参考**: https://nginx.org/en/docs/events.html

### 5.2 キャッシュ / データストア

#### Redis

**概要**: インメモリデータストア

**kqueue採用箇所**:
```c
#ifdef HAVE_KQUEUE
#include "ae_kqueue.c"
#else
#ifdef HAVE_EPOLL
#include "ae_epoll.c"
#else
...
```

**実装詳細**:
- `ae.c`（Redis AE = Asynchronous Event library）
- コンパイル時にkqueue/epoll/select等を自動選択
- 単一スレッドで数万の接続を効率的に処理

### 5.3 イベントループライブラリ

#### libevent

**概要**: クロスプラットフォームイベント通知ライブラリ

**対応機構**:
- kqueue (BSD/macOS)
- epoll (Linux)
- /dev/poll (Solaris)
- IOCP (Windows)
- select/poll (フォールバック)

**採用例**:
- Memcached
- Chromium
- tmux

#### libuv

**概要**: Node.jsのコア部分

**実装**:
```
macOS/BSD → kqueue
Linux → epoll
Windows → IOCP
```

**動作**:
- JavaScriptのイベントループ
- 非同期I/O
- タイマー、シグナル処理

**採用例**:
- Node.js（全世界で数百万のサーバー）
- Julia言語
- Luvit

### 5.4 プログラミング言語ランタイム

#### Go言語

**実装箇所**: `runtime/netpoll_kqueue.go`

```go
func netpollinit() {
    kq = kqueue()
    // ...
}
```

**特徴**:
- ゴルーチンの非同期I/O
- 標準ライブラリの`net`パッケージで自動使用
- 開発者は意識せずに高性能I/Oを利用

#### Python (asyncio)

**実装**:
```python
import selectors
# macOSでは自動的にKqueueSelectorを使用
selector = selectors.DefaultSelector()
```

**使用例**:
- asyncio イベントループ
- aiohttp
- Tornado

### 5.5 macOS / iOSシステム

#### Grand Central Dispatch (GCD)

**概要**: Appleの並行処理フレームワーク

**内部実装**:
- libdispatch（ユーザー空間ライブラリ）
- XNUカーネルのkqueue拡張

**動作**:
```c
dispatch_source_t source = dispatch_source_create(
    DISPATCH_SOURCE_TYPE_READ, fd, 0, queue);
// 内部的にkevent()を使用
```

**特徴**:
- GCDのソース（dispatch source）はkqueueで実装
- Machポートとkqueueを統合
- iOS/macOSアプリ全般で使用

**参考**: Apple XNUカーネルソースコード（オープンソース）

### 5.6 データベース

#### PostgreSQL

**概要**: オープンソースリレーショナルデータベース

**実装**:
- `src/backend/storage/ipc/latch.c`
- コンパイル時にkqueue/epoll等を選択
- 多数のクライアント接続を効率的に処理

### 5.7 その他の主要ソフトウェア

| ソフトウェア | 用途 | kqueue使用箇所 |
|-------------|------|---------------|
| **HAProxy** | ロードバランサー | イベント駆動アーキテクチャ |
| **lighttpd** | Webサーバー | BSD/macOS版 |
| **PowerDNS** | DNSサーバー | 非同期クエリ処理 |
| **OpenSSH** | SSHサーバー/クライアント | 多重接続管理 |
| **tmux** | ターミナルマルチプレクサ | イベント処理 |

---

## 6. 学術的背景

### 6.1 C10K問題

**提唱者**: Dan Kegel (1999)

**問題の本質**:
- 1台のサーバーで同時に10,000接続を処理する
- 従来のスレッド-per-接続モデルではメモリとCPUが限界
- `select()`/`poll()`は計算量がO(n)で非効率

**解決策**:
- イベント駆動型アーキテクチャ
- O(1)のイベント通知機構（kqueue, epoll）
- 非ブロッキングI/O

### 6.2 設計論文

**参考論文**:

1. **Banga, G., Mogul, J. C., & Druschel, P. (1999)**
   "A scalable and explicit event delivery mechanism for UNIX."
   *USENIX Annual Technical Conference*.

   **要点**:
   - `select()`/`poll()`の問題点を分析
   - スケーラブルなイベント通知機構の必要性
   - kqueue設計の理論的基盤

2. **Lemon, J. (2001)**
   "Kqueue: A generic and scalable event notification facility."
   *USENIX Annual Technical Conference*.

   **要点**:
   - kqueueの設計思想と実装
   - 汎用イベントフィルタの概念
   - パフォーマンス評価

3. **Zhou, L. (2012)**
   "Scalable Event Multiplexing: epoll vs. kqueue."

   **比較結果**:
   - kqueueはバッチ更新でepollより効率的
   - 両者とも大規模接続に十分対応可能

### 6.3 計算量の理論

| 操作 | select/poll | kqueue/epoll |
|------|-------------|--------------|
| イベント登録 | O(1) | O(1) |
| イベント待機 | O(n) | O(1) |
| イベント削除 | O(1) | O(1) |

**n**: 監視しているファイルディスクリプタ数

**kqueue/epollの優位性**:
- `select()`/`poll()`は全てのファイルディスクリプタを毎回走査（O(n)）
- kqueue/epollはカーネル内部で変化のあったものだけを返す（O(1)）

### 6.4 Communicating Sequential Processes (CSP)

**提唱者**: C.A.R. Hoare (1978)

**概念**:
- プロセス間通信を明示的に扱う並行モデル
- イベント駆動型プログラミングの理論的基礎

**Go言語との関係**:
- ゴルーチン（軽量スレッド）
- チャネル（通信路）
- kqueueで実現される非同期I/O

**参考文献**:
- Hoare, C. A. R. (1978). "Communicating sequential processes." *Communications of the ACM*, 21(8), 666-677.

---

## 7. まとめ

### 7.1 kqueueの本質

kqueueは「**カーネルからの通知を待つ仕組み**」です。

レストランの呼び鈴のように：
- 毎回全てのテーブルを確認する必要はない
- 変化があったときだけ通知が来る
- 1人のウェイターで1000テーブルを効率的に対応できる

### 7.2 技術的ポイント

1. **汎用性**: ソケットだけでなく、ファイル、プロセス、シグナルなど多様なイベント
2. **効率性**: O(1)の計算量、エッジトリガー、バッチ更新
3. **スケーラビリティ**: 数万の同時接続を1つのスレッドで処理可能
4. **統一API**: `kevent()`一つで登録・変更・待機

### 7.3 実世界での重要性

kqueueは以下のような現代のインターネットインフラを支えています：

- **Webサーバー**: Nginx（世界の30%以上のWebサイト）
- **データストア**: Redis（数百万のサーバー）
- **ランタイム**: Node.js、Go言語
- **OS**: macOS、iOS（全てのAppleデバイス）

私たちが毎日使うアプリやサービスの多くが、裏側でkqueueの恩恵を受けています。

---

## 参考資料

### 公式ドキュメント
- `man kqueue` (FreeBSD, macOS)
- `man kevent` (FreeBSD, macOS)

### 実装ソースコード
- FreeBSD: `/sys/kern/kern_event.c`
- macOS XNU: `bsd/kern/kern_event.c`
- Go言語: `runtime/netpoll_kqueue.go`
- libuv: `src/unix/kqueue.c`

### 論文
- Lemon, J. (2001). "Kqueue: A generic and scalable event notification facility."
- Banga, G., et al. (1999). "A scalable and explicit event delivery mechanism for UNIX."
- Hoare, C. A. R. (1978). "Communicating sequential processes."

### Web リソース
- Dan Kegel, "The C10K problem" http://www.kegel.com/c10k.html
- Nginx documentation: https://nginx.org/en/docs/events.html
- libuv design overview: https://docs.libuv.org/en/v1.x/design.html
