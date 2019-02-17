# Javadocメモ
## 概要
- Javadocとは、ソースコードからHTML形式のAPI仕様書を生成するソ仕組みのこと。
- 形式によって記述しておくことで、定義したメソッドやクラスの説明のドキュメントをJavadocで簡単に作成することができる。

## ルール
- 「/**」と「*/」の中にコメントを書く。
- 本文は、基本的にHTML形式で記述。
- 区分として、「説明文」「タグセクション」に分けられる。
    - 「説明文」は、HTML文として認識。複数行に分けるときは、　\<pre>等の改行タグを使用。
    - 「タグセクション」は、@で始まる。
        - 複数回使用できるものと、1回のみ使用可能なタグがある。
        - タグセクション記述の後に、説明文記述はダメ。
    - 種類として、主に下記がある。
        - @author
            - 記述者（作者）を表す。
            - 複数回指定可能。
        - @version
            - 現在のソフトのバージョンを表す。
            - 複数回指定可能。
        - @see
            - 関連項目。記述内容として主に下記。
                - テキスト。
                - リンク。\<a>タグが指定可能。
                - 参照リンク
                    - 「パッケージ名.クラス名#メソッド名」の形式で記述。
            - 複数回指定可能。
        - @deprecated
            - 非推奨のクラスやメソッドの明記に用いる。
            - 複数指定不可能
        - @since
            - 導入されたソフトのバージョンを表す。
            - 複数回指定可能。
        - @param
            - パラメータ（引数）名、その説明に用いる。  
                - 名前と意味の間に改行を入れる。
                - 意味の行を、インデント（字下げ）して記述。
            - 複数回指定可能
        - @return
            - 戻り値に関する（型や範囲）説明に用いる。
            - 複数回指定不可能。
        - @throws(@exception)
            - 例外の可能性がある部分において、「例外型」と「発生起因」の説明に用いる。
        - {@link}
            - 文字列表示箇所の参照リンクの明記に用いる。
            - インラインタグと呼ばれる。
            - 記述は、「{@link パッケージ名.クラス名#メソッド名}」の形式で記述。
        - {@linkplain}
            - 文字列表示箇所の参照リンクの明記に用いる。
            - {@link}タグとの違いは、文字列が   プレーンテキストであるということ。
            - 記述は、「{@linkplain パッケージ名.クラス名#メソッド名}」の形式で記述。            
- ドキュメントの種類として、主に下記がある。
    - クラスドキュメント
        - 最初に役割や機能を簡潔に書く。
        - 詳細に説明する場合、次の段落に書く。
        - 最後に必要に応じて、Javadocタグの「@author」「@version」「@see」
    - インターフェースドキュメント
        - 最初に役割や機能を簡潔に書く。
        - 詳細に説明する場合、次の段落に書く。
        - 最後に必要に応じて、Javadocタグの「@author」「@version」「@see」を書く。
    - フィールドドキュメント
        - フィールドの名称のみを書く。
    - メソッドドキュメント
        - 最初に役割や機能を簡潔に書く。
        - 詳細に説明する場合、次の段落に書く。
        - 最後に必要に応じて、Javadocタグの「@param」「@return」「@throws」「@Exception」を書く。

## 例

```java
/**
 * テストクラス
 *
 * @author t_o_d
 * @version 4.6
 * @see <a href="https://www.google.co.jp/">Google</a>
 */
public class Test{
  /**
   * メッセージ
   */
  private String message;

  /**
   * 年齢
   */
  private int age;

  /**
   * 情報の設定
   
   * @param name
                名前
   * @param number
                個人番号
    @deprecated 別メソッドからの置き換え {@link #infoConfiguration(String name, int number)}
   */
  public void setInfo(String name, int number){

  }

  /**
   * メッセージの取得
   * @return メッセージ
   * 
   * <pre>
   * 設定は{@link com.example.Main#setResult()}
   * 設定は{@linkplain com.example.Main#setResult()}
   * </pre>
   * 
   * @since 4.6
   */
  private int resultCalculation(int firstNumber, int secondNumber) {
    return number1 + number2;
  }

  /**
   * 読み込み
   * @throws java.io.IOException
   *            入出力に関するエラー
   */
  public void readFromFile() throws IOException{

  }
}
```