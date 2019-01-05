# オウム返しLINEBOT
## ・流れ
1. LINEに文字を投げる
2. 文字を整形
3. その文字をLINEに返す。
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
var CHANNEL_ACCESS_TOKEN = 'LINEのtokenを書こう。';

function doPost(e) {
  var reply_token= JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  var user_message = JSON.parse(e.postData.contents).events[0].message.text;
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
        'text': 'こんにちは\n' + user_message + 'さん。\n今日も一日頑張りましょう。',
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
```
5. webAppとして再度公開。
6. 完了
