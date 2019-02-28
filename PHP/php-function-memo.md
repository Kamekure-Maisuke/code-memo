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
            - [round(), floor(), ceil()](#round-floor-ceil)
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
            - [reset(), end()](#reset-end)
            - [next(), prev()](#next-prev)
            - [current()](#current)
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

- printf()は配列として出力を行い、sprintf() は結果を文字列として返す。

- [公式マニュアル](http://php.net/manual/ja/function.printf.php)

- [公式マニュアル](http://php.net/manual/ja/function.sprintf.php)

```php
<?php
// printf(フォーマット文字列,値,値);

printf('今日は%d月%d日です。',date('m'),date('d'));
```

```php
<?php
// sprintf(フォーマット文字列,値,値);

$number = sprintf('%04d',30);
echo $number;
```

#### preg_match(),preg_match_all()

- 正規表現による一致・検索。

- パターンに一致すれば「1」、一致しなければ「2」を返す。

- preg_match_all() はパターンにマッチしたすべての値を変数に格納する。

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
```

```php
<?php
// 「PREG_OFFSET_CAPTURE」を指定して、一致文字列の登場位置（オフセット）をバイト数で取得
// ※半角は1バイト、全角は2バイト

  if (preg_match('/経済/', '世界経済情勢',$data,PREG_OFFSET_CAPTURE)) {
    echo 'ある';
  } else {
    echo 'ない';
  }
  print_r($data)
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
```

#### preg_replace()

- 正規表現による置換。パターンにマッチした文字列を指定した文字列に置換する。

- [公式マニュアル](http://php.net/manual/ja/function.preg-replace.php)

#### preg_quote()

- 正規表現構文の特殊文字の前にバックスラッシュをつけてエスケープする。

- [公式マニュアル](http://php.net/manual/ja/function.preg-quote.php)

#### str_replace(), strtr()

- 文字列の置換。strtr() は複数の文字列のペアを渡して同時に置換できる。

- [公式マニュアル](http://php.net/manual/ja/function.str-replace.php)

- [公式マニュアル](http://php.net/manual/ja/function.strtr.php)

#### substr(), mb_substr()

- 文字列の何文字目から何文字取り出すかを指定して文字列の一部分を返す。

- [公式マニュアル](http://php.net/manual/ja/function.substr.php)

- [公式マニュアル](http://php.net/manual/ja/function.mb-substr.php)

#### strtolower(), strtoupper()

- strtolower() はすべてのアルファベットを小文字に変換。

- strtoupper() はすべてのアルファベットを大文字に変換する。

- [公式マニュアル](http://php.net/manual/ja/function.strtolower.php)

- [公式マニュアル](http://php.net/manual/ja/function.strtoupper.php)

#### strlen(), mb_strlen()

- strlen() は文字列のバイト数を返す。

- mb_strlen はマルチバイト文字の文字数を返す。

- [公式マニュアル](http://php.net/manual/ja/function.strlen.php)

- [公式マニュアル](http://php.net/manual/ja/function.mb-strlen.php)

#### strpos(), mb_strpos()

- 文字列の中から指定された文字列が何文字目に存在するかを返す。

- 大文字小文字を区別しない場合、stripos()、mb_stripos() が用意されている。

- [公式マニュアル](http://php.net/manual/ja/function.strpos.php)

- [公式マニュアル](http://php.net/manual/ja/function.mb-strpos.php)

#### mb_convert_encoding()

- 文字列を指定された文字コードに変換して返す。

- [公式マニュアル](http://php.net/manual/ja/function.mb-convert-encoding.php)

#### mb_convert_kana()

- ひらがな・カタカナ、全角・半角を相互に変換する。

- [公式マニュアル](http://php.net/manual/ja/function.mb-convert-kana.php)

#### trim(), ltrim(), rtrim()

- 文字列の前後からスペースやタブなどの空白文字や指定された文字を取り除く。

- trim() は前後から取り除き、ltrim() は左から、rtrim() は右からのみ取り除く。

- [公式マニュアル](http://php.net/manual/ja/function.trim.php)

- [公式マニュアル](http://php.net/manual/ja/function.ltrim.php)

- [公式マニュアル](http://php.net/manual/ja/function.rtrim.php)

```php
$name = ' oono ';
$job = ' engineer ';
$origin = ' 沖縄 ';
 
//空白を取り除く
$new_name = trim($name); // 「oono」
$new_job = ltrim($job); // 「engineer 」
$new_origin = rtrim($origin); // 「 沖縄」
```

#### mt_rand()

- 指定された範囲でランダムな数値を返す。

- rand() より精度が高い。

- [公式マニュアル](http://php.net/manual/ja/function.mt-rand.php)

#### is_string()

- 与えられた値が文字列であるかを返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-string.php)

#### is_int()

- 与えられた値が整数型であるかを返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-int.php)

#### is_float()

- 与えられた値が float型(少数) であるかを返す。

- is_double() も存在するが内容は is_float() の別名。

- [公式マニュアル](http://php.net/manual/ja/function.is-float.php)

#### is_numeric()

- 与えられた値が数字として扱えるかを返す。文字列でも良い。

- [公式マニュアル](http://php.net/manual/ja/function.is-numeric.php)

#### round(), floor(), ceil()

- round() は小数部分を四捨五入して返す。

- floor() は小数点以下切り捨て、ceil() は小数点以下切り上げで丸める。

- 桁数を指定することで小数点以下何桁から丸めるかを変更できる。

- [公式マニュアル](http://php.net/manual/ja/function.round.php)

- [公式マニュアル](http://php.net/manual/ja/function.floor.php)

- [公式マニュアル](http://php.net/manual/ja/function.ceil.php)

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

#### array_merge(), array_merge_recursive()

- 配列同士を結合する。array_merge_recursive() は再帰的に結合するため多次元配列でも使える。

- [公式マニュアル](http://php.net/manual/ja/function.array-merge.php)

- [公式マニュアル](http://php.net/manual/ja/function.array-merge-recursive.php)

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

#### sort(), rsort()

- 配列を昇順、降順でソート（並び替え）する。キーは新しく割り振られるため、もともとのキーは削除される。

- [公式マニュアル](http://php.net/manual/ja/function.sort.php)

- [公式マニュアル](http://php.net/manual/ja/function.rsort.php)

#### asort(), arsort()

- 連想配列を昇順、降順でソート（並び替え）する。もともとのキーは保持される。

- [公式マニュアル](http://php.net/manual/ja/function.asort.php)

- [公式マニュアル](http://php.net/manual/ja/function.arsort.php)

#### ksort(), krsort()

- 配列のキーをもとに昇順、降順でソートする。

- [公式マニュアル](http://php.net/manual/ja/function.ksort.php)

- [公式マニュアル](http://php.net/manual/ja/function.krsort.php)

#### usort(), uasort(), uksort()

- ユーザーが定義した関数に基づいて配列をソートする。

- [公式マニュアル](http://php.net/manual/ja/function.usort.php)

- [公式マニュアル](http://php.net/manual/ja/function.uasort.php)

- [公式マニュアル](http://php.net/manual/ja/function.uksort.php)

#### array_multisort()

- 複数の配列を他の配列の値をもとにソートする。

- [公式マニュアル](http://php.net/manual/ja/function.array-multisort.php)

#### array_unique()

- 配列から重複した値を削除して返す。

- [公式マニュアル](http://php.net/manual/ja/function.array-unique.php)

#### array_reverse()

- 配列の要素を逆順にして返す。

- [公式マニュアル](http://php.net/manual/ja/function.array-reverse.php)

#### array_shift(), array_pop()

- array_shift() は配列の先頭から要素を取り出し、

- array_pop() は配列の末尾から要素を取り出す。

- 元の配列は取り出された分短くなる。

- [公式マニュアル](http://php.net/manual/ja/function.array-shift.php)

- [公式マニュアル](http://php.net/manual/ja/function.array-pop.php)

#### array_walk(), array_walk_recursive()

- ユーザー定義関数を配列中のすべての値に適用する。

- arra_walk_recursive() は多次元配列に対して再帰的に処理する。

- [公式マニュアル](http://php.net/manual/ja/function.array-walk.php)

- [公式マニュアル](http://php.net/manual/ja/function.array-walk-recursive.php)

#### array_search()

- 配列の中から指定された値を持つ要素を検索し、見つかった場合そのキーを返す。

- [公式マニュアル](http://php.net/manual/ja/function.array-search.php)

#### implode(), explode()

- implode() は指定された区切り文字をもとに配列を文字列として結合。

- explode() は指定された区切り文字を元に文字列を配列に変換する。

- [公式マニュアル](http://php.net/manual/ja/function.implode.php)

- [公式マニュアル](http://php.net/manual/ja/function.explode.php)

```php
<?php
// 基本文
// explode ( 区切り文字列 , 対象の文字列 ,最大要素数 )

// 例1. 最大要素数指定なし。
$arrayDayList = explode("/","2019/02/28");

// 例2. 最大指定数指定あり。
$arrayEnglish = explode("/","A/B/C/D/E",2);
```

  

#### range()

- 指定された範囲の整数・文字を持つ配列を作成する。

- [公式マニュアル](http://php.net/manual/ja/function.range.php)

#### reset(), end()

- reset() は配列のポインタを先頭の要素のセットし、その値を返す。

- reset() は配列のポインタを最後の要素のセットし、その値を返す。

- 実際には配列の最初や最後の要素を取得する目的で使うことが多い。

- [公式マニュアル](http://php.net/manual/ja/function.reset.php)

- [公式マニュアル](http://php.net/manual/ja/function.end.php)

#### next(), prev()

- next() は配列のポインタを進め、その値を返す。

- prev() は配列のポインタを戻し、その値を返す。

- [公式マニュアル](http://php.net/manual/ja/function.next.php)

- [公式マニュアル](http://php.net/manual/ja/function.prev.php)

#### current()

- 現在の配列のポインタが指す値を返す。

- [公式マニュアル](http://php.net/manual/ja/function.current.php)

#### extract()

- 連想配列のキー部分を変数名とする変数を作る。

- [公式マニュアル](http://php.net/manual/ja/function.extract.php)

#### list()

- 配列を引数として与えられた複数の変数に分けて代入する。

- [公式マニュアル](http://php.net/manual/ja/function.list.php)

#### is_array()

- 渡された値が配列であるかを返す。

- [公式マニュアル](http://php.net/manual/ja/function.is-array.php)

```php
is_array($配列)
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