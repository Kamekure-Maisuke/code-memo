'use strict';

// 第一引数にタブ抽出条件指定(今回は空オブジェクト)
// 第二引数に取得後の処理(コールバック)
chrome.tabs.query({}, function(tabs){
    // ループ変数の定義
    var i;
    // 結果一覧ID取得
    var result = document.getElementById('result');
    // タイトル一覧を配列で保持
    var titles = [];
    for(i = 0; i < tabs.length; i++){
        // タブタイトルを配列にpush
        titles.push(tabs[i].title);
        // console.log(tabs[i].title);
    }

    // 結果を改行で区切る
    result.value = titles.join("\n");
    // テキストの選択状態
    result.select();
});