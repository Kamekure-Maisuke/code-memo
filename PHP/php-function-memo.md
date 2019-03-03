# PHP関数memo

<!-- TOC -->

- [PHP関数memo](#php関数memo)
    - [頻出関数](#頻出関数)
        - [文字列,数値](#文字列数値)
            - [printf(), sprintf()](#printf-sprintf)
            - [preg_match(),preg_match_all()](#preg_matchpreg_match_all)
            - [preg_replace()](#preg_replace)
            - [preg_quote()](#preg_quote)
            - [str_replace(), strtr()](#str_replace-strtr)
            - [substr(), mb_substr()](#substr-mb_substr)
            - [strtolower(), strtoupper()](#strtolower-strtoupper)
            - [strlen(), mb_strlen()](#strlen-mb_strlen)
            - [strpos(), mb_strpos()](#strpos-mb_strpos)
            - [mb_convert_encoding()](#mb_convert_encoding)
            - [mb_convert_kana()](#mb_convert_kana)
            - [trim(), ltrim(), rtrim()](#trim-ltrim-rtrim)
            - [mt_rand()](#mt_rand)
            - [is_string()](#is_string)
            - [is_int()](#is_int)
            - [is_float()](#is_float)
            - [is_numeric()](#is_numeric)
            - [round()](#round)
            - [floor()](#floor)
            - [ceil()](#ceil)
        - [配列](#配列)
            - [array_key_exists()](#array_key_exists)
            - [array_slice()](#array_slice)
            - [array_merge(), array_merge_recursive()](#array_merge-array_merge_recursive)
            - [in_array()](#in_array)
            - [shuffle()](#shuffle)
            - [sort(), rsort()](#sort-rsort)
            - [asort(), arsort()](#asort-arsort)
            - [ksort(), krsort()](#ksort-krsort)
            - [usort(), uasort(), uksort()](#usort-uasort-uksort)
            - [array_multisort()](#array_multisort)
            - [array_unique()](#array_unique)
            - [array_reverse()](#array_reverse)
            - [array_shift(), array_pop()](#array_shift-array_pop)
            - [array_walk(), array_walk_recursive()](#array_walk-array_walk_recursive)
            - [array_search()](#array_search)
            - [implode(), explode()](#implode-explode)
            - [range()](#range)
            - [current()](#current)
            - [next(), prev()](#next-prev)
            - [reset(), end()](#reset-end)
            - [extract()](#extract)
            - [list()](#list)
            - [is_array()](#is_array)
        - [ファイル操作](#ファイル操作)
            - [file_get_contents()](#file_get_contents)
            - [file_put_contents()](#file_put_contents)
            - [basename()](#basename)
            - [dirname()](#dirname)
            - [realpath()](#realpath)
            - [file_exists()](#file_exists)
            - [fopen()](#fopen)
            - [flock()](#flock)
            - [fgets()](#fgets)
            - [fgetcsv()](#fgetcsv)
            - [fwrite()](#fwrite)
            - [fclose()](#fclose)
            - [rewind()](#rewind)
            - [ftruncate()](#ftruncate)
            - [feof()](#feof)
            - [is_uploaded_file()](#is_uploaded_file)
            - [move_uploaded_file()](#move_uploaded_file)
            - [mkdir()](#mkdir)
            - [unlink()](#unlink)
            - [rmdir()](#rmdir)
            - [rename()](#rename)
            - [copy()](#copy)
            - [is_file()](#is_file)
            - [is_dir()](#is_dir)
            - [chmod()](#chmod)
            - [chown()](#chown)
        - [ネットワーク](#ネットワーク)
            - [htmlspecialchars()](#htmlspecialchars)
            - [header()](#header)
            - [nl2br()](#nl2br)
            - [strip_tags()](#strip_tags)
            - [http_build_query()](#http_build_query)
            - [rawurlencode(), rawurldecode()](#rawurlencode-rawurldecode)
            - [filter_input()](#filter_input)
            - [filter_var()](#filter_var)
            - [session_start()](#session_start)
            - [session_regenerate_id()](#session_regenerate_id)
            - [session_destroy()](#session_destroy)
            - [setcookie()](#setcookie)
            - [hash()](#hash)
            - [md5()](#md5)
            - [password_hash()](#password_hash)
            - [password_verify()](#password_verify)
            - [base64_encode(), base64_decode()](#base64_encode-base64_decode)
            - [json_encode(), json_decode()](#json_encode-json_decode)
            - [mb_send_mail()](#mb_send_mail)
        - [その他](#その他)
            - [print_r()](#print_r)
            - [var_dump()](#var_dump)
            - [count()](#count)
            - [isset()](#isset)
            - [empty()](#empty)
            - [unset()](#unset)
            - [time(), microtime()](#time-microtime)
            - [mktime()](#mktime)
            - [date()](#date)
            - [define()](#define)

<!-- /TOC -->

## 頻出関数

### 文字列,数値

#### printf(), sprintf()

- 文字列をフォーマット指定で出力

- printf()は配列として出力を行う。

- sprintf() は結果を文字列として返す。

- [公式マニュアル](http://php.net/manual/ja/function.printf.php)

- [公式マニュアル](http://php.net/manual/ja/function.sprintf.php)

```php
<?php
// printf(フォーマット文字列,値,値);

printf('今日は%d月%d日です。',date('m'),date('d'));

// 実行結果
// 今日は3月2日です。
```

```php
<?php
// sprintf(フォーマット文字列,値,値);

$number = sprintf('%04d',30);
echo $number;

// 実行結果
// 0030
```

#### preg_match(),preg_match_all()

- 正規表現による一致・検索。

- パターンに一致すれば「1」、一致しなければ「2」を返す。

- preg_match_all() は一致したすべての値を変数に格納。

- [公式マニュアル](http://php.net/manual/ja/function.preg-match.php)

- [公式マニュアル](http://php.net/manual/ja/function.preg-match-all.php)

```php
<?php
// 返り値 = preg_match(/正規表現パターン/,検索対象の文字列,[配列],[動作フラグ],[検索開始位置])

  if (preg_match('/経済/', '世界経済情勢')) {
    echo 'ある';
  } else {
    echo 'ない';
  }

// 実行結果
// ある
```

```php
<?php
// 「PREG_OFFSET_CAPTURE」を指定して、一致文字列の登場位置（オフセット）をバイト数で取得
// ※半角は1バイト、全角は2バイト

  if (preg_match('/経済/', '世界経済情勢',$data,PREG_OFFSET_CAPTURE)) {
    echo "ある\n";
  } else {
    echo "ない";
  }
  print_r($data)

// 実行結果

/*
ある
Array
(
    [0] => Array
        (
            [0] => 経済
            [1] => 6
        )

)
*/

```

```php
<?php
// 「PREG_OFFSET_CAPTURE」を指定して、一致文字列の登場位置（オフセット）をバイト数で取得

  if (preg_match_all('/経済/', '世界経済情勢における、日本の経済状況を、日本経済大学教授の経済学者が解説。',$data,PREG_OFFSET_CAPTURE)) {
    echo 'ある';
  } else {
    echo 'ない';
  }
  print_r($data)

// 実行結果

/*
ある
Array
(
    [0] => Array
        (
            [0] => Array
                (
                    [0] => 経済
                    [1] => 6
                )

            [1] => Array
                (
                    [0] => 経済
                    [1] => 42
                )

            [2] => Array
                (
                    [0] => 経済
                    [1] => 66
                )

            [3] => Array
                (
                    [0] => 経済
                    [1] => 87
                )

        )

)
*/
```

#### preg_replace()

- 正規表現によるパターンに一致した、検索または置換を行う。

- [公式マニュアル](http://php.net/manual/ja/function.preg-replace.php)

```php
// preg_replace(正規表現パターン ,置換後文字列 ,置換対象文字列)

$names = '佐藤 田中 鈴木 佐藤';
$names_grep = preg_replace('/(佐藤)/', '上野', $names);
echo $names_grep;

// 実行結果

// 上野 田中 鈴木 上野
```

#### preg_quote()

- 正規表現特殊文字の前にバックスラッシュをつけてエスケープする。

- オプション区切り文字は省略可能。「/」が一般的に使用されている。

- [公式マニュアル](http://php.net/manual/ja/function.preg-quote.php)

```php
// preg_quote(文字列,オプション区切り文字)

$keywords = '$URL : /で始まる。';
$keywords = preg_quote($keywords, '/');
echo $keywords;

// 実行結果

// \$URL \: \/で始まる。
```

#### str_replace(), strtr()

- 文字列の置換。

- strtr() は複数の文字列のペアを渡して同時に置換できる。

- 第四引数の「置換した回数」は省略可能。

- [公式マニュアル](http://php.net/manual/ja/function.str-replace.php)

- [公式マニュアル](http://php.net/manual/ja/function.strtr.php)

```php 	
// str_replace(検索文字列 ,置換後文字列 ,検索対象文字列,置換した回数)

$names = ['佐藤', '高橋', '鈴木', '高橋', '中村'];
$replace = str_replace('高橋', '小松', $names, $count);
print_r($replace);
echo '置換した回数: '.$count;

// 実行結果

/*
Array
(
    [0] => 佐藤
    [1] => 小松
    [2] => 鈴木
    [3] => 小松
    [4] => 中村
)
置換回数: 2
*/
```

```php
// strtr(置換対象文字列, 文字列(配列))

$array = array("佐藤"=>"鈴木","田中"=>"田丸","高橋"=>"高峰");
print strtr("佐藤 田中 大川 大橋 高橋", $array);

// 実行結果

// 鈴木 田丸 大川 大橋 高峰
```

#### substr(), mb_substr()

- 文字列を切り出す。指定文字によって、何番目から何番目までを指定可能。

- [公式マニュアル](http://php.net/manual/ja/function.substr.php)

- [公式マニュアル](http://php.net/manual/ja/function.mb-substr.php)

```php
// substr (文字列, 開始位置 ) 

echo substr('America', 1);
echo mb_substr('あいうえおかきくけこ', 3);

// 実行結果

// merica
// かきくけこ
```

#### strtolower(), strtoupper()

- strtolower()はアルファベットの小文字変換。

- strtoupper()はアルファベットの大文字変換。

- [公式マニュアル](http://php.net/manual/ja/function.strtolower.php)

- [公式マニュアル](http://php.net/manual/ja/function.strtoupper.php)

```php
// strtolower(対象文字列)

$name = "JOHN,Bob,michaEl";
$result = strtolower($name);
echo $result;

// 実行結果

// john,bob,michael
```

```php
// strtoupper(対象文字列)

$name = "JOhN,Bob,michaEl";
$result = strtoupper($name);
echo $result;

// 実行結果

// JOHN,BOB,MICHAEL
```

#### strlen(), mb_strlen()

- strlen() は文字列のバイト数を返す。

- mb_strlen はマルチバイト文字の文字数を返す。

- [公式マニュアル](http://php.net/manual/ja/function.strlen.php)

- [公式マニュアル](http://php.net/manual/ja/function.mb-strlen.php)

```php
// strlen(対象文字列)

$name = 'Michael';
echo strlen($message);

//　実行結果

// 7
```

```php
// mb_strlen(対象文字列)

$message = '私は男です';
echo mb_strlen($message);

//　実行結果

// 5
```

#### strpos(), mb_strpos()

- 指定文字列が何文字目に存在するかを返す。

- 大文字小文字を区別しない場合、stripos()、mb_stripos() が用意されている。

- [公式マニュアル](http://php.net/manual/ja/function.strpos.php)

- [公式マニュアル](http://php.net/manual/ja/function.mb-strpos.php)

```php
// strpos(検索対象文字列,指定文字列)

$name = 'michael';
$findword   = 'a';
$result = strpos($name, $findword);

if ($result === false) {
    echo "'$findword' は、'$name' の中で見つかりませんでした";
} else {
    echo "'$findword' が、'$name' の中で見つかりました\n";
    echo "位置 : $result";
}

// 実行結果

/*
'a' が、'michael' の中で見つかりました
位置 : 4
*/
```

#### mb_convert_encoding()

- 文字エンコーディングを変換する。

- [公式マニュアル](http://php.net/manual/ja/function.mb-convert-encoding.php)

```php
// mb_convert_encoding(対象文字列,変換文字コード,対象文字コード)

/* 内部文字エンコーディングからSJISへの変換 */
$name = mb_convert_encoding($name, "SJIS");

/* SJISからUTF-8に変換 */
$name = mb_convert_encoding($name, "UTF-8", "SJIS");

/* "auto" 指定で、"ASCII,JIS,UTF-8,EUC-JP,SJIS" に展開 */
$name = mb_convert_encoding($name, "EUC-JP", "auto");
```

#### mb_convert_kana()

- ひらがな・カタカナ、全角・半角を相互に変換する。

- 下記、オプション。

|オプション|意味|
|:---:|:---:|
|r|「全角」英字を「半角」に変換|
|R|「半角」英字を「全角」に変換|
|n|「全角」数字を「半角」に変換|
|N|「半角」数字を「全角」に変換|
|a|「全角」英数字を「半角」に変換|
|A|「半角」英数字を「全角」に変換|
|s|「全角」スペースを「半角」に変換|
|S|「半角」スペースを「全角」に変換|
|k|「全角カタカナ」を「半角カタカナ」に変換|
|K|「半角カタカナ」を「全角カタカナ」に変換|
|h|「全角ひらがな」を「半角カタカナ」に変換|
|H|「半角カタカナ」を「全角ひらがな」に変換|
|c|「全角カタカナ」を「全角ひらがな」に変換|
|C|「全角ひらがな」を「全角カタカナ」に変換|
|V|濁点付きの文字を一文字に変換|

- [公式マニュアル](http://php.net/manual/ja/function.mb-convert-kana.php)

```php
// mb_convert_kana(対象文字列,オプション)

/* 「半角カタカナ」を「全角カタカナ」に変換し、「全角」英数字を「半角」に変換。 */
$str = mb_convert_kana($str, "KVa");
```

#### trim(), ltrim(), rtrim()

- 文字列の前後からスペースやタブなどの空白文字や指定された文字を取り除く。

- trim() は前後から取り除き、ltrim() は左から、rtrim() は右からのみ取り除く。

- [公式マニュアル](http://php.net/manual/ja/function.trim.php)

- [公式マニュアル](http://php.net/manual/ja/function.ltrim.php)

- [公式マニュアル](http://php.net/manual/ja/function.rtrim.php)

```php
// trim(対象文字列)
// rtrim(対象文字列)
// ltrim(対象文字列)

$name = ' satou ';
$job = ' engineer ';
$origin = ' japan ';

$new_name = trim($name);
$new_job = ltrim($job);
$new_origin = rtrim($origin);

var_dump($new_name);
var_dump($new_job);
var_dump($new_origin);

// 実行結果

/*
string(5) "satou"
string(9) "engineer "
string(6) " japan"
*/
```

#### mt_rand()

- 指定された範囲でランダムな数値を返す。

- rand()より高精度。

- [公式マニュアル](http://php.net/manual/ja/function.mt-rand.php)

```php
// mt_rand(最小値,最大値)

// オプション指定なし。
echo mt_rand() . "\n";
// オプション指定あり。
echo mt_rand(10,20);

// 実行結果

/*
1458218741
13
*/
```

#### is_string()

- 指定変数が文字列であるかを返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-string.php)

```php
// is_string(変数)

$name="佐藤";
if ( is_string($name) ) {
　print "文字列です。";
} else {
　print "文字列ではありません。";
}

// 実行結果

// 文字列です。
```

#### is_int()

- 指定変数が整数型であるかを返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-int.php)

```php
// is_int(対象変数)

$number=78.00;
if (is_int($number)) {
    echo '整数型です。';
}else {
    echo '整数型ではありません。';
}

// 実行結果

// 整数型ではありません。
```

#### is_float()

- 与えられた値が float型(少数) であるかを返す。

- is_double()も存在はするが、is_flostと同様。

- [公式マニュアル](http://php.net/manual/ja/function.is-float.php)

```php
// is_float(対象変数)

$number=78.00;
if (is_float($number)) {
    echo '浮動小数型です。';
}else {
    echo '浮動小数型ではありません。';
}

// 実行結果

// 浮動小数型です。
```

#### is_numeric()

- 与えられた値が数字として扱えるかを返す。文字列でも良い。

- [公式マニュアル](http://php.net/manual/ja/function.is-numeric.php)

```php
// is_numeric(対象変数)

$str_number = '10';
$int_number = 10;

if(is_numeric($str_number)){
    echo 'これは数値として扱える。';
}else{
    echo '駄目です。';
}

// 実行結果

// これは数値として扱える。
```

#### round()
- 小数部分を四捨五入して整形。

- 桁数指定で、変更できる。

- 第三引数での「オプションモード」を指定できる。

- 下記、オプションモード

|定数|意味|
|:---:|:---:|
|PHP_ROUND_HALF_UP|小数点を指定桁数に、0から離れる方向に整形|
|PHP_ROUND_HALF_DOWN|小数点を指定桁数に、0に近づく方向に整形|
|PHP_ROUND_HALF_EVEN|小数点を指定桁数に、次の偶数に整形|
|PHP_ROUND_HALF_ODD|小数点を指定桁数に、次の奇数に整形|

- [公式マニュアル](http://php.net/manual/ja/function.round.php)

```php
// round(値,桁数,オプションモード)

// 通常指定
echo round(34.5) . "\n";
// 桁数指定
echo round(5.5555, 2) . "\n";
echo round(123456789, -3);
// モード指定
echo round(-1.55, 1, PHP_ROUND_HALF_UP) . "\n";
echo round(-1.55, 1, PHP_ROUND_HALF_DOWN) . "\n";
echo round(-1.55, 1, PHP_ROUND_HALF_EVEN) . "\n";
echo round(-1.55, 1, PHP_ROUND_HALF_ODD);

// 実行結果

/*
35
5.56
123457000
-1.6
-1.5
-1.6
-1.5
*/

```

#### floor()
- 小数部分を、小数点以下切り捨てして整形。

- `※値が小さい方へ小数点以下を切り捨てるため、マイナスの場合は注意`

- [公式マニュアル](http://php.net/manual/ja/function.floor.php)

```php
// floor(値)

echo floor(3.14) . "\n";
echo floor(-3.14);

// 実行結果

/*
3
-4
*/
```

#### ceil()
- ceil() は小数点以下切り上げでして整形。

- [公式マニュアル](http://php.net/manual/ja/function.ceil.php)

```php
// ceil(値)

echo ceil(3.14) . "\n";
echo ceil(-3.14);

// 実行結果

/*
4
-3
*/
```

### 配列

#### array_key_exists()

- 指定したキー、または添字が配列にあるか、調べる。

- issetの違い
    - キーがNULLでも、「true」が出る。

- [公式マニュアル](http://php.net/manual/ja/function.array-key-exists.php)

```php
<?php

array_key_exists( 'キー', $配列名 )
```

#### array_slice()

- 配列の何番目からいくつ取り出すかを指定して取得する。

- [公式マニュアル](http://php.net/manual/ja/function.array-slice.php)

```php

```

#### array_merge(), array_merge_recursive()

- 配列同士を結合する。array_merge_recursive() は再帰的に結合するため多次元配列でも使える。

- [公式マニュアル](http://php.net/manual/ja/function.array-merge.php)

- [公式マニュアル](http://php.net/manual/ja/function.array-merge-recursive.php)

```php

```

#### in_array()

- 配列の中に指定された値が含まれているかを返す。

- 第三引数指定は任意だが、デフォルトがfalseのため、trueを指定しとかないと、予期せぬ結果を起こす可能性がある。

- [公式マニュアル](http://php.net/manual/ja/function.in-array.php)

```php
in_array('キー', $配列, true)
```

#### shuffle()

- 配列をランダムにシャッフルする。

- [公式マニュアル](http://php.net/manual/ja/function.shuffle.php)

```php

```

#### sort(), rsort()

- 配列を昇順、降順でソート（並び替え）する。キーは新しく割り振られるため、もともとのキーは削除される。

- [公式マニュアル](http://php.net/manual/ja/function.sort.php)

- [公式マニュアル](http://php.net/manual/ja/function.rsort.php)

```php

```

#### asort(), arsort()

- 連想配列を昇順、降順でソート（並び替え）する。もともとのキーは保持される。

- [公式マニュアル](http://php.net/manual/ja/function.asort.php)

- [公式マニュアル](http://php.net/manual/ja/function.arsort.php)

```php

```

#### ksort(), krsort()

- 配列のキーをもとに昇順、降順でソートする。

- [公式マニュアル](http://php.net/manual/ja/function.ksort.php)

- [公式マニュアル](http://php.net/manual/ja/function.krsort.php)

```php

```

#### usort(), uasort(), uksort()

- ユーザーが定義した関数に基づいて配列をソートする。

- [公式マニュアル](http://php.net/manual/ja/function.usort.php)

- [公式マニュアル](http://php.net/manual/ja/function.uasort.php)

- [公式マニュアル](http://php.net/manual/ja/function.uksort.php)

```php

```

#### array_multisort()

- 複数の配列を他の配列の値をもとにソートする。

- [公式マニュアル](http://php.net/manual/ja/function.array-multisort.php)

```php

```

#### array_unique()

- 配列から重複した値を削除して返す。

- [公式マニュアル](http://php.net/manual/ja/function.array-unique.php)

```php

```

#### array_reverse()

- 配列の要素を逆順にして返す。

- [公式マニュアル](http://php.net/manual/ja/function.array-reverse.php)

```php

```

#### array_shift(), array_pop()

- array_shift() は配列の先頭から要素を取り出し、

- array_pop() は配列の末尾から要素を取り出す。

- 元の配列は取り出された分短くなる。

- [公式マニュアル](http://php.net/manual/ja/function.array-shift.php)

- [公式マニュアル](http://php.net/manual/ja/function.array-pop.php)

```php

```

#### array_walk(), array_walk_recursive()

- ユーザー定義関数を配列中のすべての値に適用する。

- arra_walk_recursive() は多次元配列に対して再帰的に処理する。

- [公式マニュアル](http://php.net/manual/ja/function.array-walk.php)

- [公式マニュアル](http://php.net/manual/ja/function.array-walk-recursive.php)

```php
// array_walk(配列,定義関数,引数オプション)

$array = array(10,20,30,40,50);
function ten_add (&$i) {
		$i += 10;
	}
array_walk($array,'tenAdd');
print_r($array);

// 実行結果

/*
Array
(
    [0] => 20
    [1] => 30
    [2] => 40
    [3] => 50
    [4] => 60
)
*/
```

```php
// array_walk_recursive(配列,定義関数,引数オプション)

$data = array('name' => '佐藤', 'age' => '67');
$info = array('company' => $data, 'friend' => 'たくさん');

function show_info($item, $key)
{
    echo "$key : $item\n";
}

array_walk_recursive($info, 'show_info');

// 実行結果

/*
name : 佐藤
age : 67
friend : たくさん
*/
```

#### array_search()

- 指定要素を配列から検索。

- 見つかった場合キー（要素番号）を返し、見つからなかった場合、falseを返す。

- 「型チェックオプション」は省略可能だが、型判定をきちんと行うために、指定する。

- [公式マニュアル](http://php.net/manual/ja/function.array-search.php)

```php
// array_search(検索値,配列,型チェックオプション)

$names = ['佐藤', '鈴木', '田中'];
$result = array_search('佐藤', $names,TRUE);
print_r($result);

// 実行結果

// 0
```

```php
$names = ['佐藤', '鈴木', '田中'];
$result = array_search('高橋', $names,TRUE);
echo $result;

// 実行結果

// (false)
```

#### implode(), explode()

- implode() は指定された区切り文字をもとに配列を文字列として結合。

- 指定配列は一次元配列である必要がある。

- explode() は指定された区切り文字を元に文字列を配列に変換する。

- [公式マニュアル](http://php.net/manual/ja/function.implode.php)

- [公式マニュアル](http://php.net/manual/ja/function.explode.php)

```php
// implode(区切り文字,配列)

$names = ['佐藤', '田中', '鈴木'];
$result = implode(',', $names);
echo $result;

// 実行結果

// 佐藤,田中,鈴木
```

```php
<?php
// explode ( 区切り文字列 , 対象の文字列 ,最大要素数 )

// 例1. 最大要素数指定なし。
$arrayDayList = explode("/","2019/02/28");
print_r($arrayDayList);

// 例2. 最大指定数指定あり。
$arrayEnglish = explode("/","A/B/C/D/E",2);
print_r($arrayEnglish);

// 実行結果

/*
Array
(
    [0] => 2019
    [1] => 02
    [2] => 28
)
*/
```

#### range()

- 指定された範囲の整数・文字を持つ配列を作成する。

- [公式マニュアル](http://php.net/manual/ja/function.range.php)

```php
// range(開始値,終了値,要素毎の増加数)

// 増加数指定無しの場合
foreach (range(0, 12) as $number) {
    echo $number;
}

// 実行結果

// 0123456789101112

// 増加数指定有りの場合
foreach (range('a', 'z',5) as $english) {
    echo $english;
}

// 実行結果

// afkpuz
```

#### current()

- 現在の配列のポインタが指す値取得。

- [公式マニュアル](http://php.net/manual/ja/function.current.php)

```php
// next($配列)

$names = array( "佐藤", "鈴木" , "田中" );
$name = current($names);
echo "$name";

// 実行結果

// 佐藤
```

#### next(), prev()

- next()は配列のポインタを進め、その値を取得。

- prev()は配列のポインタを戻し、その値を取得。

- [公式マニュアル](http://php.net/manual/ja/function.next.php)

- [公式マニュアル](http://php.net/manual/ja/function.prev.php)

```php
// next($配列)
// prev($配列)

$names = array( "佐藤", "鈴木" , "田中" );
$name = current($names);
echo "$name\n";
next($names);
$name = current($names);
echo "$name\n";
prev($names);
$name = current($names);
echo "$name";

// 実行結果

/*
佐藤
鈴木
佐藤
*/
```

#### reset(), end()

- reset()は配列のポインタを先頭の要素へ初期化し、その値を取得。

- reset()は配列のポインタを最後の要素へ進めて、その値を取得。

- 配列の最初や最後の要素を取得する目的で使うことが多い。

- [公式マニュアル](http://php.net/manual/ja/function.reset.php)

- [公式マニュアル](http://php.net/manual/ja/function.end.php)

```php
// reset($配列)
// end($配列)

$names = array( "佐藤", "鈴木" , "田中" );
$name = current($names);
echo "$name\n";
$names = array( "佐藤", "鈴木" , "田中" );
$name = next($names);
echo "$name\n";
$names = array( "佐藤", "鈴木" , "田中" );
$name = reset($names);
echo "$name\n";
$names = array( "佐藤", "鈴木" , "田中" );
$name = end($names);
echo "$name";

// 実行結果

/*
佐藤
鈴木
佐藤
田中
*/
```

#### extract()

- 配列を複数の変数に展開する。

- 引数に指定できるオプションは、「EXTR_OVERWRITE」以外にもたくさんある。

- `※信頼できない「$_GET」「$_POST」「$_FILES」には、絶対使わない`

- [公式マニュアル](http://php.net/manual/ja/function.extract.php)

```php
// extract($配列);

$data = array(
    "name" => "佐藤",
    "age" => "68",
    "hobby" => "アイドル鑑賞"
);
extract($data);
echo "名前 : {$name}";

//　実行結果

// 名前 : 佐藤
```

```php
// 「EXTR_OVERWRITE」オプションを指定して、既存の変数を上書き。

$name = '田中';

$data = array(
    "name" => "佐藤",
    "age" => "68",
    "hobby" => "アイドル鑑賞"
);
extract($data,EXTR_OVERWRITE);
echo "名前 : {$name}";

// 実行結果

// 名前 : 佐藤
```

#### list()

- 配列の値を、複数の変数に代入。

- 厳密には関数ではなく言語構造である。

- [公式マニュアル](http://php.net/manual/ja/function.list.php)

```php
// list(変数) = 配列

$data = array('佐藤', '12', '読書');
list($name, $age, $hobby) = $data;
echo "名前 : " . $name;

// 実行結果

// 名前 : 佐藤
```

```php
$names = ['佐藤','田中','鈴木','鈴木','小松'];
$items = ['item1', 'item2', 'item3'];
 
list($names[0], $names[2]) = $items;
 
print_r($names);

// 実行結果

/*
Array
(
    [0] => item1
    [1] => 田中
    [2] => item2
    [3] => 鈴木
    [4] => 小松
)
*/
```

#### is_array()

- 渡された変数が配列であるかを返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-array.php)

```php
// is_array(変数)

$data = array("東京","大阪","福岡");
is_array($data)
if (is_array($data) ) {
　echo "配列です";
} else {
　echo "配列ではありません";
}

// 実行結果

// 配列です
```

### ファイル操作

#### file_get_contents()

- ファイルの内容をすべて取得する。また、URLを指定してウェブサイトのソースを取得することもできる。

- [公式マニュアル](http://php.net/manual/ja/function.file-get-contents.php)

#### file_put_contents()

- 文字列をファイルとして保存する。モードを指定することで追記したり排他ロックが利用できる。

- [公式マニュアル](http://php.net/manual/ja/function.file-put-contents.php)

#### basename()

- ファイルやディレクトリのパスから最後にある名前の部分を返す。

- [公式マニュアル](http://php.net/manual/ja/function.basename.php)

#### dirname()

- ファイルパスからディレクトリパスを取り出して返す。

- dirname(`__FILE__`) とすることで実行中のPHPファイルのあるディレクトリを得ることもできる。

- これは「`__DIR__`」と同義。

- [公式マニュアル](http://php.net/manual/ja/function.dirname.php)

#### realpath()

- パスの「/./」や「/../」「/」などの参照を全て解決して正規化した絶対パスを返す。

- [公式マニュアル](http://php.net/manual/ja/function.realpath.php)

#### file_exists()

- 指定されたファイルパスにファイルが存在するかを調べて返す。

- [公式マニュアル](http://php.net/manual/ja/function.file-exists.php)

#### fopen()

- ファイルやURLをオープンしてストリームに結びつける。

- [公式マニュアル](http://php.net/manual/ja/function.fopen.php)

#### flock()

- fopen() によってオープンされたファイルのロック・開放を行う。

- [公式マニュアル](http://php.net/manual/ja/function.flock.php)

#### fgets()

- ファイルポインタから一行取得する。

- [公式マニュアル](http://php.net/manual/ja/function.fgets.php)

#### fgetcsv()

- ファイルポインタから一行取得し、指定された文字をもとに区切られた配列を返す。

- [公式マニュアル](http://php.net/manual/ja/function.fgetcsv.php)

#### fwrite()

- fopen() によってオープンされたファイルストリームに書き込む。

- [公式マニュアル](http://php.net/manual/ja/function.fwrite.php)

#### fclose()

- fopen() によってオープンされたファイルポインタをクローズする。

- [公式マニュアル](http://php.net/manual/ja/function.fclose.php)

#### rewind()

- ファイルポインタの位置を先頭に戻す。

- [公式マニュアル](http://php.net/manual/ja/function.rewind.php)

#### ftruncate()

- fopen() によってオープンされたファイルの内容を指定した長さに丸める。

- サイズに 0 を指定することでファイルを空にできる。

- [公式マニュアル](http://php.net/manual/ja/function.ftruncate.php)

#### feof()

- ファイルポインタが終端に達しているかを調べて返す。

- [公式マニュアル](http://php.net/manual/ja/function.feof.php)

#### is_uploaded_file()

- ファイルが HTTP POST によりアップロードされたファイルであるかを調べて返す。

- 不正操作を防ぐために用いられる。

- [公式マニュアル](http://php.net/manual/ja/function.is-uploaded-file.php)

#### move_uploaded_file()

- ファイルが HTTP POST によりアップロードされたファイルである場合、指定されたファイル名に移動する。

- [公式マニュアル](http://php.net/manual/ja/function.move-uploaded-file.php)

#### mkdir()

- ディレクトリを作る。パーミッションを設定したり入れ子構造のディレクトリを作ることもできる。

- [公式マニュアル](http://php.net/manual/ja/function.mkdir.php)

#### unlink()

- ファイルを削除する。

- [公式マニュアル](http://php.net/manual/ja/function.unlink.php)

#### rmdir()

- ディレクトリを削除する。

- [公式マニュアル](http://php.net/manual/ja/function.rmdir.php)

#### rename()

- ファイル名を変える。

- ファイルを移動する。

- [公式マニュアル](http://php.net/manual/ja/function.rename.php)

#### copy()

- ファイルをコピーする。

- [公式マニュアル](http://php.net/manual/ja/function.copy.php)

#### is_file()

- 指定されたパスがファイルを指しているかを調べて返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-file.php)

#### is_dir()

- 指定されたパスがディレクトリを指しているかを調べて返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-dir.php)

#### chmod()

- ファイルのパーミッションを変更する。

- [公式マニュアル](http://php.net/manual/ja/function.chmod.php)

#### chown()

- ファイルのオーナーを変更する。

- [公式マニュアル](http://php.net/manual/ja/function.chown.php)

### ネットワーク

#### htmlspecialchars()

- HTMLの特殊文字として扱われる文字をHTMLエンティティに変換する。（エスケープ）

- 「<」などは「&lt;」に変換され、HTMLタグとして扱われることを防げるほか、不正なスクリプトタグを仕込まれて実行されるリスクを回避できる。

- 大抵は「ENT_QUOTES」フラグを用いてシングルクォートも変換対象にする。

- [公式マニュアル](http://php.net/manual/ja/function.htmlspecialchars.php)

#### header()

- 生の HTTP ヘッダーを出力する。

- 「HTTP/1.0 404 Not Found」などのステータスコードを出力したり、「Content-Type: image/jpeg」などのファイルヘッダーを出力することができる。

- 「Location: http://www.example.com」とすることで指定された URL にリダイレクトする際にも用いられる。

- [公式マニュアル](http://php.net/manual/ja/function.header.php)

#### nl2br()

- 文字列の改行箇所を「<br>」などの改行タグに変換する。

- [公式マニュアル](http://php.net/manual/ja/function.nl2br.php)

#### strip_tags()

- 文字列から HTML タグを取り除く。許可するタグを指定することもできる。

- [公式マニュアル](http://php.net/manual/ja/function.strip-tags.php)

#### http_build_query()

- 連想配列からURLエンコードされたクエリ文字列を生成する。

- つまり配列を GET パラメータとして使える「foo=123&bar=hello」のような文字列に変換できる。

- [公式マニュアル](http://php.net/manual/ja/function.http-build-query.php)

#### rawurlencode(), rawurldecode()

- rawurlencode() は非アルファベット文字をパーセント記号と16進数を用いて URL として利用できる文字列に変換する。

- rawurldecode() によって元の文字列を復元できる。

- [公式マニュアル](http://php.net/manual/ja/function.rawurlencode.php)

- [公式マニュアル](http://php.net/manual/ja/function.rawurldecode.php)

#### filter_input()

- GET、POST などのパラメータをフィルタリングしたうえで受け取る。

- $_GET、$_POST を直接操作するかわりにこの関数を通す。

- [公式マニュアル](http://php.net/manual/ja/function.filter-input.php)

#### filter_var()

- 指定したフィルターでデータをフィルタリングする。

- データがメールアドレスとして正しい書式であるかを調べたり、特殊文字を取り除いたりするなど、様々なフィルタが利用できる。

- [公式マニュアル](http://php.net/manual/ja/function.filter-var.php)

#### session_start()

- セッションを開始する。セッションIDを渡すことで現在のセッションを復帰することもできる。

- [公式マニュアル](http://php.net/manual/ja/function.session-start.php)

#### session_regenerate_id()

- セッションの情報を位置したままセッションIDを新しく生成した値に置き換える。

- セッションハイジャック攻撃を防ぐ手段として用いられる。

- [公式マニュアル](http://php.net/manual/ja/function.session-regenerate_id.php)

#### session_destroy()

- セッション情報を全て破棄する。再開するには再度 session_start() する必要がある。

- [公式マニュアル](http://php.net/manual/ja/function.session-destroy.php)

#### setcookie()

- クッキーに値を保存する。有効期限を設定することもできる。

- [公式マニュアル](http://php.net/manual/ja/function.setcookie.php)

#### hash()

- 選択したアルゴリズムに基づいてハッシュ値を生成する。

- [公式マニュアル](http://php.net/manual/ja/function.hash.php)

#### md5()

- MD5 アルゴリズムを用いてハッシュ値を生成する。

- [公式マニュアル](http://php.net/manual/ja/function.md5.php)

#### password_hash()

- 選択したアルゴリズムを用いてパスワード用のハッシュ値を生成する。

- これによって作成されたパスワードは password_verify() によってマッチしたかを検証できる。

- [公式マニュアル](http://php.net/manual/ja/function.password-hash.php)

#### password_verify()

- password_hash() によって作られたパスワードと生のパスワード文字列がマッチするかを検証する。

- [公式マニュアル](http://php.net/manual/ja/function.password-verify.php)

#### base64_encode(), base64_decode()

- 文字列を MIME base64 方式でエンコード、デコードする。

- [公式マニュアル](http://php.net/manual/ja/function.base64-encode.php)

- [公式マニュアル](http://php.net/manual/ja/function.base64-decode.php)

#### json_encode(), json_decode()

- 連想配列を JSON 形式にして返したり、JSON 形式の文字列を連想配列に変換する。

- json_decode() を行う際第二引数に true を指定すると stdClass Object のかわりに連想配列に変換される。

- [公式マニュアル](http://php.net/manual/ja/function.json-encode.php)

- [公式マニュアル](http://php.net/manual/ja/function.json-decode.php)

#### mb_send_mail()

- mb_language() により設定された言語に基づいてエンコード変換を行ってメールを送信する。

- [公式マニュアル](http://php.net/manual/ja/function.mb-send-mail.php)

### その他

#### print_r()

- 変数の内容をわかりやすく表示する。

- 文字列に限らず連想配列も表示できるほか、第二引数に true を指定することで結果を文字列として返すこともできる。

- [公式マニュアル](http://php.net/manual/ja/function.print-r.php)

#### var_dump()

- 変数の内容を詳細にダンプする。

- 含まれるオブジェクトの型、内容を細かく知ることができる。

- print_r() よりも詳細な内容を知りたい時に使う。

- [公式マニュアル](http://php.net/manual/ja/function.var-dump.php)

#### count()

- 配列やオブジェクトの要素数を数えて返す。

- [公式マニュアル](http://php.net/manual/ja/function.count.php)

#### isset()

- 変数宣言の有無、配列キー存在判断。

- NULLでも、TRUE を返す。キーの存在を調べる関数として、ray_key_exists()があるが、そちらは ["key" => NULL] の場合 FALSE を返す。

- [公式マニュアル](http://php.net/manual/ja/function.isset.php)

```php
if (isset(変数)) {
    // 変数が存在しているときの処理。
}
```

```php
if ( isset(配列[キー]) ) {
    // 配列が存在しているときの処理。
}
```

#### empty()

- 変数の内容が空であるかを返す。
- 下記が、「空である」の判断
    - 「0」
    - 「空配列」
    - 「NULL」
    - 「FALSE」

- [公式マニュアル](http://php.net/manual/ja/function.empty.php)

```php
if (empty(変数)) {
    // 変数が空であるときの処理。
}
```

#### unset()

- 指定した変数を破棄する。連想配列から一部のキーを取り除く際にも使える。

- [公式マニュアル](http://php.net/manual/ja/function.unset.php)

#### time(), microtime()

- 現在のUNIXタイムスタンプを得る。

- 1970年1月1日 00:00:00 GMT からの通算秒。

- マイクロ秒まで知りたい場合は microtime() を使う。

- [公式マニュアル](http://php.net/manual/ja/function.time.php)

- [公式マニュアル](http://php.net/manual/ja/function.microtime.php)

#### mktime()

- 時、分、秒、月、日、年 を指定することでその日時のUNIXタイムスタンプを得る。

- [公式マニュアル](http://php.net/manual/ja/function.mktime.php)

#### date()

- UNIXタイムスタンプを日時を表す文字列としてフォーマットして出力する。

- 日時の取り扱いに関しては date() よりも DateTime クラスを利用するケースが増えている。

- [公式マニュアル](http://php.net/manual/ja/function.date.php)

#### define()

- 定数を定義する。定数は書き換えられることのない変数のような値で、関数内などあらゆるスコープで利用できる。

- 大文字のアルファベットで名前をつける習慣がある。

- [公式マニュアル](http://php.net/manual/ja/function.define.php)