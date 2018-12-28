# JavaScriptメモ
## 学生時メモ
### ※テキストベースで記載
```
Java Script学習

・<script></script>・・・・・htmlの中に書き込む時にこの中で行う。
・<script src="ファイル名"></script>・・・外部ファイルで読み込む際に使う。
・console.log("文章"); ・・・・・・コンソールに文章表示
・console.log(数字+数字);　・・・・計算。+,-,*,/(四則演算）。%は割り算の余りを出す時
・var 変数=;　・・・・・変数にデータを代入する時
・console.log(変数名)・・・変数をコンソールに表示。変数は英語。基本的に名づけは自由だが、ローマ字や数字から始まるのはダメ
・変数="上書き事項";・・・・・すでに定義されている変数に上書き。数字の時は""はいらない。
・\n・・・・文字列など改行。
・\・・・it'sなどの点を囲みと認識させない記号。例（'it\'s')
「変数の省略」
・x=x+10; →x+=10; (-,*,/,%も同様)。値を１だけ追加したい時はx++;などと省略。
・console.log("文字列"+"文字列");・・・・文字列の連結
・console.log(変数+変数); ・・・・変数（文字列）の連結

「if文・・・・もし０００ならば☓☓☓☓☓を行う」
・if(条件式){条件成功のときの実行式｝・・・条件分岐。｝の後のセミコロン不要。
（条件式の中がtrueならば実行される。falseならば実行されない。よく使われる演算子として、
<,>,<=,>=,==,!=がある。==は右辺と左辺が等しい時。!=は右辺と左辺が等しくない時。

「条件分岐」・・・else(falseの場合、実行する式)とelse if
・else{falseの時の実行式}・・・ifがfalseの時実行される。
・else if(条件式){成功の時の実行式}・・・複数書けるが最初のやつが実行される。

「論理演算子」・・・&&(かつ)、||(または)、!(A)　（Aではない。それ以外。()もセット。）
・if(条件式&&条件式){実行式}・・・両方合っている。かつ。
・if(条件式||条件式){実行式}・・・どちらか一方。または。
・if(!(条件式)){実行式}・・・・・その条件式ではない。それ以外。
・switch(条件値){
	case 値:
	break;
	}                 ・・・・switich文。条件値とcase値が一致(==)するとき処理。分岐が多い時など。caseの後ろのコロンとbreakを忘れない。      

「繰り返し処理」・・・while文。for文[forの()の中に定義;条件;値の更新を入れる。]
・例、while(条件式){console.log(); 変数++;} ・・・・１ずつ追加。多くの数字を表示させる時に使う。
・例、for(var 変数=値; 変数<数字; 変数++){console.log(変数);}　・・・※変数++の後のセミコロンはつけない。
※無限ループの可能性の時はbreak; , continue; などで抜けだしたり、スキップしたりする。
・for(省略){if(条件式){break; console.log(変数)}　　・・・・条件式がfalseになるとfor文を抜ける。強制中断。
・alert   ・・・・・ダイアログボックスを出す。（OKのみ）
・confirm　・・・・ダイアログボックスを出す。（OKとキャンセル両方）
・prompt　・・・・・ダイアログボックスを出し、入力できる。
「配列」・・・・変数の複数保存的なもの
・var 配列名=["値","値",・・・・];　・・・配列。左の値からインデックス番号は0,1,2と続く。
・console.log(配列名[インデックス番号]); ・・・・配列の要素を取り出す際に使う。
・console.log(配列名.length); ・・・・・配列の要素の個数を数える際に使う。
・for(var 変数=0; 変数<取り出す変数.length; 変数++){console.log(取り出す変数[変数]);}　・・・・・配列の中に格納されている値を簡単に一覧表示する時。
・var 連想配列名 = {キー1 : 値１, ・・・}; ・・・・連想配列の基本。
・console.log(連想配列名.キー)　・・・・・連想配列の値を取り出す際に使う。
・for(var 変数名 in 連想配列名){console.log(連想配列名[変数名]);}

「関数」・・・処理を行い値を返すもの。関数はサイトからコピペ。consoleでの表示の仕方だけ覚える。
・console.log(関数名(入力値));　・・・・関数実行での表示。
一応・・・関数の定義
・function 関数名(仮引数1,仮引数2,・・・・){
処理;
return 処理結果;}  console.log(関数名(入力値));  ・・・・関数の定義
・ローカル変数　・・・・関数の中でしか使えない変数。外で使うとエラーになる。
・即時関数　　　・・・・・関数をすぐ呼び出す時。変数を即時関数の中に書くことによってローカル変数にして、変数を安全にする。
※(関数)();　　　・・・とする。
例はドットインストール復習の中に書いてある。


＜ドットインストール復習＞

<script>
    ///　一行コメント

/*
複数コメント
*/
    var msg = "good";
        x = 7;
        s = 'it\'s a pen'
    console.log(msg);
    console.log(x);
    console.log(s);
    if (x>89) {
        console.log("ok");
    }else {
      console.log("baka");
    }
</script>

    /*
      真偽値
          文字列: 空文字以外だったらtrue
          数値: 0 か NaN 以外だったらtrue
          true / false
          object: null 以外だったらtrue
          undefined, null -> false
  */
  例：
  if (x) {
      // 処理
  }  　　・・・・上級者が省略して書く。
  if (x !== '') {
      // 処理
  }　　　・・・・・初心者用。上級者用に慣れておく。
  /* 

    var i = 0;
    while (i < 10) {
      console.log(i);
      i++;
    }


    for (var i = 0; i < 10 ; i++) {
      if (i === 5){
        continue;

/*
    alert
    confirm
    prompt
*/
// alert("hello");
// var answer = confirm("are you sure?");
// console.log(answer);
/*
if (confirm("本当に削除しますか？")) {
    // 削除処理
}
*/
var name = prompt("お名前は？", "名無しさん");
console.log(name);
      }
      console.log(i);
    }

(function hello(name){
  console.log("hello " + name);
})("tom");     ///即時関数

(function (){
    var x = 8;
        y = 56;
    console.log(x + y);
  })();  

var i = 0;
function show(){
  console.log(i++);
  var tid =setTimeout(function(){
    show();
  },1000);
  if (i > 7) {
    clearTimeout(tid);
  }
}
show();

var k = [
  [3,4,5,6,7,],
  [45,67,89,90]
];
console.log(k);
console.log(k[0][2]);


/*　オブジェクト  連想配列
      名前と値
*/
var user = {
  email:"gamil.com",   ///プロパティ
  score:90
};
 console.log(user.score);
 console.log(user.email);
 user.score = 89;
 console.log(user);


var user = {
  email: "gamil.com",    ///プロパティ
  score:89,
  greet: function(name){　　　///メソッド
    console.log("hello " + name + "from" + this.email);
  }
};
user.greet("tom");
```