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
