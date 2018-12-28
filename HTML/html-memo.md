# HTMLメモ
## 学生時メモ
### テキストベース　GitHubで管理
```
<!DOCTYPE html>・・・・宣言   
<html lang="ja"> ・・・言語指定
</html>・・・・終わり  
<head></head>・・・・情報
<meta charset="UTF-8">・・・・文字コード指定
<meta name="description" content=""> ・・・・・文書の説明。検索エンジンに引っかかる。
<title></title>・・・・・・タイトル
<link rel="shortcut icon" href="">・・・・アイコンの画像
<link rel="stylesheet" href="">・・・・CSS呼び出し
<body></body>・・・・本文
<!-- コメント --> ・・・・コードの中にコメントを入れる時。
<p></p>・・・・段落
<h1></h1>・・・・見出し
id・・・一つしかない要素
class・・・複数の要素
style・・・・CSSを直接指定
<header></header>・・・・ヘッダー
<footer></footer>・・・・フッター
<nav></nav>・・・・・ナビゲーション
<article></article>・・・・独立しているコンテンツ
<aside></aside>・・・・・副次的なコンテンツ
<section></section>・・・・それ以外の情報の塊
<hr>・・・・水平線。話題替えなど。
<pre></pre>・・・・改行や字下げを保持
<blockquote></blockquote>・・・・引用
<div></div>・・・・スタイリング。レイアウト作成。
・サイトの主なレイアウト構造・・・上がheader、中がmain(contentsとsidebar)、下がfooter。
<ol></ol>・・・・・順番リスト
<ul></ul>・・・・・箇条書き
<li></li>・・・・・リスト
<dl></dl>・・・・・記述
<dt></dt>・・・・・用語
<dd></dd>・・・・・用語の説明
<strong></strong>・・・・・重要なところの強調
<br>・・・・・・改行。閉じるタグいらない。
<span></span>・・・・・・テキストの一部に処理するために使う。
<a href=""></a>・・・・リンク
<a href="" target="_blank"></a>・・・・新しいタブでリンクを開くときに使う。
<a href="#"></a>
<h2 id=""></h2>　　　・・・・・ページ内リンク。２つセット。上に#id名、下にID名をつける。
<img src=""　width="横幅" height="高さ" alt="情報">・・・画像。閉じタグいらない。
<tble></table>・・・・テーブルをまとめる
<thead></thead>・・・・・テーブルのヘッダー
<tbody></tbody>・・・・・・テーブルの本体
<tr></tr>・・・・・行
<th></th>・・・・・見出し
<td></td>・・・・・データ
<form action="" method="get or post"></form>・・・・フォーム。
<input type="text" name="" size="サイズ" maxlength="上限文字" value="初期値">　・・・テキストボックス。
<textarea name=""></textarea>   ・・・・・改行を含むテキストボックス。


＜HTML5から使える新機能＞
<input type="email" name="">　・・・・・メールアドレス入力の際のフォーム
<input type="number" name=""> ・・・・・数字入力の際のフォーム
<input type="date" name="">　 ・・・・・日付入力の際のフォーム　
　　　　　　    
<input type="submit" value="名前">	・・・ボタン。
<button type="submit or button"></button>・・・・・・・・・ボタンなど。	 
<input type="password" name="password">・・・・パスワード入力。
<textarea name="comment" cols="列" rows="高さ"></textarea>・・・・複数行入力の際のテキスト。
<input type="checkbox or radio" name="" value="">・・・アンケートのチェック機能。checkboxは複数選択。radioは単一選択。
<select name="">
<option value=""></option>　
<select>                     　・・・・・セレクトボックスを作る。

<!--　コメント -->・・・・・コードの中にコメントを書きたい時や一時的に無効化したい時に使う


レイアウト作成 
<div id="container"></div>
<div id="header"></div>
<div id="main"></div>
<div id="footer"></div>
```