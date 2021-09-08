# named-pipeメモ

## 内容
- 同じコンピュータで動作しているプログラム同士がデータをやり取りするためのプロセス間通信の一つ。
- 「名前付きパイプ」と呼ばれる。
- プログラムが別のプログラムへデータを先入れ先出し方式。(FIFO)
- 従来ある「|」を匿名パイプと呼ぶこともある。
- 匿名パイプとは違い、プロセスは永続的なので必要がなくなった削除する。

## 例
- named-pipeファイルを作成

```bash
# 作成
mkfifo sample.pipe

# ファイル種別確認
ls -l sample.pipe
file sample.pipe
```

- あるプロセスから別のプロセスへデータを渡す。

```bash
# ターミナル1
cat sample.pipe

# 別のターミナルを開いて実行
echo "Hello" > sample.pipe

# ターミナル1でhelloが表示される。

# 必要ないので削除
rm sample.pipe
```

- 以下、別の例。

```bash
# ターミナル1
tail -f sample.pipe

# ターミナル2
echo "Hello" > sample.pipe

# ターミナル1でHelloが表示され、プロセスはまだ動いている。

# sample.pipeのファイルサイズ確認。0となる。
ls -l
```

- バックグラウンドで動作してもらい、データを送る。
  - 例 : パイプに送ったテキストデータをgzipする。

```bash
# ターミナル1
gzip <sample.pipe> o.gz &

# ターミナル2
echo "1 2 3" > index.txt
cat index.txt > sample.pipe

# 圧縮確認
ls
```

- 以下、別の例。
  - mysqlのdumpされたgzipファイルをリストアする時。

```bash
# 作成
mkfifo restore.pipe

# 中身出力処理をパイプにて定義
gzip -dc dump.gz > restore.pipe &

# 別プロセスでmysqlにロード
LOAD DATA INFILE 'restore.pipe' INTO TABLE テーブル名;
```
