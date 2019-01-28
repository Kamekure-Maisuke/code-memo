# Gitメモ
## 概要
- ソースコード等の変更を記録するための分散型バージョン管理システム。
- 主に「複数の作業者の同時変更」・「複数の履歴の共同管理」等のチーム作業に使用。
## 基本用語
- ①リポジトリ・・・ディレクトリやファイルのデータを保存する場所。
- ②リモートリポジトリ・・・共有のための、サーバー上に作成されるリポジトリ。
- ③ローカルリポジトリ・・・開発用のための、個人マシン上のリポジトリ。
- ④clone・・・リモートリポジトリを複製してローカルリポジトリにする。
- ⑤add・・・変更されたファイルをGit管理対象（ステージング）にする。
- ⑥commit・・・ファイル変更をリポジトリに記録。
- ⑦branch・・・履歴の流れを記録 していくためのもの。コミット判別ためのの名前。
- ⑧checkout・・・ブランチ移動
- ⑨merge・・・ブランチを別のブランチに反映させる。反映。
- ⑩conflict・・・衝突。同じ場所に修正が加えられてマージを行えない状態。手動解決。
- ⑪push・・・ローカルリポジトリをリモートリポジトリへ反映させる。
- ⑫pull・・・リモートリポジトリをローカルリポジトリへ反映させる。

## コマンド一覧
### 1. 情報（名前、メールアドレス追加）
```console
$ git config --global user.name "ユーザー名"
$ git config --global user.email "メールアドレス"
```
### 2. 設定情報一覧
```console
$ git config --list
```
### 3. Git管理対象下にいれる（初期化）
```console
$ git init
```
### 4. 変更ファイルをGit管理下に追加（ステージング）

・全て追加。
```console
$ git add .
```
・変更分全て追加。
```console
$ git add -u
```
・ファイル指定追加。
```console
$ git add index.html
```
・拡張子指定追加。
```console
$ git add *.html
```
・対話形式追加。
```console
$ git add -i
```
### 5. コミット
※上がメッセージ無しでステージング分全て。次がメッセージありでステージング分全て。最後がメッセージ無しでファイル名指定。

・メッセージ無しでステージング分全て。
```console
$ git commit -a
```
・メッセージありでステージング分全て。
```console
$ git commit -a -m "First commit"
```
・メッセージ無しで指定ファイル名。
```console
$ git commit index.html
```
### 6. コミット関連各種操作
※上が直前のコミットメッセージ変更。その次が直前のコミット取り消し（ローカルディレクトリ内容は変更しない。その次がコミットにタグ作成）

・直前のコミットメッセージ変更
```console
$ git commit --amend
```
・直前のコミット取り消し（ローカルディレクトリの内容変更無し。）
```console
$ git reset --soft HEAD^
```
・直前のコミット取り消し（ローカルディレクトリの内容変更）
```console
$ git reset --hard HEAD^
```
・直前のコミットから2個分を取り消し（ローカルディレクトリの内容変更無し。）
```console
$ git reset --soft HEAD~2
```
・コミットのタグ作成。（注釈無し）
```console
$ git tag "タグ名"
```
・コミットのタグ作成（注釈有り）
```console
$ git tag -a "タグ名" -m "注釈分"
```
・コミットタグ一覧確認
```console
$ git tag
```
・コミットタグの内容確認
```console
$ git tag タグ名
```

### 7. リモート接続（GitHub使用）
・リモートリポジトリ接続
```console
$ git remote add origin https://github.com/abcdef/ghi.git
```
・リモート接続先確認
```console
$ git remote -v
```
・リモート接続変更
```console
$ git remote set-url origin https://github.com/bbbbb/ccccc.git
```
### 8. プッシュ
```
```