# GitHubメモ

<!-- TOC -->

- [GitHubメモ](#githubメモ)
    - [便利サービスや機能](#便利サービスや機能)
        - [GitHub Actions](#github-actions)
        - [Git.io](#gitio)
        - [GitHub Desktop](#github-desktop)
        - [GitPitch](#gitpitch)
        - [Gitpod](#gitpod)
        - [GitShowcase](#gitshowcase)
        - [Git History](#git-history)
        - [DeepScan](#deepscan)
        - [Gist](#gist)
        - [Hub](#hub)
    - [キーボードショートカット](#キーボードショートカット)
    - [URL操作](#url操作)
        - [変更部分のみの可視化](#変更部分のみの可視化)
        - [ブランチ一覧](#ブランチ一覧)
        - [ブランチ間の比較](#ブランチ間の比較)
        - [指定した行の強調表示](#指定した行の強調表示)
    - [Gist操作](#gist操作)
        - [ソースのHTML化](#ソースのhtml化)
    - [Git.io操作](#gitio操作)
        - [URLの短縮化](#urlの短縮化)

<!-- /TOC -->

## 便利サービスや機能
### GitHub Actions
- ワークフロー自動化機能
- [GitHub Actions](https://github.com/features/actions/)

### Git.io
- GitHub用の短縮URKサービス
- [git.io](https://git.io/)

###  GitHub Desktop
- GitHubのデスクトップ用のアプリケーション
- 下記のメリットがある。
    - 任意の開発エディタを利用可能。
    - クローンやコミット等の操作が、ワンタッチで済む。
    - 画像の差分が表示可能。
- [GitHub Desktop](https://desktop.github.com/)


### GitPitch
- マークダウンのスライド変換サービス
- [GitPitch](https://gitpitch.com/)

### Gitpod
- 統合型クラウドIDE
- GitHubのソースコードを、Web上のクラウドIDEで自由に「編集・コミット」等ができる。
- [Gitpod](https://www.gitpod.io/)

### GitShowcase
- ポートフォリオ変換サービス
- GitHubのプロフィールページを、ポートフォリオサイトに変換してくれる。
- [GitShowcase](https://www.gitshowcase.com/)

### Git History
- コミット履歴ビューアーサービス
- コミット履歴を、視覚化して、見やすくしてくれる。
- [Git History](https://githistory.xyz/)

### DeepScan
- JavaScriptソースコード解析サービス
- 任意のリポジトリの全てのJavaScriptコードを解析してくれる。
- [DeepScan](https://deepscan.io/home/)

### Gist
- コードごとの管理サービス。
- ディレクトリごとではなく、ファイルごとにgitで管理できる。
- [Gist](https://gist.github.com/)

### Hub
- GitHubのコマンドラインツール
- 「アクセスやクローン、プルリクエストの作成」等の操作がコマンド上で行うことができる。
- [Hub](https://github.com/github/hub)

## キーボードショートカット
- [全一覧はこちら](https://help.github.com/en/articles/using-keyboard-shortcuts)

|キー|内容|
|:---:|:---:|
|t|ファイル検索<br>任意のリポジトリ内でファイルを探せる。|
|w|ブランチ選択<br>任意のリポジトリ内でブランチを選択できる。|
|s|検索<br>任意のリポジトリからGitHub全体の検索ができる。|
|l|指定行への移動<br>ソースページ内で指定行への移動ができる。|
|b|blameファイル表示<br>任意のファイルをblame(コミッターや変更履歴の詳細)ファイルが表示|
|y|参照状態でのURL固定<br>任意のファイルURLを参照状態で固定できる。<br>後からコードに変更があっても、固定状態と同じ表示がされる。|
|g + n|通知欄への移動|
|g + d|ダッシュボードへの移動|
|g + c|リポジトリホームへの移動<br>任意のリポジトリ内のファイルからホームリポジトリへ移動できる。|
|g + i|issuesへの移動<br>任意のリポジトリ内のissuesへ移動できる。|
|g + p|プルリクエストへの移動<br>任意のリポジトリ内のPull requestsへ移動できる。|
|g + b|プロジェクトページへの移動<br>任意のリポジトリ内のProjectsへ移動。|
|g + w|wikiへの移動<br>任意のリポジトリ内のWikiへ移動。|
|Ctrl + F(Command + F)|ファイル内検索|
|Ctrl + G(Command + G)|検索箇所の次へ移動<br>検索した箇所を次の位置へ移動できる。|
|Ctrl + Shift + G(Command + Shift + G)|検索箇所の前へ移動<br>検索した箇所を前の位置へ移動できる。|
|Ctrl + B(Command + B)|太字のマークダウン挿入<br>issuesやコメント等の際に、太字の形式を挿入できる。|
|Ctrl + K(Command + K)|リンクのマークダウン挿入<br>issuesやコメント等の際に、リンクの形式を挿入できる。|
|Ctrl + i(Command + I|斜体のマークダウン挿入<br>issuesやコメント等の際に、斜体の形式を挿入できる。|
|Ctrl + Shift + P(Command + Shift + P)|プレビュータブの切り替え<br>issuesやコメント等の際に、プレビューの切り替えができる。|

## URL操作
### 変更部分のみの可視化
- GitHubの差分表示の際に、URLの末尾に`?w=1`とつける。
- 例 : `https://github.com/ユーザー名/リポジトリ名/commit/コミット番号?w=1`

### ブランチ一覧
- マスターブランチにマージされていないブランチの一覧が表示される。
- 例 : `https://github.com/ユーザー名/リポジトリ名/branches`

### ブランチ間の比較
- ブランチ間での比較ができる。
- 例 : `https://github.com/ユーザー名/リポジトリ名/compare/ブランチ名@{1.day.ago}...ブランチ名`
- 形式指定は下記。
- 例 : `https://github.com/ユーザー名/リポジトリ名/compare/ブランチ名@{YYYY-MM-DD}...ブランチ名`

### 指定した行の強調表示
- コードファイルのURLの末尾に、`#L指定行`と付けると、指定行が強調表示してくれる。
- 例 : `https://github.com/ユーザー名/リポジトリ名/blob/master/フォルダ名/ファイル名#L10`
- また、下記のように指定すると、複数行の強調表示も可能。
- 例 : `https://github.com/ユーザー名/リポジトリ名/blob/master/フォルダ名/ファイル名#L10-L20`


## Gist操作
### ソースのHTML化
- GistのURLの最後に、`.pibb`をつけるとHTMLに変換してくれる。
- 例 : `https://gist.github.com/ユーザー名/番号`

## Git.io操作
### URLの短縮化
- GitHub専用の短縮URLサービスの`Git.io`で短縮化する方法は、下記の2点がある。
    - [サイト](https://git.io/)上で、直接ソースを貼り付けて短縮化する方法。
    - curlコマンドを使用して短縮化する方法。コマンド例は下記。
        ```console
        # GitHub URLを短縮化
        $ curl -i https://git.io/ -F "url=https://github.com/..."
        201 Created
        Location: http://git.io/.....

        # 接続確認
        $ curl -i http://git.io/.....
        302 Found
        ```