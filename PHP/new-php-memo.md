# PHPメモ（最新版）
## 概要
- オープンソースの汎用スクリプト言語。
- 主にWebアプリケーション作成に用いられる。
- HTMLへの埋め込みもできる。
- JavaScriptとは異なり、コードがサーバで実行されて、結果がクライアントに渡される。
- クライアントはコード自体を知ることはない。
- [公式サイトはこちら](http://php.net/)

## 基本文法
### 最初の表示
```php
<?php

// コメント
/* 複数行コメント */

echo "Hello World"; 

?>
```
### 変数
***※「?>」の終了タグは、その後に出力する必要が無い場合は、省略することが推奨されている。***
```php
<?php
// 変数
$msg = "Hello World";
echo $msg;
```
### データ型
```php
<?php>
/*
＜データ型＞
文字列 : string
数値 : integer float
論理値 : boolean / true or false
配列
オブジェクト
null
*/
$msg = "文字列";

// 変数の型情報表示
var_dump($msg);
```
### 定数
```php
<?php
// 定数の定義（定数名はすべて大文字。複数単語はアンダーバーで区切る。）
define("MY_VERSION",5.4);
echo MY_VERSION;

//自動的に定義される定数名
// 行数表示 
var_dump(__LINE__);
// ファイル名表示
var_dump(__FILE__);
// ディレクトリ名表示
var_dump(__DIR__);
```
### 演算
```php
<?php
// 基本演算
// 足し算 : 11
$a = 5 + 6;
// 引き算 : 3
$b = 5 - 2;
// 掛け算 : 10
$c = 5 * 2;
// 割り算 : 2.5
$d = 5 / 2;
// 余り計算 : 1
$e = 5 % 2;

// 計算結果表示
var_dump($a);
var_dump($b);
var_dump($c);
var_dump($d);
var_dump($e);
```
```php
<?php
// 単項演算(加法) : 6
$a = 5;
$a++;
// 単項演算（減法） : 4
$b = 5;
$b--;
// 代入演算 : 11
$c = 6;
$c += 5;

// 計算結果表示
var_dump($a);
var_dump($b);
var_dump($c);
```
### 文字列関連
```php
<?php
/*
ダブルクォーテーション : 特殊文字や変数展開を扱える。
シングルクォーテーション : 特殊文字や変数展開は扱えない。
特殊文字 : \nで改行。\tでタブ。
*/

// 変数展開（波括弧で囲う。）
// 波括弧で加工範囲？
$name = "T.O";
$msg = "私は{$name}です。\nよろしくお願いします。";
var_dump($msg);

// 文字列連結（ドットでつなぐ。）
$number = 56;
$msg = "番号 : ". $number;
var_dump($msg);
```
## 条件分岐
```php
<?php
/*
＜比較演算子＞
< : ～より小さい
> : ～より大きい
<= : ～以下
>= : ～以上
== : 値の比較。等しいときにTRUE。
=== : 値とデータ型の比較（==より厳格）。等しいときにTRUE
!= : 値の比較。等しくないときにTRUE。
<> : 値の比較。等しくないときにTRUE。
!== : 値とデータ型の比較（!=より厳格）。等しくないときにTURE。
<=> : 宇宙船。
*/

/*
＜論理演算子＞
and : 両方TRUE
&& : 両方TRUE
or : どちらかがTRUE
|| : どちらかがTRUE
! : 否定。TRUEでないときに、TRUE。
xor : どちらかがTRUE、かつ両方TRUEではないときに、TRUE。
*/

// 条件分岐（if）
$result = 90;
if($result >= 80){
    echo "高評価";
}elseif($result <= 79 and $result >= 50){
    echo "中評価";
}elseif($result <= 49 and $result >= 0){
    echo "低評価";
}else{
    echo "不正";
}
```
```php
/*
＜真偽値＞
＜falseになる場合＞
文字列 : 空白、"0" の場合
数値 : 0,0.0 の場合
論理値 : false の場合
配列 : 要素数が0 の場合
null
*/

// 条件分岐（ifを使わない真偽比較）
// この記法も覚えておく。
$x = 67;
if($x){
    echo "正しい値です。";
}

// 上記の真偽比較をifを使う場合
$x = 67;
if($x == true){
    echo "正しい値です。";
}

// 三項演算子(上級者記法)
// $変数名 = (条件式) ? TRUE処理 : FALSE処理;　　のように書く。
// こちらの比較も覚えておく。
$a = 56;
$b = 55;
$max = ($a > $b) ? $a : $b;

// 上記の三項演算子の比較をifで書く場合
$a = 56;
$b = 55;
if($a < $b){
    $max = $a;
}else{
    $max = $b;
}
```
```php
// 条件分岐（switch文）
<?php
$color = "blue";
switch ($color) {
    case "red":
        echo "止まってください。";
        break;
    case "blue":
    case "green":
        echo "進んでください。";
        break;
    case "yellow":
        echo "注意してください。";
        break;
    default:
        echo "不正値です。";
        break;
}
```

### ループ処理
```php
<?php
// ループ処理(while)
$i = 1;
while($i < 5){
    echo $i;
    $i++;
}

// do while(条件をあとに持ってくる。)
do{
    echo $i;
    $i++;
} while($i < 5);

// ※while文とdo while文の違いは、条件判定を最初に行うか、後に行うかのどちらか。
// ※「例 : $i = 50」の場合、while文では何も表示されないが、do while文では50のみ表示される。
```

```php
// ループ処理(for)
<?php
for($i = 1; $i < 5; $i++){
    echo $i;
}

// ループ処理（continue使用）
for($i = 1; $i <= 10; $i++){
    if($i % 3 == 0){
        continue;
    }
    echo $i;
}

// ループ処理（break使用）
for($i = 1; $i <= 10; $i++){
    if($i === 5){
        break;
    }
    echo $i;
}
```

### 配列
```php
<?php
// 配列定義（PHP5.4以降）
// keyとvalue型
$members = [
    "oono" => 23,
    "tanaka" => 34,
    "satou" => 45,
];
// 配列出力
var_dump($members["oono"]);
// 配列の値変更
$members["oono"] = 78;
var_dump($members["oono"]);
```

```php
<?php
// 配列定義（value指定。keyは番号。）
$colors = ["red","yellow","blue","green"];
// 配列の値出力（例では、blue）
var_dump($colors[2]);
```
```php
<?php
$colors = ["red","yellow","blue","green"];
// 配列のループ処理（foreach）
foreach($colors as $value){
    echo "$value\n"
}
```

```php
<?php
$members = [
    "oono" => 67,
    "tanaka" => 85,
    "satou" => 47,
];
// 配列のループ処理（foreach、key-value型）
foreach($members as $key => $value){
    echo "$key : $value \n";
}
```

### コロン構文
```php
<?php
// コロン構文（for）
// 基本は、「:」で始まり「end~」で終わる。
// 他にも、foreachやwhileもかける。
for($i = 1;$i <= 6;$i++):
    echo $i;
endfor;
```
```html
<!-- コロン構文は、主にHTMLとPHPが混在しているときに、視認性向上のために、用いられる。 -->
<?php
$colors = ["red","blue","yellow"];
<ul>
    <?php foreach($colors as $value) : ?>
    <li><?php echo "$value"; ?></li>
    <?php endforeach; ?>
</ul>
```

### 関数
```php
<?php
// 関数1の定義（引数なし）
function sayHello(){
    echo "hello world";
}

// 関数2の定義（引数指定）
function showInfo($name){
    echo "name : $name";
}

// 関数3の定義（引数複数指定）
function myInfo($name,$age){
    echo "name : $name\nage : $age";
}

// 関数4の定義（戻り値指定）
function sumCalc($firstNumber,$secondNumber){
    return $firstNumber + $secondNumber;
}

// 関数1の表示
sayHello();

// 関数2の表示
showInfo("John");

// 関数3の表示
myInfo("John",56);

// 関数4の表示
echo "result : ". sumCalc(78,89);
```

### ローカル変数
```php
<?php
// 変数の定義
$age = 56;
function showInfo($name){
    // ローカル変数の定義
    $age = 45;
    echo "name : $name\nage : $age";
}
// $age = 45
showInfo("suzuki");
// $age = 56
var_dump($age);
```

### 組み込み関数
```php
<?php
$number = 7.8;
// ＜組み込み関数（数値）＞
// 小数点切り上げ
echo ceil($number);
// 小数点切り捨て
echo floor($number);
// 四捨五入
echo round($number);
// 乱数生成
echo rand(1, 7);
```
```php
<?php
$number = 6.78;
$name = "suzuki";
$animal = "dog";
// 組み込み関数（文字列操作）
// 文字数取得
echo strlen($name);

// 日本語を用いる際は、mbから始まる関数が多い。
// 文字数取得
echo mb_strlen($animal);

// 文字列分割
$fullName = "suzuki ichiro";
// substr(文字列,開始位置,長さ)
$lastName = substr($fullName,0,6);
echo $lastName;

// 書式指定
// $s : string, $f : float(※.2は小数点)
printf("%s - %s - %.2f",$name,$animal,$number);
```
```php
<?php
$animals = ["dog","cat","snake","tiger"];
// 組み込み関数（配列）
// 要素数取得
echo count($animals);

// 特定文字列で連結(例では@でつなぐ。)
echo implode("@",$animals);

// 配列の構造出力
print_r($animals);
```
```php
<?php
// 組み込み関数（HTML）
$htmlTag = '<a href = "">Google</a>';
// HTMLタグの実体参照への変換
$disabledResult = htmlspecialchars($htmlTag, ENT_QUOTES);
echo $disabledResult;

// HTMLタグの取り除き
$tagDeleteResult = strip_tags($htmlTag);
echo $tagDeleteResult;
```

### クラスとインスタンス
```php
<?php
// クラス定義
class Member{
    // プロパティ(クラス内の変数)定義
    public $name;
    
    // コンストラクタ定義
    // 「__construct」と、名前が決まっている。
    // インスタンス生成時に渡される名前を、プロパティに代入。
    public function __construct($name){
        $this -> name = $name;
    }
    
    // メソッド定義
    public function showInfo(){
        echo "私の名前は" . $this -> name . "です。";
    }
}

// インスタンス生成
$john = new Member("john");
$bob = new Member("bob");
$michael = new Member("michael");

// インスタンスのプロパティ要素出力
echo "{$john -> name}です。";
// インスタンスメソッド実行
$bob -> showInfo();
```

### 継承
```php
<?php
// クラス定義
class Member{
    public $name;
    
    public function __construct($name){
        $this -> name = $name;
    }
    
    public function showInfo(){
        echo "こんにちは" . $this -> name . "と申します。";
    }
}

// 継承クラス定義
class SubMember extends Member{
    // メソッド定義（親クラスでは使えない。）
    public function englishInfo(){
        echo "I am " . $this -> name;
    }
}

// 親クラスのインスタンス作成
$bob = new Member("bob");

// 継承クラスのインスタンス作成
$john = new SubMember("john");

// 親クラスのメソッド出力
$bob -> showInfo();

// 継承クラスのメソッド出力
$john -> englishInfo();
```

### アクセス修飾子
```
public : どこからでもアクセス可能
protected : クラス自身と継承クラスからのみ、アクセス可能。継承は可能。
privvate : 同じクラス内でのみアクセス可能。継承クラスからもアクセス不可能。

※基本的に、まずprivateにできないかを考える。
※getter,setterメソッドを作成る。
→プロパティはprivate、それの取得や変更をgetterやsetterで、というパターンが多い。
```

### staticキーワード
```php
<?php
class Member{
    public $name;
    
    // static変数定義（例として、インスタンス計測用変数）
    public static $count;
    
    public function __construct($name){
        $this->name  = $name;
        
        // count変数をインクリメント（クラスのメソッド内での使用は、selfを用いる。）
        self::$count++;
    }
    
    // static関数定義（インスタンス未作成でも、実行可能。）
    public static function firstGreeting(){
        echo "ようこそ。いらっしゃいませ。\n";
    }
    
    public function sayHello(){
        echo "\nHello " . $this->name;
    }
}

// static関数出力
Member::firstGreeting();

$bob = new Member("bob");
$bob = new Member("bob");
$bob = new Member("bob");
$bob = new Member("bob");
$bob = new Member("bob");

// static変数（count）の出力
echo "インスタンス数 : " . Member::$count;
```

### 抽象クラス
```php
<?php
// 抽象クラスの定義
// 特徴・・・1. 自身をインスタンス化することはできない。2. 他のクラスで継承してもらうことを前提としている。
abstract class BaseMember {
    public $name;
    // 抽象メソッド定義（必ず実装されなければいけない。）
    abstract public function showInfo();
}

class Member extends BaseMember {
    public function showInfo() {
        echo "こんにちは。";
    }
}
```

### インターフェース
```php
<?php

// インターフェースの定義（このクラスではこのメソッドを実装してください的な、仕組みみたいなもの。）
// 特徴・・・1. メソッドのアクセス権は、必ずpublic 2. 実装の中身は書かない。

interface sayHello {
    public function sayHello();
}
interface showInfo {
    public function showInfo();
}

// クラス定義（interface使用は、implementsと書く。）
// interfaceはカンマ区切りで、複数指定してよい。（抽象クラスの継承は、１つまで。）
class User implements sayHello,showInfo {
    public function sayHello(){
        echo "こんにちは"
    }
    public function showInfo(){
        echo "私は～～です。";
    }
}
```

### 外部ファイルの読み込み
「index.php」
```php
<?php
// ファイル読み込み方法（下記）,onceがついている方は、PHPファイルチェックをしてくれる。（読み込み済みファイルは読み込まずスキップ。）
// 1. require(エラー時は処理終了、fatal error) 2. require_once
// 3. include（エラー時は、処理続行 warning） 4. include_once

require "Member.class.php";

$bob = new Member("bob");
$bob->showInfo();
```
「Member.class.php」
```php
<?php
class Member {
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function showInfo(){
        echo "私の名前は、{$this->name}です。";
    }
}
```
別の読み込み方法(Member.class.phpを読み込む)  
「index.php」
```php
<?php
// クラスファイル読み込み（下記）
// 1. autoload

// spl_autoload_registerを使用。
// クラスが出てきて、それが未定義だった時に、自動的に実行される仕組み。
spl_autoload_register(function($class) {
    require $class . ".class.php";
});

$bob = new Member("bob");
$bob->sayHello();
```

### 名前空間
「index.php」
```php
<?php
require "Member.class.php";

// 名前空間の別名指定。（階層が長くなってくる場合が多いから。）
// use 名前空間名 as 別名;
// 階層名の末尾を使いたければ、「use OonoProject\Lib」だけでも書ける。

use OonoProject\Lib as Lib;

// 名前空間でクラス指定
$bob = new Lib\Member("bob");
$bob->sayHello();
```
「Member.class.php」
```php
<?php
// 名前空間・・・他の人が作った作ったファイルを読み込んだ時の、クラス名のかぶりを防ぐ。
// 名前空間の記述は、ファイルの最初に書く。
// namespace 名前（他の人と被らないような名前） \階層名（関係）
namespace OonoProject\Lib;

class Member{
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function sayHello(){
        echo "Hello {$this->name}.";
    }
}
```