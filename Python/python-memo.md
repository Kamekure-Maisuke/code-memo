# Pythonメモ
## 学生時メモ
### テキストベース（あとでなおす）　GitHubで管理
```
Python学習

・コメント・・・・#  (一行)　””” (複数行)
・print(“”)　　　・・・・・出力。文字列のみクォーテーションをつける。数字の時はクォーテーションはいらない。計算も出来る。
・変数名 = 値　　　　　　・・・・・・・変数の定義。
・変数名 = 新しい値　　　　　・・・・変数の上書き。数値の追加は、+=など省略系が主。
・str(数値型変数)　　　　　・・・・数値型変数を文字列型に変換
例、print(“私は” + str(数値型変数) + “です。”)　　　　　のように使う。変換しないとエラー。
・int(“文字列型変数”)      　　・・・・・文字列型変数を数値型に変換。例は上の反対。
・%sと%f　　　		・・・・・・・文字列に値を埋め込む。旧型
%s: 文字列として置換
%d: 整数値として置換
%f: 浮動小数点数として置換
%x: 16進整数として置換
・.format 　　　　　　　　・・・・・・・新型。
# print("name: {0}, score: {1}".format(name, score))
print("name: {0:>10s}, score: {1:<10.2f}".format(name, score))


・if 条件式:
    処理式　　　　　　　　・・・・・・pythonのif文。処理式を書く際はインデント（字下げ）を必ず行う。
※pythonではインデントでif文の中を判別するので、きちんと字下げを行い、２行あるときは行を揃える。
・==        　・・・・比較演算子で「等しい」という意味。反対は「!=」で表す。

・if 条件式:
    処理式
 else:
    処理式　　　　　・・・・・・if else構文。条件式がFalseだったときの処理。
※pythonのelse if構文は「elif 条件式:」で書く。seはいらない笑

・「and」、「or」、「not」　　　・・・・それぞれ「かつ」、「または」、「否定」の意味。notは条件の前に書く。
・input(“コンソールに表示したい文字列: ”)      　　・・・・コンソールに値を入力できる。それを受け取る。
例、変数 = input(“値を入力しよう: ”)　　　　のようにすれば、コンソールに値を入力し、その値を変数に代入。

・変数 = [値,値,値,値]　　　　　・・・・リスト。ようは配列。文字列のみクォーテーション。取り出す際は変数[インデックス番号]で取り出す。
・リスト[インデックス番号] = 値　　　　　・・・・指定したインデックス番号の値を更新
・リスト.append(値)　　　　・・・・・リストの末尾に値を更新

・for 変数名 in リスト:
     print(変数名)　　　　　　　　　・・・・・リストの要素の数だけ処理。つまりリストの要素をすべて取り出す。
・変数名 = {“キー”:”値”,”キー”:”値”}　　　　　　　　・・・・・辞書と呼び、すなわち連想配列。キーと値の間は:で、要素同士の間は,で区切る。取り出す際は、辞書名[キー]  でする。
・辞書名[キー名] = 値 　　　　　　・・・・・・要素の更新
・辞書名[新しいキー名] = 値    　　　・・・・要素の追加。
・for key,value in 辞書.items():
     print(“{0}:{1}”.format(key,value))　　　　　　　　・・・辞書の値をすべて取り出す。
・while 条件式:
     繰り返し処理　　　　　　・・・・・while文。条件式がtrueの間繰り返し処理する。無限ループになると重くなるので絶対にfalseになる部分を作る。あとインデントも絶対忘れない。
例、x = 10
      while x > 0:
          print(x)
          x -= 1                        　　　のようにfalseをつくる。インデントも忘れない。

	
          	
・break　　　　・・・・・繰り返し処理の途中でも強制終了。
例、numbers = [1,2,3,4,5]
      for number in numbers:
          print(number)
          if number == 4:
             break　　　　　　　　　　　　　　　　　・・・・・・のように強制終了。インデントも忘れない。	
・continue　　　　　　・・・・breakの反対でその処理だけスキップ。例はbreakとほぼ一緒。

・関数の定義
・def 関数名():
　    実行する処理　　　　　　　　　　　・・・・・・関数の定義。インデントも忘れない
・関数名()　　　　　　　　　　　　　　・・・・・・関数の呼び出し。
・def 関数名(仮引数):
      実行処理               　　　　　　　・・・・・・関数に引数を与える。引数は関数内でのみ使用可能。
・def 関数名(第一引数,第二引数)　　　　　・・・・・引数を複数指定。
・def 関数名(仮引数=”値”)　　　　　　　　　　　　・・・・・引数に初期値を与える。引数が省略されたと　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　きは代わりの値として用いる。
・def 関数名():
     return 戻り値　　　　　　　　　・・・・・・戻り値を呼び出し元に返す。
例、def add(a,b)
          return a + b　　　　　　　　
　　 変数名 = add(a,b)　　　　　　　　　・・・・・・・・・aとbを足して呼び出し元に戻す。そして変数に代入する時はa+bの結果が代入。　　　　　　
・returnには終了させる性質も持っていてreturn以降の処理はされない。関数内でのこと。
・returnは複数用いる事ができる。if文の中でも。
・関数の処理の中でpassを使えばその関数は無効。

・オブジェクト指向（しっかりと理解。忘れたら読む。）
https://eng-entrance.com/what-oop#i

・クラス
・class クラス名:
        中身（何も入れない時はpass）            ・・・・・クラスを作る時。
・def __init__(引数): 　　　　　　　・・・・・メソッド。処理。上の中身に書く。引数のうち最初のものはselfという名前にすることになっています。
・クラス変数
・アクセス制限　　　　・・・・アンダーバー（＿）が２つある属性にはクラス内以外からはアクセスしない


・モジュール
・モジュールとは、Pythonのコードが書かれたファイルのことです。コードが長くなってきたら読みにくくなったり、バグを起こしやすいのでコードの一部を別ファイルに移し、モジュールとして読み込む。
・import モジュール名　　　　　・・・・モジュールを使いたいファイルに読み込む。モジュール名では.pyを除いて書く。　　例：script.pyを読み込む場合、import script　　　とする。
・モジュール名.関数名()　　　　・・・・・・・・モジュール内の関数を実行。
・標準ライブラリとはあらかじめ用意されているモジュールで便利な関数がたくさんある。調べる。これもimportで読み込む。

・パッケージ
・モジュールが多くなると、フォルダで管理する。そのフォルダをパッケージと呼ぶ。
・import フォルダ名.モジュール名・・・・・パッケージの中のモジュールえお呼び出す。
・import フォルダ名.モジュール名 as 新名前　・・・・・・フォルダ名.モジュール名が長くなる時にまとまった新しい名前をつける。




・復習（ドットインストール）
print("Hello World")

# hennsuu
msg = "good"
print(msg)

#kaigyou kuuhaku   \nは改行 \tは空白　
s = "he\nllo wor\tld"
n = """<html>
<body></body>"""
print(s)
print(n)

# suuji
i = 10
r = 20.9
ronri = True #False
print(i+r)
print(i/4)
print(i//3)
i += 12
print(i)
print(True and False)
print("watasi"+ str(i) + "oono")
print(i + int(m))

# mojiretu atai
name = "oono"
score = 52.8
print("name: %s, score: %f" %(name,score))
print("name: {0},score: {1}" .format(name,score))


# if
score = int(input("score?"))
"""if score > 80:
    print("good")
elif score > 60:
    print("soso")
else:
    print("bad")"""
print("good" if score>80 else "bad")   

# while
i = 0
while i < 6:
    print(i)
    i += 1
else:
    print("end")

# for
for i in range(7):
    if i == 4:
        continue
    print(i)

# kansu
def say_hi():
   print("hi")
say_hi()
def say_ok(name,age):
    print("ok {0} ({1})".format(name,age))
say_ok("tom",89) 
say_ok("john",age = 30)

# kaeriti
def say_hi():
    return input("score?")
msg = say_hi()    
print(msg)
def ji():
    pass
ji()

# local hensuu
msg = "hello"   #global hensuu
def koko():
    msg = "hi"  #local hensuu
    print(msg)
koko()
print(msg)
def kiki():
    global msg   
    msg = "ok"    #global hensuu
    print(msg)
print(msg)    

# class
class User:
    pass
tom = User()   #インスタンス
bob = User()
tom.name = "tom"
tom.score = 3
bob.name = "bob"
bob.score = 4
print(tom.name)
print(bob.score)

# constractor
class User:
    def __init__(self,name):    #インスタンス変数
        self.name = name
tom = User("tom")
print(tom.name)

# class hennsuu　　　　　　＃インスタンス計測プログラム
class User:
    count = 0     #class hennsuu
    def __init__(self,name):
        User.count += 1
        self.name = name
print(User.count)
tom = User("tom")
print(User.count)

# クラス
# 関数（メソッド）
class User:
    count = 0
    def __init__(self, name):
        User.count += 1
        self.name = name
    # インスタンスメソッド
    def say_hi(self):
        print("hi {0}".format(self.name))
    # クラスメソッド
    @classmethod
    def show_info(cls):           　　＃引数はcls
        print("{0} instances".format(cls.count))
tom = User("tom")
bob = User("bob")
# tom.say_hi()
# bob.say_hi()
User.show_info()

# クラスの継承
# User -> AdminUser
class User:
    def __init__(self, name):
        self.name = name
    def say_hi(self):
        print("hi {0}".format(self.name))
class AdminUser(User):
    def __init__(self, name, age):
        super().__init__(name)
        self.age = age
    def say_hello(self):
        print("hello {0} ({1})".format(self.name, self.age))
    # override        （親クラスの上書き）
    def say_hi(self):
        print("[admin] hi {0}".format(self.name))
bob = AdminUser("bob", 23)
print(bob.name)
bob.say_hi()
bob.say_hello()　　　　　　　　
＊多重継承の場合は、カッコ内をカンマで区切る。

# モジュール
# import user　　　＃user.pyというファイル
# from user import AdminUser　クラスの一部分を使いたい時はfromを使う。
from user import AdminUser, User
# bob = user.AdminUser("bob", 23)
bob = AdminUser("bob", 23)
tom = User("tom")
print(bob.name)
bob.say_hi()
bob.say_hello()

# package
# import mypackage.user
# import mypackage.user as mymodule
from mypackage.user import AdminUser
# bob = mypackage.user.AdminUser("bob", 23)
# bob = mymodule.AdminUser("bob", 23)
bob = AdminUser("bob", 23)
print(bob.name)
bob.say_hi()
bob.say_hello()
・・・・・上と下は同じ例
#package
#import test
#import mypackage.test as oko
from mypackage.test import User
tom = User("tom")
tom.say_hi()

#ristgata
scores = [40,50]
print(scores[0])
scores[1] = 60
print(len(scores))
scores.append(100)
print(scores)

#suraisu
scores = [20,30,40,50,60,70]
print(scores[1:4])
print(scores[:2])
print(scores[3:])
print(scores[-3:])

#shuugougata
a = {3,4,5,6,7,8}
print(a)
print(9 in a)
a.add(2)
a.remove(8)
print(a)
print(len(a))

#jisho
sales = {"oono":300,"kobayasi":400}
print(sales["oono"])
sales["oono"] = 250
sales["suzuki"] = 500
print(sales)
for key,value in sales.items():
    print("{0}:{1}".format(key,value))


#itere-ta-
score = [30,40,50,60]
it = iter(score)
print(next(it))
print(next(it))
print(next(it))
※イテレーターとは・・・・配列のようなものを順番にたどるためのもの

# map(関数, イテレータ)
# def triple(n):
#     return n * 3
# print(list(map(triple, [1, 2, 3])))
# lambda 引数: 処理
print(list(map(lambda n: n * 3, [1, 2, 3])))
※http://www.sejuku.net/blog/23677

# filter(関数, イテレータ)
# def is_even(n):
#     return n % 2 == 0
# print(list(filter(is_even, range(10))))
print(list(filter(lambda n: n % 2 == 0, range(10))))

#naihouhyouki
print([i*4 for i in range(10) if i%3==0 ])
```