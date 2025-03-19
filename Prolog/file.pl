% ファイルを読み込んで内容を出力するプログラム
read_and_print_file(FileName) :-
    open(FileName, read, Stream),
    read_file_contents(Stream),
    close(Stream).

% ファイルの内容を再帰的に読み込む述語
read_file_contents(Stream) :-
    at_end_of_stream(Stream), !.  % ストリームの終わりに達したら終了
read_file_contents(Stream) :-
    get_char(Stream, Char),       % 1文字読み込む
    write(Char),                  % 読み込んだ文字を出力
    read_file_contents(Stream).   % 再帰的に続きを読む
