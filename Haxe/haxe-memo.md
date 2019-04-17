# Haxeメモ

<!-- TOC -->

- [Haxeメモ](#haxeメモ)
    - [概要](#概要)
    - [特徴](#特徴)
        - [静的型付け](#静的型付け)
        - [型推論](#型推論)
        - [マルチプラットフォーム](#マルチプラットフォーム)
        - [複数環境でのコードの共有](#複数環境でのコードの共有)
        - [クラス定義での通信](#クラス定義での通信)
    - [比較](#比較)
        - [TypeScriptとの比較](#typescriptとの比較)
    - [紹介サイト](#紹介サイト)
    - [試用](#試用)
        - [Try Haxe](#try-haxe)
    - [記法](#記法)
        - [チュートリアル](#チュートリアル)
        - [ログ出力](#ログ出力)
        - [コメント](#コメント)
        - [変数](#変数)
        - [型の種類](#型の種類)
        - [型内容](#型内容)
        - [型エラーの回避](#型エラーの回避)
        - [構造体](#構造体)
        - [型の別名](#型の別名)
        - [演算子](#演算子)
        - [制御文](#制御文)
            - [if](#if)
            - [for](#for)
            - [while](#while)
            - [switch](#switch)
        - [JavaScriptとの違い ~ 1弾](#javascriptとの違い--1弾)
            - [if文の条件値](#if文の条件値)
            - [switch文でのbreak記法](#switch文でのbreak記法)

<!-- /TOC -->

## 概要
- オープンソースの高級プログラミング言語
    - 高級言語 : 人間が理解しやすい記法で記述されているプログラミング言語。
        - 翻訳(コンパイル)に時間がかかる。
    - 低級言語 : コンピュータが理解しやすい記法で記述されているプログラミング言語。
        - 翻訳(コンパイル)に時間がかかる。
- 汎用言語として、JavaScript同様に、Web上で扱うことができる。
- 一つのコードから、あらゆるプラットフォーム向けのプログラムへ変換できる。
- [公式サイト](https://haxe.org/)

## 特徴
### 静的型付け
- 「動的」であるJavaScriptと違い、「静的」であるため、実行速度が速い。
- 変更やリファクタリング、追加仕様の実装が安全。

### 型推論
- 型を書かなくても、型を書いたのと同様の効果が得られる。
- コンパイラが自動的に型を判断して、型がある言語のような判断をする。

### マルチプラットフォーム
- JavaやC++、PHP、Pythonなどの言語に書き出すことができる。
- つまり、ブラウザコンテンツ、デスクトップアプリ、スマートフォンアプリ、サーバーシステムを作ることが可能。

### 複数環境でのコードの共有
- 同じコードを二回書く手間が省ける

### クラス定義での通信
- 「Serializer」という、インスタンスなどを文字列へ変換して、復元することができるクラスを持つ。
- 例として、「クライアントデータを文字列へ変換して、サーバーへ送信してから復元」といったことが可能。
    - その際の型情報は、維持されたままのため、対象クラスのインスタンスとして、扱うことができる。
    - JSON等で行われる「クライアントとサーバー間の通信方式」では、独自のクラス定義が失われるため、変数の場所等を示す仕様書が必要になってくる。
- つまり、Haxeではコードそのものが仕様書となるため、新規で作る必要がない。

## 比較
- Haxeは、JavaScriptの代替と呼ばれる`altJS(静的型付け)`の一部である。
- その部類の一つである、TypeScriptとの比較をしてみる。

### TypeScriptとの比較

||TypeScript|Haxe|
|:---:|:---:|:---:|
|**JavaScriptとの互換性**|高い<br>仕様上の欠点を数々引き継いでいる||
|**マクロ**|無し|有り|
|**列挙体**|無し|有り|
|**マルチプラットフォーム**|無し|有り|
|**パターンマッチ**|無し|有り|
|**代数的データ型**|無し|有り|

## 紹介サイト
- [Haxe紹介](https://www.slideshare.net/sipojp/haxe-24876418)

## 試用
### Try Haxe
- [Try Haxe](https://try.haxe.org/)というサイトを使えば、環境構築不要で、簡単にHaxeをブラウザで試すことができる。

## 記法
### チュートリアル
- Haxeファイルは、「.hx」のようにしていく。

```haxe
// ベースの書き方
class Hello {
    static function main () {
        trace ("Hello World");
    }
}
```

### ログ出力
- 出力は、`trace("メッセージ")`のように、行う。

```haxe
class Hello {
    static function main () {
        trace("Hello World");
    }
}
```

### コメント
- コメントは、下記の形式で行える。

```haxe
// コメント
/*
複数行
コメント
*/
```

### 変数
- 変数は、`var 変数名 = 値;`のように行う。
- 型を記述する場合、`var 変数名:型 = 値;`のように行う。
- 変数の型推論を調べる場合、`$type(変数);`のように行う。
    - ※その際は、表示ではなく、コンパイル時の警告として出力される。

```haxe
class Test {
    static function main() {
        // 型を記述しない場合。
        var message = "こんにちは";
        // 型を記述する場合。
        var count:Int = 1;
        // 変数の型を調べる場合。
        $type(message);
        // 変数の出力
        trace (message);
    }
}
```

### 型の種類
- 基本の型は、下記。

|型|意味|
|:---:|:---:|
|Int|整数|
|Float|浮動小数点数|
|String|文字列|
|Bool|真偽値|
|Array|配列|
|Map|連想配列|

### 型内容
- 型のあとに、`<>`の記述で、内容（パラメーター、ジェネリクス）の指定。
    - ※未指定でも、型推論により、型が当てはまる。**何でも入れていい配列にはならない**
- Arrayの場合、下記のように行う。

```haxe
// Int(整数)のみの配列
var testGroup:Array<Int> = [34,43,25];
// 文字列追加のため、エラー
testGroup[3] = "Hello";
```

- 何でも入れていい配列の時は、`Array<Dynamic>`のように行う。

```haxe
// var sampleGroup = [46,"Hello"];　だとエラー
var sampleGroup:Array<Dynamic> = [46,"Hello"];
```

- Mapの場合は下記。
    - ※Mapは値のアクセスが速くなるが、メモリ使用量が大きくなることがある。

```haxe
// Mapの定義
var testMap:Map<String,Int> = new Map();
// Mapの定義(初期化の場合)
var sampleMap:Map<String,Int> = ["siraishi"=>26,"kubo"=>17,"koike"=>20];
// キーと値の登録
testMap["suzuki"] = 45;
sampleMap["nibu"] = 16;
// キーから値の呼び出し
trace(testMap["suzuki"]);
trace(sampleMap["nibu"]);
```

### 型エラーの回避
- 型を明示的に回避する場合は下記。
    - 型エラーの回避行為自体は、設計が悪い可能性がある。

```haxe
// 数字等を文字列へ変換する。
var message:String = Std.string(34);
// 文字列を整数へ変換する。
var number:Int = Std.parseInt("67");
// 文字列を浮動小数点数へ変換する。
var length:Float = Std.parseFloat("3.14");
// 浮動小数点数を整数へ変換する(切り捨て)
var score:Int = Std.int(45.6);
```

- 何でも入る型として、`Dynamic`を利用する場合もある。

```haxe
// 整数代入
var a:Dynamic = 43;
// 文字列で上書き
a = "Hello";
// 型パラメータへDynamicを使用
var Group:Array<Dynamic> = [2,4,"Hello",34,"World"];
```

### 構造体
- JSONパース(解析)時や、複数の値を返す関数利用時に、便利。
- 型指定は、`変数:{値:値の型}`のように指定。

```haxe
// 構造体定義(型推論)
var userInfo = { name:"suzuki", age:57 };

// 下記の記述で、型指定。
var userInfo:{ name:String, age:Int } = { name:"suzuki", age:57 };
```

### 型の別名
- 型へ別名を付けるときは、`typedef 別名 = 型`のように行う。
- ※可読性が上がるぶん、実体把握が難しくなるため、乱用は避ける。

```haxe
typedef Age = Int;
```

- 構造体で利用する場合、下記のように行う。
- ※構造体の型定義は、長くなるため、typedefを頻繁に利用。

```haxe
// 構造体型定義
typedef UserInfo = {
    Name:String,
    Age:Int,
}

// クラス型定義
typedef UserInfo ={
    var Name:String;
    var Age:Int;
}
```

### 演算子
- 他の言語の演算子と同様。

```haxe
// 足し算
trace(4 + 5);
// 引き算
trace(6 - 5);
// 掛け算
trace(4 * 5);
// 割り算
trace(10 / 5);
// 余り算
trace(12 % 5);

var number:Int = 9;
// インクリメント
number++;
trace(number);
// デクリメント
number--;
trace(number);
// 代入演算子
number += 3;
trace(number);
number -= 5
trace(number);

// 文字列連結
trace("Hello" + "World")

// 比較演算子
var scoreX:Int = 89;
var scoreY:Int = 92;
trace(scoreX == scoreY);  // false
trace(scoreX >= scoreY);  // false
trace(scoreX <= scoreY);  // true

// 論理演算子
trace(true && false);  // false
trace(true || false);  // true
trace(!true);  // false
```

### 制御文
- 制御文も同様に、他言語と一緒。
- ※for文やswitch文等は、記述が違う。

#### if

```haxe
var age:Int = 22;
if(age >= 20){
    trace("成人");
}else if(age < 20 && age >= 0){
    trace("未成人");
}else{
    trace("error");
}

// 下記のような、if文に直接型を入れることはできない。
// if (age) { 処理 }  ・・・これはエラー。
```

#### for
- for文は、`for(カウンター変数名) in 開始値...終了値`のような形式で書く。
- javascriptでの`for(var カウンター変数名 = 開始値;カウンター変数名<=終了値;カウンター変数名++)`と同様。
- ※終了値は含まれない。
- ※カウンター変数名は、「var宣言」や「型指定」はしない。

```haxe
for(i in 1...5){
    // 1 ~ 4の数値が表示される。
    trace(i);
}
```

- 配列のforループは下記。

```haxe
var testGroup:Array<String> = [ "A","B","C" ]
for(i in 0...testGroup.length){
    // A ~ Cが順番に表示
    // trace(i)　のように、配列内の値を直接使うこともできる。※結果は一緒。
    trace(testGroup[i]);
}
```

- Mapのforループは下記。
- ※Mapは順序をもたないため、環境によって順番は変化。

```haxe
var testMap:Map<Int,String> = [1 => "suzuki", 2 => "tanaka", 3 => "satou"]
for(i in testMap){
    // suzuki,tanaka,satouが表示。※順番は問わない。
    trace(i);
}
```

```haxe
var testMap:Map<Int,String> = [1 => "suzuki", 2 => "tanaka", 3 => "satou"]
for(x in testMap.keys()){
    // 1 ~ 3　までのキーが表示。※順番は問わない。
    trace(i);
}
```

#### while
- whileは、`while(条件式){ ループ処理 }`のように行う。
- 条件式は、Bool型(true or false)のみ

```haxe
var i:Int = 1;
while(i < 5){
    // 1 ~ 4までの値が表示。
    trace(i);
    // 値の更新を忘れない。
    i++;
}
```

#### switch
- switch文は、下記のような形式で書く。
- ※javascriptのような、`break;`がない。
    - ※haxeでは、次のcase文で処理が終了するため。

```haxe
var number:Int = 2;
switch(number){
    case 0 :
        trace("0です。");
    case 1 :
        trace("1です。");
    // 複数の値の指定は、カンマで区切る。
    case 2, 3 :
        trace("2または3です。");
    default :
        trace("その他の値です。");
}
```

### JavaScriptとの違い ~ 1弾
- JavaScript等で利用可能ないくつかの文法は、Haxeでは使えない。
- 主な使えない文法は下記。

#### if文の条件値
- haxeでは、if文の条件式に「true of false」しか入れることはできない。
- ※「`a == 1`を`a = 1`を書き間違えてしまい、true判断されてしまった。」のような間違いを防ぐことができる。
- ※`while(4)`も同様に、`while(true)`に修正する必要がある。

```haxe
// if(number){ 処理 }　ではエラー。
if(number != 0){ 処理 } // このように修正
if(number != null) { 処理 } // このような記述でも可能。
```

#### switch文でのbreak記法
- ここから