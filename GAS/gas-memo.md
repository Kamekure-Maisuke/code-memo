# Google Apps Scriptメモ
## 概要
・Google Apps Scriptとは、Googleが提供するサーバーサイドのスクリプト環境。  
・Googleのサービスを処理できる。
## できること
1. メール操作の自動処理  
→定期メールや自動返信等。
2. 外部サイトとの連携  
→slackやlineへのメール内容送信等。  
3. スプレッドシート操作  
→集計表の自動作成等、エクセルのマクロが組める。

## 手順（スプレッドシート）
1. Google Spred Sheetを作成。
2. 任意のプロジェクト名にする。
3. スクリプトエディタを開く。  
→スプレッドシート上部のメニュータブから、「ツール」→「スクリプトエディタ」の順で開く。
4. そこにスクリプトをどんどん書いていく。
5. 書き終わったら、実行。  
→メニュータブの少し下の所の「▶」のボタンで実行できる。  
※この時、二つ右の関数名が正しいか確認しよう。
6. 実行成功できていたら、OK(^^)/

## 基礎文法（スプレッドシート操作）
### ・最初の表示とカスタム関数
※関数名・・・「myFunction」「GETRESULT」
```JavaScript
function myFunction() {
  // ログ出力
  Logger.log("Hello Loger")
}

// カスタム関数定義（変数名は大文字使用が一般的）
// 引数にinput指定で、入力された値に応じて処理する。
function GETRESULT(input){
  if(input >= 80){
    return "合格";
  }else{
    return "不合格";
  }
}
```
### ・カスタム関数（複数のセル使用）
※関数名・・・「GETRESULT」
```JavaScript
function GETRESULT(input) {
  // 複数のセル扱う時、引数をmapに指定。
  if(input.map){
    // GETRESULT関数使用できる。
    return input.map(GETRESULT);
  }else{
    // 条件式は省略して書ける。
    return input >= 80 ? "PASS" : "FAIL";
  }
}
```
### ・シートの初期化・値の追加・その他関数
※関数名・・・「initAddSheet」
```JavaScript
function initAddSheet(){
  // アクティブになっているシートを削除
  var sheet = SpreadsheetApp.getActiveSheet();
  // シートの初期化
  sheet.clear();
  // 値のセット（一行目の一列目の値）
  sheet.getRange(1,1).setValue("oono");
  // 値のセット（一行目の二列目の値に背景も追加）
  sheet.getRange(1,2).setValue("100").setBackground("tomato");
}
```
### ・ループ処理による値追加
※関数名・・・「loopAddSheet」
```JavaScript
function loopAddSheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  // 配列定義（ループ処理で追加する値）
  var names = ["siraisi","kubo","koike","nibu","ikuta","matumura","hasimoto","nisino"];
  // ループ用の変数定義
  var i;
  // シート削除
  sheet.clear();
  // ループ処理（50までの値）
  for(i = 1; i <= 20; i++){
    // i行目の1列目にnames配列の中からランダムで値を追加。
    sheet.getRange(i,1).setValue(names[Math.floor(Math.random() * names.length)]);
    // i行目の2列目に0 ~ 101までの値をランダムで追加
    sheet.getRange(i,2).setValue(Math.floor(Math.random() * 101));
  }
}
```
### ・処理時間の取得・処理時間の高速化
※関数名・・・「timeCalculationBefore」  
※高速前
```JavaScript
function timeCalculation(){
  var sheet = SpreadsheetApp.getActiveSheet();
  // 配列定義（ループ処理で追加する値）
  var names = ["siraisi","kubo","koike","nibu","ikuta","matumura","hasimoto","nisino"];
  // ループ用の変数定義
  var i;
  // 開始時刻（現在時刻）の取得
  var startTime = new Date();
  // シート削除
  sheet.clear();
  // ループ処理（1000までの値）
  for(i = 1; i <= 1000; i++){
    // i行目の1列目にnames配列の中からランダムで値を追加。
    sheet.getRange(i,1).setValue(names[Math.floor(Math.random() * names.length)]);
    // i行目の2列目に0 ~ 101までの値をランダムで追加
    sheet.getRange(i,2).setValue(Math.floor(Math.random() * 101));
  }
  // 処理時間をログに出力（終了時刻から開始時刻を引く。）
  Logger.log(new Date() - startTime);
  //処理時間：2608.0ms
}
```
※関数名・・・「timeCalculationAfter」  
※高速後
```JavaScript
function timeCalculationAfter(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var names = ["oono","siraisi","koike","kubo"]
  var i;
  var startTime = new Date();
  // データを先に定義
  var scores = [];
  for(i = 1;i <= 1000;i++){
    // 多次元配列の定義の中に入れる。
    scores.push([
      names[Math.floor(Math.random() * names.length)],
      Math.floor(Math.random() * 101)
    ]);
  }
  // 引数の中は、（行番号、列番号、行数、列数）
  // ※配列追加の時は、setValuesにする。
  sheet.getRange(1,1,1000,2).setValues(scores);
  // 処理時間のログ表示
  Logger.log(new Date() - startTime);
  // 処理時間：122.0ms
}
```
### ・判定処理
※関数名・・・「initAddSheet」「showResults」
```JavaScript
function initAddSheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var names = ["siraisi","kubo","koike","nibu"];
  var i;
  var startTime = new Date();
  sheet.clear();
  var scores = [];
  for(i = 1;i <= 10;i++){
    scores.push([
      names[Math.floor(Math.random() * names.length)],
      Math.floor(Math.random() * 101)
    ]);
  }
  sheet.getRange(2,1,10,2).setValues(scores);
  Logger.log(new Date() - startTime)
}
// 判定結果
function showResults() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var scores = [];
  var i;
  var results = [];

  // scoreの値で判定するので、2行目２列目の１０行分の１列分の値取得。
  // getLastRowは最後の行までという意味。最後の行まで、取ると一個多くなるから、１引く
  scores = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  //ループ処理。８０以上の時に合否判定。
  for (i = 0; i < scores.length; i++) {
    results.push([scores[i] >= 80 ? 'PASS' : 'FAIL']);
  }
  sheet.getRange(2, 3, results.length, 1).setValues(results);
}
```
### ・ボタン実装
### ※判定処理（上記）の中身を、スプレッドシート内で操作。
＜ボタン実装手順＞  
・「挿入」タブ　→　「図形描画」　→　「図形」からボタンにしたい図形と文字を入れる。  
＜コード＞  
※関数名・・・「initAddSheet」「showResults」
```JavaScript
function initAddSheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var names = ["siraisi","kubo","koike","nibu"];
  var i;
  var startTime = new Date();
  sheet.clear();
  var scores = [];
  for(i = 1;i <= 10;i++){
    scores.push([
      names[Math.floor(Math.random() * names.length)],
      Math.floor(Math.random() * 101)
    ]);
  }
  sheet.getRange(2,1,10,2).setValues(scores);
  Logger.log(new Date() - startTime)
}
// 判定結果
function showResults() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var scores = [];
  var i;
  var results = [];

  // scoreの値で判定するので、2行目２列目の１０行分の１列分の値取得。
  // getLastRowは最後の行までという意味。最後の行まで、取ると一個多くなるから、１引く
  scores = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  //ループ処理。８０以上の時に合否判定。
  for (i = 0; i < scores.length; i++) {
    results.push([scores[i] >= 80 ? 'PASS' : 'FAIL']);
  }
  sheet.getRange(2, 3, results.length, 1).setValues(results);
}
```
### ・確認メッセージの実装
### ※スクリプトが押されたときに、確認メッセージを出して、押し間違いを防ぐ。
※関数名・・・「initSheet」「initAddSheet」「showResults」
```JavaScript
//　シートの初期化
function initSheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  // シート初期化確認メッセージの実装はif文で書く。
  // msgBoxの引数は、第一引数にメインメッセージ・第二引数にサブメッセージ・第三引数にボタンの種類（今回はOKかCancelのボタンパターン）を指定
  if(Browser.msgBox("シートの初期化をします。","実行してもよろしい？",Browser.Buttons.OK_CANCEL) === "cancel"){
    return;
  }
  
  sheet.clear();
}

//シートの初期化アンド値追加
function initAddSheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var names = ["siraisi","kubo","koike","nibu"];
  var i;
  var startTime = new Date();
  
  // シート初期化アンド値追加確認メッセージの実装は、if文で書く。
  // msgBoxの引数は、第一引数にメインメッセージ・第二引数にサブメッセージ・第三引数にボタンの種類（今回はOKかCancelのボタンパターン）を指定。
  if(Browser.msgBox("シートの初期化アンド値追加をします。","実行してもよろしいですか？",Browser.Buttons.OK_CANCEL) === "cancel"){
    // cancelが押された場合は、「return;」と書いて、処理をストップ。
    return;
  }
  
  sheet.clear();
  var scores = [];
  for(i = 1;i <= 10;i++){
    scores.push([
      names[Math.floor(Math.random() * names.length)],
      Math.floor(Math.random() * 101)
    ]);
  }
  sheet.getRange(2,1,10,2).setValues(scores);
  Logger.log(new Date() - startTime)
}
// 判定結果
function showResults() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var scores = [];
  var i;
  var results = [];
  
  // 判定確認メッセージ
  // 書き方は、上記のシート初期化確認メッセージと一緒。
  if(Browser.msgBox("値の判定をします。", "判定してよろしいでしょうか？", Browser.Buttons.OK_CANCEL) === "cancel"){
    return;
  }

  // scoreの値で判定するので、2行目２列目の１０行分の１列分の値取得。
  // getLastRowは最後の行までという意味。最後の行まで、取ると一個多くなるから、１引く
  scores = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  //ループ処理。８０以上の時に合否判定。
  for (i = 0; i < scores.length; i++) {
    results.push([scores[i] >= 80 ? 'PASS' : 'FAIL']);
  }
  sheet.getRange(2, 3, results.length, 1).setValues(results);
}
```
### ・メニューの追加
### ※タブメニューに、関数メニューを追加。
※関数名・・・「initSheet」「initAddSheet」「showResults」「onOpen」
```JavaScript
//　シートの初期化
function initSheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  // シート初期化確認メッセージの実装はif文で書く。
  // msgBoxの引数は、第一引数にメインメッセージ・第二引数にサブメッセージ・第三引数にボタンの種類（今回はOKかCancelのボタンパターン）を指定
  if(Browser.msgBox("シートの初期化をします。","実行してもよろしい？",Browser.Buttons.OK_CANCEL) === "cancel"){
    return;
  }
  
  sheet.clear();
}

//シートの初期化アンド値追加
function initAddSheet(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var names = ["siraisi","kubo","koike","nibu"];
  var i;
  var startTime = new Date();
  
  // シート初期化アンド値追加確認メッセージの実装は、if文で書く。
  // msgBoxの引数は、第一引数にメインメッセージ・第二引数にサブメッセージ・第三引数にボタンの種類（今回はOKかCancelのボタンパターン）を指定。
  if(Browser.msgBox("シートの初期化アンド値追加をします。","実行してもよろしいですか？",Browser.Buttons.OK_CANCEL) === "cancel"){
    // cancelが押された場合は、「return;」と書いて、処理をストップ。
    return;
  }
  
  sheet.clear();
  var scores = [];
  for(i = 1;i <= 10;i++){
    scores.push([
      names[Math.floor(Math.random() * names.length)],
      Math.floor(Math.random() * 101)
    ]);
  }
  sheet.getRange(2,1,10,2).setValues(scores);
  Logger.log(new Date() - startTime)
}
// 判定結果
function showResults() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var scores = [];
  var i;
  var results = [];
  
  // 判定確認メッセージ
  // 書き方は、上記のシート初期化確認メッセージと一緒。
  if(Browser.msgBox("値の判定をします。", "判定してよろしいでしょうか？", Browser.Buttons.OK_CANCEL) === "cancel"){
    return;
  }

  // scoreの値で判定するので、2行目２列目の１０行分の１列分の値取得。
  // getLastRowは最後の行までという意味。最後の行まで、取ると一個多くなるから、１引く
  scores = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  //ループ処理。８０以上の時に合否判定。
  for (i = 0; i < scores.length; i++) {
    results.push([scores[i] >= 80 ? 'PASS' : 'FAIL']);
  }
  sheet.getRange(2, 3, results.length, 1).setValues(results);
}

// メニュー追加
// ※ファイルが開く際の処理は、onOpen関数を使用
function onOpen(){
  // シート全体を指定。
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // 配列指定
  var items = [
    {name: "初期化",functionName: "initSheet"},
    {name: "初期化アンド値追加",functionName: "initAddSheet"},
    null,
    {name: "判定",functionName: "showResults"}
  ];
  
  // メニュー追加の時の関数。
  spreadsheet.addMenu("値管理", items)
}
```