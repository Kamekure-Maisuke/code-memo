# Dockerメモ
## チュートリアル
### Hello World表示
- ターミナルを起動
- 下記のコマンドをうつ。

```bash
$ docker run hello-world

~~~~~~~~
Hello from Docker.
```
- 「Hello from Docker」が表示されれば、完了。

### ubuntu起動
- ターミナルに下記のコマンドをうつ。

```console
$ docker run -i -t ubuntu /bin/bash
~~~~~~~~~~~~~~~~~~~~
root@XXXXX :/#
```

- 下記のコマンドをうち、ubuntu起動を確認。

```console
root@XXX :/# cat /etc/lsb-release

~~~~~~~~
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=XX.XX
```

- テストファイルの作成

```
root@XXX :/# echo hello > hello.txt
root@XXX :/# ll
~~~~~~
hello.txt

root@XXX :/# cat hello.txt
```

- 「Ctrl + D」でコンテナ終了

- 下記のコマンドで、再度コンテナ起動。

```console
$ docker run -i -t ubuntu /bin/bash
root@XXX :/# ll
~~~~~~~
```

- hello.txtがなくなっていればOK。

- 「Ctrl + D」でコンテナ終了。

### Nginxの起動
- 下記のコマンドをうち、Nginxイメージでの起動。

```console
$ docker run -p 8080:80 nginx
```

- ブラウザを起動して、「localhost:8080」にアクセス。

- ページ内に「Welcome to nginx」と表示されていれば、完了。

- 「Ctrl + C」でWebサーバーの終了をする。

### コンテナの確認

- 下記のコマンドをうち、動作しているコンテナの確認。

```console
$ docker ps
~~~~~~~~
CONTAINER id    IMAGE    COMMAND    CREATED
```

- 下記のコマンドをうち、動作しているコンテナの終了。

```console
$ docker kill コンテナID
```