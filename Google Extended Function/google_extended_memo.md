# Google拡張機能メモ
## 概要
- Google Chromeの機能の強化や増加をするプログラム。
- 作成されたアプロケーションを、提供されるAPIを利用して実行することで、本来のChromeにはない機能を提供することができる。

## 作成
### チュートリアル
- 最初は、「Hello」と表示するだけの拡張機能を作成。
- 最初のファイル構成は下記。
    - ※拡張機能作成の際には、`manifest.json`が必要。

```
g_extention
└── first_tuttorial
    ├── manifest.json
    └── penguin.ico
```

- `manifest.json`の中身を、下記にする。
    - `manifest_version` : マニフェストのバージョン。現在の対応は2のみ。
    - `description` : 拡張機能の説明。
    - `name` : 拡張機能の名前。
    - `version` : 拡張機能のバージョン。第一弾のため、1.0としておく。
    - `browser_action` : 拡張機能マーク。右上に表示される。クリックで実行される。
        - `default_icon`: 拡張機能に使用するアイコン画像。
        - `default_popup` : ポップアップ時に表示する画面ファイル。

「manifest.json」

```json
{
    "manifest_version": 2,
    "description" : "Display Hello first",
    "name": "first_tutorial",
    "version": "1.0",

    "browser_action": {
        "default_icon": "icon.png",
        "default_popup": "first_popup.html"
    }
}
```

- `first_popup.html`の中身を、下記にする。

「first_popup.html」

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>first_extention</title>
</head>
<body>
    <h1>Hello t_o_d</h1>
</body>
</html>
```

- `chrome://extensions/`にアクセスして、拡張機能ページに飛ぶ。
- 右上の「デベロッパーモード」をONにする。
- ONチェック後に表示される「パッケージ化されていない拡張機能を読み込む」ボタンをクリックして、作成プロジェクトを選択。
    - ※今回は、`first_tuttorial`フォルダ
- 読み込み後、Chrome右上に、拡張機能アイコンが表示される。
- クリックして、任意のポップアップ画面が表示されれば完了。