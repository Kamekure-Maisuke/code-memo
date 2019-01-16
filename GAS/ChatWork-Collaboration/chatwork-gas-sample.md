# ChatWork-GAS連携サンプルコード集
## ＜前提＞
- チャットワークAPI取得済み。  
→未取得の場合は、チャットページ右上のプロフィールアイコンをクリック後、表示される「API設定」から取得する。（※パスワードが必要になる。）
- GASにChatWork用ライブラリ追加。  
※未追加の場合は、スクリプトエディタのライブラリ追加欄に`M6TcEyniCs1xb3sdXFF_FhI-MNonZQ_sT`を入力して追加。
- Webフック取得方法理解。  
→まだ取得方法不明の場合は、「API設定」をクリックして、「WebHook」から作成。  
→下記を設定
    - Webhook名 : 「何のBOTか分かる名前」
    - Webhook URL : 「GASのURL」
    - イベント名 : 「ルームイベント」「メッセージを作成」「ルームID」

## 基本メッセージ送信
チャンネル : 「マイチャット」
```javascript
function testMessage(){
    var cw = ChatWorkClient.factory({token: 'APIトークン入力'});
    var body = 'Hello with GAS';
    cw.sendMessageToMyChat(body);
}
```
チャンネル : 「ルームID別」
```javascript
function sendChat(){
    var roomId = 'rid以下の数字';
    var client = ChatWorkClient.factory({ token: "コピーしてきたトークン" });

    client.sendMessage({
        room_id: roomId,
        body: "テスト"
    });
}
```
## Qiita新着トレンド通知
チャンネル : 「にゅーきーたん」   
※マイチャット以外のチャンネルを使用する場合、ルームID（URLの中にある。）が必要。  
※また、スクレイピング用のライブラリ（`M1lugvAXKKtUxn_vdAG9JZleS6DrsjUUV`）が必要。
```javascript
// QiitaのURL
var QIITA_BASE_URL = 'https://qiita.com'
var QIITA_TRENDS_URL = 'https://qiita.com/trend'
var CHATWORK_API = 'ChatWorkのAPIを書く。'
var ROOM_ID = 'チャンネルルームIDを書く。'

// トレンド通知（新着記事のみ）
function qiitaNew() {
    var today = new Date();
    var todayShaping = Utilities.formatDate(today,"JST","yyyy/MM/dd") + "のQiita新着トレンド"
    var message = []
    var html = UrlFetchApp.fetch(QIITA_TRENDS_URL).getContentText()
    var items = Parser.data(html).from('{&quot;followingLikers').to('}}}').iterate()
    for (var i = 0; i < items.length; i++) {
        var isNewArrival = items[i].match(/isNewArrival&quot;:(.+?),/)[1]
        // 新着記事のみ対象
        if (isNewArrival == 'false') {
            continue
        }
        var name = "\n★" + items[i].match(/title&quot;:&quot;(.+?)&quot;,/)[1] + "\n"
        var uuid = items[i].match(/uuid&quot;:&quot;(.+?)&quot;,/)[1]
        var urlName = items[i].match(/urlName&quot;:&quot;(.+?)&quot;/)[1]
        var link = QIITA_BASE_URL + '/' + urlName + '/items/' + uuid + "\n"
        /* メッセージ */
        message.push(name,link)
    }
    // メッセージ整形（カンマ削除のため。）
    var chatWorkMessage = message.join("");
    sendChatWork(todayShaping,chatWorkMessage);
}
function sendChatWork(todayShaping,chatWorkMessage) {
    var client = ChatWorkClient.factory({token: CHATWORK_API});
    client.sendMessage({room_id: ROOM_ID, body: "[info][title]" + todayShaping + "[/title]" +chatWorkMessage + "[/info]"});
}
```

## Googleカレンダー予定通知
チャンネル名 : 「マイチャンネル」  
※ライブラリ追加は、上記と同様。（スクレイピング用は不要）
```javascript
/* 指定のカレンダーの本日の予定をチャットワークに送る */
function sendSchedule() {

    var myCals=CalendarApp.getCalendarById('XXXXXXXX@gmail.com'); //特定のIDのカレンダーを取得
    var myEvents=myCals.getEventsForDay(new Date());　//カレンダーの本日のイベントを取得

  /* チャットワークに送る文字列のヘッダー */
    var strBody = "[info][title]本日の予定：" + Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd') + " (roger)[/title]"

  /* イベントの数だけ繰り返し */
    for(var i=0;i<myEvents.length;i++){
        var strTitle=myEvents[i].getTitle(); //イベントのタイトル
        var strStart=_HHmm(myEvents[i].getStartTime()); //イベントの開始時刻
        var strEnd=_HHmm(myEvents[i].getEndTime()); //イベントの終了時刻
        strBody=strBody + strStart + ' - ' + strEnd + strTitle + '\n'; //チャットワークに送る文字列にイベント内容を追加
    }

    strBody = strBody + '[/info]';

  /* チャットワークにメッセージを送る */
    var cwClient = ChatWorkClient.factory({token: ' XXXXXXXXXXXXXXXX'});　//チャットワークAPI
    cwClient.sendMessage({
        room_id:XXXXXXXX, //ルームID
        body: strBody
    });
}

/* 時刻の表記をHH:mmに変更 */
function _HHmm(str){
    return Utilities.formatDate(str, 'JST', 'HH:mm');
}
```