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
# 別の書き方
seq -s "+" 10 | bc

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

# trコマンドエラー回避のため。
export LC_ALL=C
# /dev/urandomを利用(推奨)
cat /dev/urandom | tr -cd 0-9a-zA-Z | head -c 20

# tr単体
tr -dc 'a-z0-9A-Z' </dev/urandom | head -c 10

# /dev/urandomを利用
od -A n -t u4 -N 4 /dev/urandom | sed 's/[^0-9]//g'

# opensslコマンドを利用
openssl rand -hex 10

# md5コマンド
date | md5

# awkでも可能。
awk 'BEGIN{srand();print rand();}'
```

## ランダムjson生成

```bash
for i in $(jot 10); do echo "{\"id\": ${i}, \"name\":\"$(openssl rand -hex 6)\", \"age\":$(jot -r 1)}"; done
```

```bash
tr -dc '[:alnum:]' </dev/urandom | fold -w 6 | head -n5 | awk '{printf("{\"id\":%d,\"name\":\"%s\"}\n",NR,$1)}'
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

## 文字列分解
- 文字を一文字ずつ分解するコマンドは以下。
  - foldコマンドを利用。

```bash
# 入力文字
echo Hello |
# 幅を1文字に設定
fold -1 |
# 余計な空行を削除
grep -v '^$' |
# awkで処理。
awk '{
  for(i=0;i<NR;i++) printf $1
}'
```

## 連続空白区切りデータ出力
- `docker search`コマンドの出力のように、データが連続空白区切りのデータ形式は多い。
  - データの中身が文章で、空白がある場合もある。
- そのため、2個以上の空白及びタブ2個以上を区切り文字として設定するawkスクリプトは以下。

```bash
$ docker search ubuntu | head -n 4

NAME                                                      DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
ubuntu                                                    Ubuntu is a Debian-based Linux operating sys…   11708               [OK]                
dorowu/ubuntu-desktop-lxde-vnc                            Docker image to provide HTML5 VNC interface …   487                                     [OK]
websphere-liberty                                         WebSphere Liberty multi-architecture images …   266                 [OK]            


# NAMEとSTAR一覧を出力
# スペース3つ以上またはタブ2つ以上を区切り文字に設定。
$ docker search ubuntu | head -n 4 | awk -F ' {3,}|\t{2,}' '{print $1,$3}'

NAME STARS
ubuntu 11708
dorowu/ubuntu-desktop-lxde-vnc 487
websphere-liberty 266
```

## XMLデータ区切り
- 以下。
- 区切り文字を、`[<>]`で行えば扱いやすくなる。

```bash
awk -F '[<>]' '$2=="タグ名"{pref=$3}/タグ名検索/{print pref,$3}'
```

## XMLlint
- xmllintでは以下のオプションをつけて、grepやawkと組み合わせて利用する。
    - `--format` : xmlを綺麗に整形する。
    - `--nocdata` : cdataタグがついていれば除外する。
- 下記、あるトレンドXML取得の例。
    - 一度curlでローカルファイル(`data`)に保存する。

```bash
#!bin/sh

xmllint --format --nocdata data |
grep -F -e '<title>' -e '<link>' |
sed '1,4d' |
awk -F '[<>]' '{if(NR%2)ORS=" ";else ORS="\n"; print $3}'
```

## 文字列のURLエンコード
- urlエンコードする際のメモ。
    - `curl --data-urlencode`でも可能。
    - 以下は変数として格納。
    

```bash
# クエリ格納
# info : %E5%A4%A7%E6%A0%B9
info=$(printf "大根" | xxd -u -p | fold -2 | sed 's/^/%/' | tr -d '\n')

# 確認
# GET_URL : https://example.com/%E5%A4%A7%E6%A0%B9
curl -s "https://example.com/${info}"
```

- odコマンドでも可能。こちらの方がプロセスは少ない。
    - **※awkのprintf内でのパーセントのエスケープは、`%%`とする。**

```bash
# info : %E5%A4%A7%E6%A0%B9
info=$(printf '大根' | od -t x1 | awk 'NR==1{for(i=2;i<=NF;i++) printf "%%" toupper($i)}')
```

- jqコマンドの利用
  - こちらの方が正確かも。半角英数字も考慮してくれる。

```bash
printf "大根" | jq -sRr @uri
```

## GMT日時の対応表
- GMT日時で`Jan`等をshellで扱う際の対応表コマンド。

```shell
printf 'Jan\nFeb\nMar\nApr\nMay\nJun\nJul\nAug\nSep\nOct\nNov\nDec\n' | nl -w 2 -n rz
```

## 同じ文字列を指定回数表示する速度比較
- 以下の順に速い。


```bash
# 方法1
printf 'hello\n%.0s' {1..1000}

# 方法2(macやbsd系)
seq -f 'hello' 1000

# 方法3
yes | head -n 1000
```

## サンプルデータ作成(ssv)
- awk単独とyesを利用の2種類。

```bash
# awk単独
awk 'BEGIN{print "id score"; srand(); for(i=1;i<=10;i++) print i,rand()*1000}'

# yes利用
yes | awk 'BEGIN{srand();print "id score"}NR>10{exit}{print NR,rand()}'
```

- 作成例

```
id score
1 0.22388
2 0.45509
3 0.371985
4 0.849237
5 0.611552
6 0.486321
7 0.100832
8 0.337108
9 0.758404
10 0.170222
```

## サンプルデータ作成(json)
- ランダムデータのjsonを作成

```bash
awk 'BEGIN{srand(); for(i=1;i<=10;i++) print "{\"id\":"i", \"score\":"int(rand()*1000)"}"}'
```

```
{"id":1, "score":987}
{"id":2, "score":808}
{"id":3, "score":865}
{"id":4, "score":306}
{"id":5, "score":718}
{"id":6, "score":817}
{"id":7, "score":286}
{"id":8, "score":211}
{"id":9, "score":633}
{"id":10, "score":174}
```

- 下記でも可能。

```bash
tr -dc '[:alnum:]' </dev/urandom | fold -w 6 | head -n5 | awk '{printf("{\"id\":%d,\"name\":\"%s\"}\n",NR,$1)}'
```

- 下記でも可能。awk単体。

```bash
awk 'BEGIN{
    srand()
    rand_command="tr -dc '[:alnum:]' </dev/urandom | head -c 5"
    for(i=1;i<=10;i++){
        rand_command | getline name
        close(rand_command)
        printf("{\"id\": %d,\"name\": %s,\"score\": %d}\n",i,name,rand()*100)
    }
}'
```

## Windowサイズ確認
- ターミナルのウィンドウサイズを計測

```bash
windowsize=`stty size`
echo $windowsize    # 縦横両方
echo ${windowsize% *} # 横
echo ${windowsize#* } # 縦
```

- bashでは以下。

```bash
# 文末の「(:;:)」を記述して、即反映されない。
shopt -s checkwinsize; (:;:)
echo $LINES  # 横
echo $COLUMNS  # 縦
```
