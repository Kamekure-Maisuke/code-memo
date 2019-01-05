# レシピ検索LINEBOT
## ・流れ
1. LINEに材料名を送信
2. 材料のレシピを検索
3. レシピをLINEに返す。
## ・事前準備
1. GASで空のスクリプトを作成して、公開設定して、URL取得。  
→スクリプトエディタのタブメニューの「公開」から「Webアプリケーションとして導入」を選択。  
→そこのURLをコピー。
2. LINE DEVELOPERに登録して、アプリを登録。  
→[登録方法](https://developers.line.biz/ja/docs/messaging-api/getting-started/)  
※その際に、アクセストークンをメモ。  
※また、下記を設定。  
```
「Webhook送信」：有効化
「Webhook URL」：さきほどGoogle Apps Script上で取得したURL
```
※QRコードから、ボットを友達登録。  。
4. 下記のコードをGASにコピーして、自分用に変更
```JavaScript
var CHANNEL_ACCESS_TOKEN = 
  "LINEのTOKENを書こう";
//webhook_urlから送られた場合
function doPost(e) {
  var reply_token= JSON.parse(e.postData.contents).events[0].replyToken;
  //きたメッセージを取得
  var user_message = JSON.parse(e.postData.contents).events[0].message.text;
  var mes = search(user_message);
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': mes,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
function search(mes){
  //エラー処理
  try{
    var response = UrlFetchApp.fetch("https://cookpad.com/search/" + mes);
  }
  catch(e){//エラーが出たら
    return "検索エラー(コンパス 調べたい材料でお願いします。)";
  }
  
  //cookpadのtrack_ctの中身を取得
  var myRegexp = /<a class=\"recipe-title font13([\s\S]*?)<\/a>/gi;
  var url_and_title = response.getContentText().match(myRegexp);
  
  //検索結果
  if (url_and_title != null){
    url_and_title = url_and_title[0];
  }
  else{//なかったら
    return "一致するレシピが見つかりませんでした。";
  }
  //Logger.log(url_and_title);
  
  //url取得
  myRegexp = /href=\"([\s\S]*?)\"/g;
  var url = url_and_title.match(myRegexp);
  url = url[0].substr(5);
  url = url.replace(/\"/g,"");
  url = 'https://cookpad.com' + url;
  //Logger.log(url);
  
  //タイトル取得
  myRegexp = /\">([\s\S]*?)<\/a>/g;
  var title = url_and_title.match(myRegexp);
  title = title[0];
  //文字列削除
  title = title.substr(2);
  title = title.substr( 0, title.length-4 );
  
  //作成したメッセージをFormular_botに返す
  var meseage = '探してみましたよ。どう？' + '【' + title + '】' + url;
  return meseage;  
}
```
5. webAppとして再度公開。
6. 完了
