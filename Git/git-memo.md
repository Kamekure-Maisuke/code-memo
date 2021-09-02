# Gitメモ
## 目次
<!-- TOC -->

- [Gitメモ](#gitメモ)
    - [目次](#目次)
    - [概要](#概要)
    - [基本用語](#基本用語)
    - [コマンド一覧](#コマンド一覧)
        - [1. 情報（名前、メールアドレス追加）](#1-情報名前メールアドレス追加)
        - [2. 設定情報一覧](#2-設定情報一覧)
        - [3. Git管理対象下にいれる（初期化）](#3-git管理対象下にいれる初期化)
        - [4. 変更ファイルをGit管理下に追加（ステージング）](#4-変更ファイルをgit管理下に追加ステージング)
        - [5. コミット](#5-コミット)
        - [6. コミット関連各種操作](#6-コミット関連各種操作)
        - [7. リモート接続（GitHub使用）](#7-リモート接続github使用)
        - [8. プッシュ](#8-プッシュ)
        - [9. クローン](#9-クローン)
        - [9. 変更取得](#9-変更取得)
        - [10. 変更状態確認](#10-変更状態確認)
        - [11. 差分確認](#11-差分確認)
        - [12. ブランチ操作](#12-ブランチ操作)
        - [13. リベース（整理）](#13-リベース整理)
        - [14. スタッシュ（退避）](#14-スタッシュ退避)
        - [15. 検索](#15-検索)
        - [16. ブレーム（特定）](#16-ブレーム特定)
        - [17. 掃除](#17-掃除)

<!-- /TOC -->

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
・コミット履歴確認確認
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
・カレント（現在作業中）ブランチをリモートの同名ブランチにプッシュ。
```console
$ git push origin ブランチ名
```
・カレント（現在作業中）ブランチをリモートの同名ブランチにプッシュ。（※便利）
```console
$ git push origin HEAD
```
・「u」オプション追加で、ブランチを追跡対象にいれる。
```console
$ git push -u origin master
```
・「f」オプション追加で、強制プッシュ。
```console
$ git push -f origin master
```
### 9. クローン
・リモートからローカルへ持ってくる（クローン）。
```console
$ git clone http://abcdef.com/ghijk.git
```
・ブランチを指定して、クローンしてくる。(タグ指定も同様。)
```console
$ git clone -b ブランチ名 http://abcdef.com/ghijk.git
```
### 9. 変更取得
・リモートから変更点を取得して、反映。（fetchとmergeを同時に行う。）
```console
$ git pull
```
・リモートから変更点を取得するのみ。反映はしない。
```console
$ git fetch
```
・取得した変更点を反映する
```console
$ git merge FETCH_HEAD
```
・取得した変更点を反映する（ブランチ指定）
```console
$ git merge ブランチ名
```
### 10. 変更状態確認
・変更状態の確認
```console
$ git status
```
### 11. 差分確認
・インデックス（ステージング領域）の変更点比較をする。
```console
$ git diff
```
・直前コミットの比較をする。
```console
$ git diff HEAD
```
・直前コミットとインデックスの比較。
```console
$ git diff --cached HEAD
```
・コミット同士の比較をする。
```console
$ git diff 比較元のコミット 比較先のコミット
```
### 12. ブランチ操作
・ブランチ状態確認。
```console
$ git branch
```
・新しいブランチ作成
```console
$ git branch ブランチ名
```
・ブランチ切り替え
```console
$ git checkout ブランチ名
```
・ブランチ作成と切り替えを同時に行う。
```console
$ git branch -b ブランチ名
```
・ブランチ名の変更
```console
$ git branch -m 旧ブランチ名 新ブランチ名
```
・ブランチの削除
```console
$ git branch -d ブランチ名
```
### 13. リベース（整理）
・分岐元ブランチから分岐先ブランチへ反映。（※実行は分岐先のブランチ２で行う。）
```console
$ git rebase 分岐元ブランチ
```
### 14. スタッシュ（退避）
・現在の作業を一時的に退避。
```console
$ git stash save
```
・退避作業の一覧表示
```console
$ git stash list
```
・退避作業の復元
```console
$ git stash pop
```
・退避作業の削除
```console
$ git stash drop
```
・退避作業の全削除
```console
$ git stash clear
```
### 15. 検索
・単純検索
```console
$ git grep 検索単語
```
・引数指定検索
```console
$ git grep -e 検索単語
```
・複数単語検索（AND検索）
```console
$ git grep -e 検索単語1 --and -e 検索単語2
```
### 16. ブレーム（特定）
・行ごとのコミッター表示。
```console
$ git blame ファイル名
```
・ブランチを指定して、クローンしてくる。(タグ指定も同様。)
```console
$ git clone -b ブランチ名 http://abcdef.com/ghijk.git
```
### 17. 掃除
・不要なオブジェクト（２週間以上経過のもの）を削除して、最適化。
```console
$ git gc
```
・不要あオブジェクト（全て）を削除して、より強力に最適化。（※頻繁には行わない。）
```console
$ git clone -b ブランチ名 http://abcdef.com/ghijk.git
```

## 便利コマンド

```bash
# 作者抽出
git log --format='%aN <%aE>' | sort -u
```
