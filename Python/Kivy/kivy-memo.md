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
    - [構成](#構成)
        - [ライブラリ構成](#ライブラリ構成)
            - [Windows](#windows-1)
            - [macOS](#macos-1)
        - [プログラム構成](#プログラム構成)

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
$ pip install -U Cython

$ pip install kivy
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