# pacmanメモ

<!-- TOC -->

- [pacmanメモ](#pacmanメモ)
  - [pacmanとは](#pacmanとは)
  - [コマンド比較](#コマンド比較)
  - [参考](#参考)

<!-- /TOC -->

## pacmanとは
- pacmanとは、ArchLinuxのパッケージ管理システムである。
- 依存性を解決したり、パッケージグループを扱うことができ、インストール・アンインストールスクリプトを実行することができる。
- クライアントサーバーシステムによって、シンプルに依存性が解決できる。
- マスターサーバーと同期してシステムを最新に保つ。

## コマンド比較
- 以下は、今まで利用していたubuntuとの比較。
- 下記、最低限。

|操作|ubuntu|pacman|
|:---:|:---:|:---:|
|パッケージのインストール|`apt install パッケージ名`|`pacman -S パッケージ名`|
|パッケージの削除|`apt remove パッケージ名`|`pacman -Rs パッケージ名`|
|パッケージの検索|`apt search パッケージ名`|`pacman -Ss`|
|パッケージの更新|`apt update && apt upgrade`|`pacman -Syu`|
|ディストビリージュンの更新|`apt dist-upgrade`|`pacman -Syu`|
|キャッシュの削除|`apt clean` or `apt autoclean`|`pacman -Scc`|
|不要なパッケージの削除|`apt autoremove`|`pacman -Rs -`|
|必要なパッケージとして設定|`apt-mark manual`|`pacman -D`|
|ダウンロードのみ|`apt install --downlod-only` or `apt download`|`pacman -Sw`|
|操作履歴|`cat /var/log/dpkg`|`cat /var/log/pacman.log`|
|パッケージ情報の表示|`apt show パッケージ名`|`pacman -Si パッケージ名`|
|ローカルパッケージ情報|`dpkg -s`|`pacman -Qi`|
|リモートパッケージ情報|`apt-cache show`|`pacman -Si`|
|ローカルパッケージファイル|`dpkg -L`|`pacman -Ql`|
|指定したファイルを含むパッケージを検索|`apt-file search`|`pacman -Fo`|
|パッケージの変更履歴|`apt-get changelog`|`pacman -Qc`|
|インストールパッケージのリスト|`dpkg --list | grep '^i'`<br>`awk '{$1=""; print}'`を加えても良い。||

## 参考
https://wiki.archlinux.jp/index.php/Pacman/%E6%AF%94%E8%BC%83%E8%A1%A8