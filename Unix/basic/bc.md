# bcメモ

## 概要
- 任意制度の計算言語

## 基本
- 以下は標準入力で渡す。

```bash
# 計算
echo "1 + 3" | bc
echo "3 * 9" | bc
echo "5 / 3" | bc

# 少数点以下の桁数指定
# answer : 1.66666
echo "scale=5;5/3"i | bc

# 10進での有効桁数
# answer : 3
echo "length(900)" | bc

# 基数指定
# 「obaseは出力基数」「ibaseは入力基数」。
# ※ibaseは基本obaseの後に書く。
# answer : 90
echo "obase=10;ibase=16;5A" | bc
```

## 応用
- bcでは言語としても扱えるため、ifやforも扱うことができる。

```bash
# for文
echo "for(i=1;i<=10;i++){i} | bc

# if文
echo "for(i=1;i<=10;i++){if(i%2==0){i}}" | bc

# 関数
echo "define sum(x,y){return(x+y)};sum(10,20)" | bc

# 関数(ローカル変数)
# 関数内のローカル変数は、autoで表す。
echo "define average(x,y,z){auto c;c=3;return((x+y+z)/c);average(10,30,80)}" | bc
```

# 数学ライブラリ
- `bc -l`のようにlオプションをつけると、sinやcos等の数学ライブラリが利用できる。
  - **※`bc -l`を指定するとscaleがデフォルトで20になる。**

```bash
# sin計算
echo "s(90)" | bc -l

# cos計算
echo "c(90)" | bc -l

# sqrt(平方根)
echo "sqrt(25)" | bc -l

# おまけ : 有理数判定
seq 10 | sed -r 's/[0-9]+/sqrt(&)/' | bc -l | grep -n -E '[0-9]\.0+'
```

- 計算ライブラリ一覧は以下。

|関数|意味|
|:---:|:---:|
|s(x)|sin|
|c(x)|cos|
|a()x|atan|
|l(x)|log。自然対数|
|e(x)|exp。指数関数|
|sqrt(x)|平方根|
