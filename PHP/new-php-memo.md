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