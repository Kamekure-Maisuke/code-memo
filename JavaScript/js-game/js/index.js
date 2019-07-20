'use strict';

{
    let timer_1, timer_2, timer_3,
        flag_1, flag_2, flag_3,
        bar_1_y, bar_2_y, bar_3_y;
    
    timer_1 = timer_2 = timer_3 = "";
    flag_1 = flag_2 = flag_3 = true;
    bar_1_y = bar_2_y = bar_3_y = 185;

    $(document).on('click', '#stop_btn_1', function () {
        on_stop_1();
    });

    $(document).on('click', '#stop_btn_2', function () {
        on_stop_2();
    });

    $(document).on('click', '#stop_btn_3', function () {
        on_stop_3();
    });

    $(document).on('click', '#start_button', function () {
        on_start();
    });

    $(document).on('click', '#stop_button', function () {
        on_stop();
    });

    /* 「Start」ボタンのクリック  */
    /* バー移動関数「move_bar_1/2/3()」関数を、100ミリ秒間隔で呼び出す */
    function on_start() {
        if (flag_1 == true && flag_2 == true && flag_3 == true) {
            timer_1 = setInterval(move_bar_1, 100);
            timer_2 = setInterval(move_bar_2, 100);
            timer_3 = setInterval(move_bar_3, 100);

            flag_1 = flag_2 = flag_3 = false;
        }
    }
    /* 「Stop」ボタンのクリック  */
    /* 各「バー」移動関数「move_bar_1/2/3()」関数の「Interval_Timer」の停止 */
    function on_stop() {
        clearInterval(timer_1);
        clearInterval(timer_2);
        clearInterval(timer_3);

        flag_1 = flag_2 = flag_3 = true;
    }

    /* 「バー1」移動関数 */
    function move_bar_1() {
        if (bar_1_y > 75) {
            bar_1_y -= 10; //移動量
            $('#image_1').css('top', bar_1_y + 'px');
        } else {
            bar_1_y = 310; //元の位置に戻す
            $('#image_1').css('top', bar_1_y + 'px');
        }
    }

    /* 「バー2」移動関数 */
    function move_bar_2() {
        if (bar_2_y > 75) {
            bar_2_y -= 10;
            $('#image_2').css('top', bar_2_y + 'px');
        } else {
            bar_2_y = 310;
            $('#image_2').css('top', bar_2_y + 'px');
        }
    }

    /* 「バー3」移動関数 */
    function move_bar_3() {
        if (bar_3_y > 75) {
            bar_3_y -= 10;
            $('#image_3').css('top', bar_3_y + 'px');
        } else {
            bar_3_y = 310;
            $('#image_3').css('top', bar_3_y + 'px');
        }
    }

    /* バーの移動停止関数 */
    function on_stop_1() {
        clearInterval(timer_1);
        flag_1 = true;
    }

    function on_stop_2() {
        clearInterval(timer_2);
        flag_2 = true;
    }

    function on_stop_3() {
        clearInterval(timer_3);
        flag_3 = true;
    }
}