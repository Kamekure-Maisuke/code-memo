# Kivy-memo

<!-- TOC -->

- [Kivy-memo](#kivy-memo)
    - [概要](#概要)
    - [利点](#利点)
        - [Fresh](#fresh)
        - [Fast](#fast)
        - [Flexible](#flexible)
        - [Focused](#focused)
        - [Funded](#funded)
        - [Free](#free)
        - [その他](#その他)
    - [特徴](#特徴)
    - [インストール手順](#インストール手順)
        - [Windows](#windows)
        - [macOS](#macos)
    - [実行手順](#実行手順)
    - [構成](#構成)
        - [ライブラリ構成](#ライブラリ構成)
            - [Windows](#windows-1)
            - [macOS](#macos-1)
        - [プログラム構成](#プログラム構成)
    - [ウィジェット](#ウィジェット)
        - [ウィジェットツリー](#ウィジェットツリー)
        - [概念図](#概念図)
        - [種類](#種類)
            - [パーツ](#パーツ)
            - [レイアウト](#レイアウト)
            - [スクリーンマネージャー](#スクリーンマネージャー)
        - [基本的なウィジェット作成のためのクラス](#基本的なウィジェット作成のためのクラス)
            - [Label](#label)
            - [Button](#button)
            - [CheckBox](#checkbox)
            - [ToggleButton](#togglebutton)
            - [Slider](#slider)
            - [Switch](#switch)
            - [TextInput](#textinput)
            - [ProgressBar](#progressbar)
            - [Image](#image)
        - [基本的なレイアウト作成のためのクラス](#基本的なレイアウト作成のためのクラス)
            - [BoxLayout](#boxlayout)
            - [GridLayout](#gridlayout)
            - [StackLayout](#stacklayout)
            - [AnchorLayout](#anchorlayout)
            - [PageLayout](#pagelayout)
            - [FloatLayout](#floatlayout)
            - [RelativeLayout](#relativelayout)
            - [ScatterLayout](#scatterlayout)
        - [基本的なスクリーンマネージャー作成のためのクラス](#基本的なスクリーンマネージャー作成のためのクラス)
            - [ScreenManager](#screenmanager)
            - [Accordion](#accordion)
            - [ActionBar](#actionbar)
            - [Carousel](#carousel)
            - [ScrollView](#scrollview)

<!-- /TOC -->

## 概要
- Pythonのオープンソースライブラリの一つ。
- マルチタッチ操作に対応したアプリの開発が行える。
- [公式サイト](https://kivy.org)はhttps://kivy.orgである。
- [日本語翻訳サイト](https://pyky.github.io/kivy-doc-ja/)はhttps://pyky.github.io/kivy-doc-ja/である。

## 利点
### Fresh
- 「新鮮」。マルチタッチなど、近年現れた新しい入力方法に特化して、現れている。

### Fast
- 「高速」。計算に時間がかかってしまう難しい部分には、C言語を用いて実装されている。
- グラフィックス機能は、OpenGL ES2を用いて実装されているため、描画が高速。

### Flexible
- 「柔軟」。様々なOSに対応している（クロスプラットフォーム）であり、同じように動作させることができる。

### Focused
- 「集中」。アプリの開発に集中することができ、余事（コンパイラの設定）に煩わされることはない。

### Funded
- 「援助」。プロのソフトウェア開発者を中心としたコミュニティによって運営されている。
- ユーザーサポートのメーリングリストでは、毎日10通以上のメールが飛び交う。

### Free
- 「無償」。PythonもKivyも、無償でダウンロードして、使うことができる。
- ビルドしたアプリは、MITライセンスの下で、他の権利関係に抵触しない限り、商用配布することも可能である。

### その他
- 特定のIDE（統合開発環境）を必要としない。

## 特徴
- 「関心の分離」という思想が取り入れらている。
- 「KV言語」という独自言語を用いることにより、下記が可能になる。
    - 機能とデザインに関する記述を分けて書くことができる。
    - つまり、「機能面をPython」「デザイン面をKV言語」で記述することができる。
- KV言語は、難しいものではなく、CSSのような形式によって、デザインを設定することができる。

## インストール手順
- ※既にPythonは、インストール済みであることを前提とする。
### Windows

- pip,wheel,setuptoolsを最新のものに更新する。

```
$ python -m pip install --upgrade pip wheel setuptools
```

- 依存関係のインストール

```
$ python -m pip install docutils pygments pipwin32 kivy.deps.sd12 kivy.deps.glew
```

- Python3.5からは、OpenGLに関するライブラリである「kivy.deps.glew」は、下記を用いることも可能。

```
$ python -m pip install kivy.deps.angle
```

- kivyのインストール

```
$ python -m pip install kivy
```

### macOS

- Homebrewを用いて、依存関係をインストール。

```bash
$ brew install pkg-config sdl2_image sdl2_ttf sdl2_mixer gstreamer
```

- Cythonとkivyのインストール

```bash
$ pip3 install -U Cython

$ pip3 install kivy
```

## 実行手順
- macを用いて、使用。
- python3を用いて、実行
- 任意のディレクトリに、「main.py」ファイルを作成

```bash
# ホームフォルダのworkフォルダに移動。なければ作成。
$ cd ~/work
# 作業用として、「python-practice」フォルダを作成
$ mkdir python-practice
# 作業フォルダに「main.py」ファイルを作成
$ touch main.py
```

- main.pyに基本的に処理を書いていく。
- 書き終わったら、実行して、画面を起動。

```bash
# main.pyファイルのあるフォルダまで移動
$ cd ~/work/python-practice
$ python3 main.py
```

## 構成
### ライブラリ構成
- インストール完了後は、システム上の適当な場所に置かれる。
- このパスを、今後「KIVY_PATH」とする。

#### Windows
- C:\Python\Lib\site-package\kivy

#### macOS
- /Applications/kivy.app/Contents/Resources/kivy

### プログラム構成
- 一般に下記のファイルから、構成される。
    - Pythonファイル
    - KVファイル
    - アセット(画像や音声、素材ファイル)

## ウィジェット
- ウィジェットとは、GUIの部品全般のこと。
- 一般のKivyプログラムでは、複数のウィジェットを扱う。

### ウィジェットツリー
- ウィジェットの階層構造。
- Kivyプログラムでは、ウィジェット間に親子関係を与えることで定まるウィジェットツリーによって、管理する。

### 概念図
- ここから

### 種類
- ウィジェットには、主に3つの種類に分けられる。
- これらの3つは、いずれもWidgetクラス(kivy.uix.widget)のサブクラス。
- したがって基本的には、Widgetが持つプロパティやメソッドを継承する。
- ※<font color="tomato">プロパティ</font>とは、「属性」と解釈。

#### パーツ
- 最小単位の部品。

#### レイアウト
- ウィジェットを配置するための特殊な部品。
- 正確には、子ウィジェットを、そのルールにしたがってウィンドウ上に配置する。

#### スクリーンマネージャー
- ウィジェットから構成されるスクリーンを複数保持して（子に持ち）、それらの間で表示を切り替えるための特殊な部品。

### 基本的なウィジェット作成のためのクラス
#### Label
- 文字列を表示することができる。

#### Button
- タッチされたとき、およびタッチが離れたときに行う処理を定めることができる。

#### CheckBox
- チェックを入れることができる。
- なお複数の中からただ一つにチェックを入れることのできる、「ラジオボタン」として用いることもできる。

#### ToggleButton
- ONとOFFを切り替えることのできるボタン。

#### Slider
- スライドによって、数値を入力することができる。

#### Switch
- ONとOFFを切り替えることができるスイッチ

#### TextInput
- 文字列を入力することができる。

#### ProgressBar
- プロセスの進捗の程度を表示することができる。

#### Image
- 画像を表示することができる。

### 基本的なレイアウト作成のためのクラス
#### BoxLayout
- ウィジェットを一列に並べて配置。

#### GridLayout
- 行と列の本数を定めて、格子の中にウィジェットを配置。

#### StackLayout
- ウィジェットをスタックのように積み上げて配置。

#### AnchorLayout
- ウィジェットを境界の四角形（バウンディングボックス）の端っこ、もしくは中心に配置。

#### PageLayout
- スワイプによって表示するウィジェットを切り替えることができる。

#### FloatLayout
- ウィジェットを自由に配置。
- 絶対座標系が用いられる。

#### RelativeLayout
- ウィジェットを自由に配置。
- 相対座標系が用いられる。

#### ScatterLayout
- RelativeLayoutと同様。
- 相違点は、タッチ操作による移動や変形が可能。

### 基本的なスクリーンマネージャー作成のためのクラス
#### ScreenManager
- スクリーンマネージャーの中で最も柔軟なクラス。
- デザインに制約がない。
- 切り替えのアニメーション効果も自由に決められる。

#### Accordion
- アコーディオン状に連なったボタンをタッチすることで、スクリーンの表示を切り替えることができる。

#### ActionBar
- Androidにおけるアクションバーに似ている。

#### Carousel
- スワイプ操作によって、紙芝居のようにスクリーンの表示を切り替えることができる。

#### ScrollView
- 子ウィジェットをスクロール表示することができる。