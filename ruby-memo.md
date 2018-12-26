# Ruby基礎研修
## ・概要
1. オブジェクト指向プログラミング言語
2. 開発者は、まつもとゆきひろ氏
3. フレームワークの代表、Ruby on Rails
### ※便利なコマンド
1. irb  
→コードを試したい時。
2. ri  
→処理のドキュメントを知りたいとき。
## 基礎文法
### はじめての表示
```ruby
# 一行コメント

=begin
複数行コメント
複数行コメント
複数行コメント    
=end

print "Hello" # 改行なし
puts "World" # 改行あり
puts 123 # 改行あり(数値の場合は、ダブルクォーテーションは不要)
p "Hello World" # デバッグ用（構造をわかりやすく表示してくれる）
```
### 変数・定数
```ruby
# 変数
# 変数名の命名ルール
# 1. 全て英小文字　2. 区切るときは、_を用いる。
msg = "Hello"
puts msg

# 定数
# プログラム中に、更新しない変数を表す。
VERSION = 1.1
puts VERSION
# ※出力時に、警告は出すが、処理はされる
VERSION = 1.2
puts VERSION

=begin
※変数の種類（先頭の一文字で、変化）
msg → ローカル変数
@msg → インスタンス変数
@@msg → クラス変数
$msg → グローバル変数
MSG → 定数
=end
```
### 数値
```ruby
# 数値
p 123.class # 値（オブジェクト）の型を取得
p 123.methods # 値（オブジェクト）が使えるメソッドを取得

# 計算
puts 23 + 45 #足し算
puts 23 * 5 # 引き算
puts 23 / 5 # 割り算（小数点切り捨て）
puts 23.0 / 5 #割り算（浮動小数）
puts 23 % 5 # 割り算の余り計算
puts Rational(2, 7) # 分数を表示
puts Rational(2, 7) + Rational(4, 7) # 分数同士の計算
puts 2/7r + 4/7r # 分数表示の省略記法
puts 23.55.round #四捨五入
puts 23.52.floor # 小数点切り捨て
puts 23.12.ceil #小数点切り上げ
```
### 文字列
```ruby
# 文字列オブジェクト
# 特殊文字　改行
puts "Hello \nWorld"
# 特殊文字　タブ
puts "Hello\tWorld"
# 式展開
puts "result :  #{30 + 78}"
# 式展開（変数）
name = "oono"
puts "こんにちは #{name}"

# 文字列操作（結合）
puts "Hello" + "World" # +メソッドを用いた通常の結合
puts ["Hello","World","Oono"].join() # joinメソッド(引数なし)を用いた結合
puts ["Hello","World","Oono"].join(",") # joinメソッド（引数あり）を用いた結合

# 文字列操作（分割）
name = "Hello,World,Oono"
puts name.split(/,/) # splitメソッドを用いる
# 文字列操作（文字数取得）
puts "こんにちは　僕の名前は大野です".length # lengthメソッドを用いる 出力：15
# 文字列操作（切り出し）
puts "abcd"[0,2] # 0番目から2文字目までを切り出し　出力：ab
# 文字列操作（検索）
puts "abcdefg".index(/g/) # indexメソッドを用いる　出力：6

# 文字列操作メソッド（変換）
name = "oono"
puts name.upcase # upcaseメソッド（小文字を全て大文字へと変換）
# ※反対にdowncaseメソッド（大文字を全て小文字へと変換）もある。

puts name.reverse # reverseメソッド（文字列の順番を逆にする）
puts name # 変数nameが置き換わるわけではないので、元の小文字が表示

msg = "こんにちは"
puts msg.reverse! # !マークをつけることで、変数も更新されてしまう。（破壊的メソッド）
puts msg

# 真偽値取得メソッド
name = "hello"
puts name.empty? #変数nameが空かどうか確認（empty）　空ではないので、falseを表示
puts name.include?("h") # 変数nameに特定の文字列が入っているか確認（include） 今回はtrueを表示
```
### 配列
```ruby
# 配列オブジェクト
names = ["oono","matuoka","taguchi"]
puts names[0] # 配列取得（番号）
puts names[0..2] # 配列取得（範囲）
puts names[6] # 配列取得（範囲外）　nilと表示されない場合もある。

names[0] = "suzuki" #配列の値更新
names[1..2] = ["tanaka","oomori"] # 配列な値を一括更新
names.push("matukawa") # 配列の末尾に値追加
puts names[0..3]

puts names.size # 配列の要素数取得
puts names.sort # 配列の並び順変更（逆）
```
### ハッシュ
```ruby
# ハッシュ（キーと値）
# scores = {"name" => "oono","age" => "89"} #通常のハッシュ宣言
scores = {tanaka: 78,oono: 67} # シンボルオブジェクト（文字列の皮をかぶった数値）こちらをつかうほうが早いので、必須。
puts scores[:oono] # ハッシュの値取得
puts scores.size # ハッシュの要素数取得
puts scores.keys # ハッシュのキー一覧を取得
puts scores.values # ハッシュの値一覧取得
```
### オブジェクト変換
```ruby
# オブジェクト変換（値）
a = 67
b = "78"
puts a + b.to_i # 変数b(String型)を数値（Integer）へ変換
puts a + b.to_f # 変数b（String型）を浮動小数（Float）へ変換
puts a.to_s + b # 変数a（Integer型）を文字列（String）へ変換

# オブジェクト変換（配列やハッシュ）
scores = {oono: 67,satou: 78,tanaka: 89}
p scores.to_a # ハッシュを配列へ変換　配列の中に変換した配列があるイメージ（二次元配列）
# ※出力：[[:oono, 67], [:satou, 78], [:tanaka, 89]]

p scores.to_a.to_h # 配列変換したものをハッシュへ戻す
# ※出力：{:oono=>67, :satou=>78, :tanaka=>89}
```
### %記法
```ruby
# %記法（標準出力）
puts "He\"llo" # 通常の記法（文字列出力）
puts %(He"llo) # %記法を用いたやり方。%の場合は、\は不要

# %記法（配列）
p ["red","blue"] # 通常の記法
p %W(red blue) # %記法を用いたやり方。ダブルクォーテーションは不要。
```
### 条件分岐（if文）
```ruby
# 条件分岐（if文）
age = gets.to_i # 値をユーザーから受け取る。（受け取り値は、文字列扱いのため、数値へ変換）
if age >= 20
  puts "成人です。"
elsif age <= 19
  puts "未成人です。"
else
  puts "適切な年齢ではありません。"
end # rubyではendで終わらす。
```
### 条件分岐（case文）
```ruby
# 条件分岐（case文）
name = gets.chomp # ユーザーから値を受け取る。getsは改行コードが含まれているため、chompで取り除く。
case name
when "oono"
  puts "bad"
when "siraisi","nisino","saito"
  puts "nogizaka great"
else
  puts "hun!"
end
```
### 条件分岐（while文）
```ruby
# 条件分岐（while文）
i = 0 # ループ変数の初期化
while i <= 10 do # rubyではdoをつける。
  puts "#{i}回目" # わかりやすいように、ループ変数を式展開で表示
  i += 1 # ループ変数を更新させる。Javaのように「++」は、rubyにはない。
end
```
### 条件分岐（timesメソッド）
```ruby
# 繰り返し処理（timesメソッド）
5.times do # 回数が確定しているときは、timesメソッドも使える。
  puts "Hello"
end

6.times do |i| # 上記のようにループ変数を表示したい場合、||で囲む
  puts "#{i}回目"
end

10.times{ puts "oono" } # 処理が少ない場合、「do~end」は波括弧で省略可能。一行で書ける。
```
### 繰り返し処理（for文）
```ruby
# 繰り返し処理（for文）
for i in 1..5 do # シンプルなfor文の記法(1~5を表示)
  puts i 
end

for i in ["red","blue"] do # 配列を取り出す処理。
  puts i
end

for name,age in {tanaka: 89,suzuki: 37,miyamoto: 10} do # ハッシュを取り出す記法
  puts "#{name} : #{age}歳です。"
end
```
### 繰り返し処理（each文）`※重要`
```ruby
# 繰り返し処理（each）
#forの代わりにeachを使うことができる。（上記のような処理を代替できる。）
(1..9).each do |i|
  puts i
end

["tanaka","suzuki","oono"].each do |i|
  puts i
end

{tanaka: 78,suzuki: 90}.each do |name,age|
  puts "#{name} : #{age}"
end
```
### 繰り返し処理（loop break next）
```ruby
# 繰り返し処理（loop break next）
# i = 0
# loop do
#  puts i
#  i += 1
# end

10.times do |i|
  if i == 7
    break # 中断
  end
  puts i
end

10.times do |i|
  if i == 7
    next #スキップ。
  end
  puts i
end
```
### メソッド
```ruby
# メソッド定義
def sayHello # 引数なしバージョン
    puts "Hello"
end
sayHello

def sayHelloName(name) # 引数ありバージョン
    puts "Hello #{name}"
end
sayHelloName("tanaka")

def num(x,y) # 引数あり（複数）バージョン
    return x + y # 戻り値指定
end
puts %(計算結果は#{num(8,7)}です。)
```
### クラス
```ruby
# クラス
class Animal
    def initialize(name) # デフォルト定義。コンストラクタのようなもの。
        @name = name # インスタンス変数
    end
    def sayInfo
        puts "#{@name}です。" # インスタンス変数へ、式展開できる。
    end
end
dog = Animal.new("犬") # 初期値定義（犬）
cat = Animal.new("猫") # 初期値定義（猫）
dog.sayInfo
cat.sayInfo
```
### アクセサ
```ruby
# クラス
class User
    attr_accessor :name,:age # ゲッターとセッター定義
    # ※アクセサの定義は、イコールいらない（絶対覚える。）
    
    # attr_reader :name   ・・・　ゲッターだけ定義したい場合
    def initialize(name,age)
      @name,@age = name,age
    end
    def sayHi
      # self
      # self.name -> @name
      puts "hi! i am #{@name}"
      puts "hi! i am #{@age}"
    end
end
tom = User.new("tom",78
tom.name = "tom Jr."
tom.age = 34
tom.sayHi # レシーバー
```
### クラス変数・クラスメソッド
```ruby
# クラスメソッド・クラス変数
class User
    @@count = 0 # クラス変数定義。@を二個つける。
    VERSION = 1.1 # クラス定数定義
    attr_accessor :name,:age
    def initialize(name,age)
        @@count += 1 # 変数countにインスタンスができるたびに、１を足していく。
        @name,@age = name,age
    end
    def sayDetail
        puts "#{name}です。#{age}歳です。"
    end
    def self.classInfo # クラスメソッド定義。「self.メソッド名」のようにつける。
        puts "class : User。インスタンス数 : #{@@count}。バージョン : #{VERSION}"
    end
end
tom = User.new("tom",39)
bob = User.new("bob",89)
john = User.new("john",2)
oono = User.new("oono",233)
tom.sayDetail # インスタンスメソッド呼び出し。
bob.sayDetail # インスタンスメソッド呼び出し。
john.sayDetail # インスタンスメソッド呼び出し。
oono.sayDetail # インスタンスメソッド呼び出し。
User.classInfo # クラスメソッド呼び出し。
```
### クラスの継承
```ruby
# クラスの継承
class User
    @@count = 0
    VERSION = 1.1
    attr_accessor :name,:age
    def initialize(name,age)
        @@count += 1
        @name,@age = name,age
    end
    def sayDetail
        puts "#{@name}です。#{@age}歳です。"
    end
    def self.classInfo
        puts "class : User。インスタンス数 : #{@@count}。バージョン : #{VERSION}"
    end
end
class AdminUser < User # Userクラスを継承したAdminUserクラスを定義。
    def sayHello
        puts "こんにちは#{@name}さん。"
    end
    def sayDetail # オーバーライド（インスタンスメソッド）
        puts "name : #{@name}\nage : #{age}"
    end
    def self.classInfo # オーバーライド（クラスメソッド）
        puts "class : AdminUser : #{@@count}。バージョン : #{VERSION}"
    end
end
tom = AdminUser.new("tom",39) # AdminUserクラスのインスタンス作成。
bob = User.new("bob",89) # Userクラスのインスタンス作成。
john = AdminUser.new("john",2)
oono = AdminUser.new("oono",233)
tom.sayDetail
tom.sayHello
bob.sayDetail
User.classInfo # Userクラスメソッド呼び出し
AdminUser.classInfo # AdminUserクラスメソッド呼び出し
```
### アクセス権
```ruby
# アクセス権
=begin
public : 制限なし
protected : そのメソッドを持つオブジェクトが、selfであるコンテキスト（メソッド定義式等。）でのみ呼び出し可能  
private : 関数形式でのみ呼び出される。
=end
class User
    def sayHello
        puts "hello"
        # sayPrivate # privateメソッド呼び出し。
    end
    private # privateメソッド定義
        def sayPrivate
            puts "private"
        end
end
class AdminUser < User
    def sayPrivate
        puts "private from AdminUser"
    end
end
# User.new.sayPrivate  これはできない。
User.new.sayHello
AdminUser.new.sayHello
```
### モジュール（名前空間）
```ruby
# モジュール
# 名前空間　　・・・・　メソッド名や定数がかぶらないように、自分だけの空間を作る。
# 定数やメソッドをまとめる。
module Movie # モジュールの定義
    VERSION = 3.33 # 定数の定義
    def self.sayHello # モジュールメソッド定義
        puts "hello"
    end
end
Movie.sayHello # モジュールメソッド呼び出し。
puts Movie::VERSION # 定数取得、表示
```
### モジュール（名前空間：クラス使用例）
```ruby
class User
    attr_accessor :number
    def initialize(number)
        @number = number
    end
    def sayInfo
        puts "番号　：　#{number}"
        Movie.name
        Movie.info
        Movie.size
    end
end
module Movie
    NAME = "タイタニック"
    def self.name
        puts NAME
    end
    def self.info
        puts "#{NAME} : おもしろい"
    end
    def self.size
        puts "ながい"
    end
end
tom = User.new(89)
tom.sayInfo
```
### モジュール（ミックスイン）
```ruby
# モジュール
# ミックスイン　・・・継承関係にないクラスや関連性のないクラスに、いちいち入れなくて済む。
# javaでいうinclude的なもの
module Debug
    def info
        puts "#{self.class} : debug info" # 「self.class」はクラスの名前取得
    end
end
class Hero
    include Debug # モジュールをクラスに取り込み。
end
class Monster
    include Debug # モジュールをクラスに取り込み。
end
Hero.new.info # モジュール内のメソッド呼び出し。
Monster.new.info # モジュール内のメソッド呼び出し。
```
### 例外
```ruby
# 例外
puts "数値を入力"
number = gets.to_i
begin
    puts 100 / number # エラーになりそうな箇所をbeginの後に書く。
rescue => exception # エラー内容をexceptionオブジェクトに代入 ※「ex」でも可能
    puts "stop!!!!!エラーだよ!!!!再度コードを見直そう。"
    puts "エラー内容 : #{exception.message}"
ensure # エラーにかかわらず、実行したい処理
    puts "--END--"
end
```
### 例外（自作）
```ruby
# 例外（自作例外）
class MyError < StandardError; end # 例外クラスを作成。（StandardErrorクラスを継承）
puts "数値を入力してください。"
number = gets.to_i
begin
    if number != 345 # 入力値が345出ないときに、エラー発生。
        raise MyError # raiseメソッドで、MyErro発生
    else
        puts "正解" # 入力値が「345」の時の処理。
    end
rescue MyError # recureに自作クラス指定。エラーの時の処理記述
    puts "エラーだよ"
    puts "入力した値は、345で間違いない？"
ensure
    puts "----end----"
end
```

# 練習問題
## 「第一問」 : 以下のプログラムの実行結果を次の選択肢から選びなさい。
```ruby
test = 2
if test
    puts "true"
else
    puts "false"
end
```
### 1 : 「true」
### 2 : 「false」
### 3 : nilエラーとなる。

## 「第二問」 : 以下のプログラムの実行結果を記載しよう。
```ruby
%W(東京 名古屋 北海道 大阪).each do |i|
    unless i == "名古屋"
        puts "選択した都道府県は、#{i}です。"
    end
end
```
# 練習問題用メモ
## 標準入力（一行、複数行）
```ruby
# 整数の入力
a = gets.to_i
# スペース区切りの整数の入力
b,c=gets.chomp.split(" ").map(&:to_i);
# 複数行からの値入力
s = readlines.map &:to_i
# 文字列の入力
s = gets.chomp
# 出力
print("#{a+b+c} #{s}\n")
```
入力例
```
2
2 3
oono
```
出力例
```
7 oono
```