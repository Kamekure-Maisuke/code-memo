# 便利コマンド記録

## CSV分割
- 以下のスクリプトを実行したら、指定数でのCSVファイル分割とディレクトリ作成

```bash
#!/bin/bash
set -ex

# パス
THIS_DIR=$(cd "$(dirname "${BASH_SOURCE:-$0}")" && pwd)
DATA_FILE="${THIS_DIR}/sample.csv"
# 1列目
ID=$(grep "^[0-9]" $DATA_FILE | awk -F, '{print $1}')
# 行数
ROW=$(echo "$ID" | wc -l)
# 分割数
SEP=25
# 作成ディレクトリ数(割り切れない場合は切り上げ)
MAKE_DIR_COUNT=$(awk -v row="$ROW" -v sep="$SEP" 'BEGIN {
    i=row/sep
    printf("%d\n",i+=i<0?0:0.999)
    }
    '
)
# フォルダ作成
seq -f "sample_%01.0f" 1 ${MAKE_DIR_COUNT} |
xargs mkdir -p
# ファイル分割
split -l ${SEP} -a 2 $DATA_FILE sample_
# ファイル移動
count=1
for i in `find . -type f -name "sample_*" | sort`
do
    mv $i "sample_${count}/${i//_*/_${count}}.csv"
    let count++
done
```

## seqコマンド
- 以下、便利な記法。

```bash
#!/bin/bash
seq 4 3 10

# 区切り文字指定
# カンマ区切り : 1,2,3,4,5
seq -s, 1 5

# 連番ファイル作成
seq -f number-%02.0f.txt 5 | xargs touch

# 分割
seq 10 | rs 0 3

# 合計
seq 1 10 | awk '{result+=$1} END{print $1}'
# 別の書き方
# 縦の標準列を「-s」で横に入れ替えて、-dで+で連結して、bcで計算。
seq 1 10 | paste -s -d+ - | bc

# forの代わり
# before
for i in `seq 0 5`
do
  echo "i = $i";
done
# after
seq 0 5 | xargs -I{} echo 'i = {}'
```

## cpコマンド
- 以下、メモ。

```bash
# フォルダの中身のみを別のフォルダに写したい場合。
cp -pR src/* ../second
```

## dateコマンド
- 以下、メモ。

```bash
# 日付関連取得
# dateは基本一回。変数展開で取れるものはそれでとる。
now=$(date '+%Y%m%d')
year=${now%[0-9][0-9][0-9][0-9]}
monthdate=${now#[0-9][0-9][0-9][0-9]}
month=${now%[0-9][0-9]}
day=${now#[0-9][0-9]}
```

## Git関連コマンド
- 以下、メモ。

```bash
# リモートデフォルトブランチ取得
git remote show origin | grep 'HEAD' | awk '{print $NF}'

# 以下で取得可能。
git remote show origin | awk '/HEAD/ {print $NF}'

# 以下でも可能。
git config -l
```

## 乱数
- odコマンドを利用。
- odコマンドの説明は以下。
  - odコマンド : ファイルや標準入力のデータを 8進数・10進数・16進数で表示する。

```bash
#!bin/sh

# /dev/urandomを利用
od -A n -t u4 -N 4 /dev/urandom | sed 's/[^0-9]//g'

# awkでも可能。
awk 'BEGIN{srand();print rand();}'
```

## 正規表現と拡張正規表現比較
- shellやawk、sed等で利用できる正規表現は、以下の2つ。
  - 基本正規表現 : BRE
  - 拡張正規表現 : ERE
- 基本敵に、基本正規表現を利用。
- 相違部分のみの対応表は以下。

|基本正規表現|拡張正規表現|
|:---:|:---:|
|`\(…\)`<br>グルーピング<br>\1や\2で取り出せる。|`()`|
|`\{…\}`<br>回数指定<br>`\{2,\}` : 2回以上|`{}`|
|`\{1,\}`<br>直前の文字が一個以上|`+`|
|`\{0,1\}`<br>0個か1個の時。|?|

- 以下、例。

```bash
$ cat sample
1, 2, 3-6, 7, 9-11

$ cat sample | sed 's!\([0-9]\{1,\}\)-([0-9\{1,\}\)!{\1..\2}!g'

1, 2, {3..6}, 7, {9..11}
```