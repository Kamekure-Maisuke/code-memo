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