# OSメモ
## 概要と仕組み
### OS
- OSは、ハードウェアの複雑さを隠して、コンピュータを簡単に扱えるようにしたもの。
    - OSが存在しないころは、下記の二つを作らなければ、いけなかった。
        - プログラム
        - プログラムを読み込むためのプログラム(ローダー)
    - 初期のOSは、ローダーを独立させることにより、誕生したもの。
    - 現在のOSは、ローダー機能だけでなく、様々な機能を提供している。

### シェル
- ユーザーがOSの機能を利用するための窓口を、**シェル**という。
- Windowsを例にすると、下記の2種類のシェルがある。
    - **GUI**・・・デスクトップ。マウスでのグラフィカル操作。
    - **CUI**・・・コマンド。文字や命令分でのキーボード操作。
- ユーザーがシェルに与える命令は、下記の2種類。
    - プログラム起動
        - GUI・・・アイコンダブルクリックでのプログラム起動
        - CUI・・・ファイル名入力でのプログラム起動
    - シェル提供機能の利用
        - GUI・・・ドラッグ&ドロップでのファイルコピー
        - CUI・・・copyコマンドでのファイルコピー

### システムコール(API)
- 利用者がOSの機能を利用するための窓口を、**システムコール**という。
- または、**API**とも呼ぶ。
- プログラマは、システムコールを利用することで、ハードの知識がなくても、プログラムを作れる。
    - プログラマが作成するアプリケーションは、OSの機能を使って、間接的にハードウェアを使っているため。

### シェルスクリプト
- OSの機能を利用する手順書が記述されたプログラムを、**シェルスクリプト**という。
- プログラムは、OSによって解釈・実行される。
    - Windows・・・WSH(Windows Scripting Host)。VBScriptやJScript等のスクリプト言語で処理を記述。

### プログラム起動
- 試しに、メモ帳をGUIで起動。
    - `C:¥Windows`配下の`notepad.exe`をクリックして、起動。
- 動作として、ハードディスクに記憶されている`notepad.exe`というファイル名のプログラムが、シェルによって、メモリにロードされて実行された。
- メモ帳起動をCUIで行う。
    - コマンドプロンプト起動後、`notepad`と入力。
- 動作として、シェルが`notepad`という文字列を解釈して、プログラムを起動。
- 下記は、シェルスクリプトでのプログラム起動。
    - Windowsでは、シェル機能がオブジェクトで提供されていて、メソッド利用で、シェルの様々な機能を利用できる。

```vb
' 入力ボックスの定義
Prog = InputBox("プログラム名の入力")
' オブジェクトの生成
Set Obj = CreateObject("Wscript.Shell")
' ボックスからの入力値を受け取り実行
Obj.Run Prog
```

- 入力ボックスに、任意のプログラムをいれて、起動できたら、良い。

### マルチタスク
- マルチタスクとは、1台のコンピュータ同時に複数のプログラムをロードして、同時に実行できること。
- CPUが1つしかないコンピュータでは、複数のプログラムを同時に起動することは、不可能。
    - OSは、個々のプログラムを数十ミリ秒程度の時間で切り替えて実行しているため。
    - 短い時間で切り替わるため、同時に実行されているように見える。
- OSがプログラムを区別する単位のことを、**プロセス**という。
- タスクとほぼ同義語。
    - ユーザーから見た方が、**タスク**
    - OSから見た方が、**プロセス**