# Javaコーディングルール・慣習メモ
## 命名
### 大文字と小文字での名前判別はしない。
#### 「理由」
- 読み誤りの回避
- タイプミスの区別の容易さ

「OK」

```java
String firstMessage = "Hello";
String secondMessage = "I'm Bob";
String thirdMessage = "Bye";
```
「NG」

```java
String message = "Hello";
String MESSAGE = "I'm Bob";
String Message = "Bye";
```

## パッケージ
### 命名はすべて小文字。
#### 「理由」
- 可読性の向上
- 仕様の確認の容易さ。
#### 「補足」
- 名前は内容がわかりやすい名前。
- 名前は単数形にする。

「OK」

```java
package lang.java.hello;
package lang.java.name;
```
「NG」

```java
package lang.java.Hello;
package lang.java.names;
```

### 名前を省略語にしない
#### 「理由」
- クラスやインターフェース等の部品の役割の明確化。
#### 「補足」
- 名前は内容がわかりやすい名前。
- 名前は単数形にする。

「OK」

```java
package lang.java.infomation;
```
「NG」

```java
package lang.java.info;
```

### インポートの「*」での省略化。
#### 「理由」
- 可読性向上。
#### 「補足」
- 記述する順番は下記。
- Java標準クラスAPI
- グローバル（著名なものや市販のライブラリ）なもの
- ローカル（自社内やプロジェクト内のライブラリ）なもの
- 多数の場合は、アルファベット順

## クラス
### クラス名は役割ある名前にする。
#### 「理由」
- クラスの役割の明確化。
- 保守に必要なソースファイルの素早い検索

「OK」

```java
class SubmitAction {
    
}
```
「NG」

```java
class Test1 {
    
}
```

### 名前の最初の1文字は大文字、複数単語の場合は各単語の先頭を大文字。
#### 「理由」
- クラスやインターフェース等の部品の役割の明確化。
#### 「補足」
- 各単語の先頭を大文字にすることを、「capitaliza（キャピタライズ）」という。
- キャピタライズした文字列形式を、「Pascal形式」という。  
→別名「UpperCamel形式」とも言う。

「OK」

```java
class TwitterApiClient {
    
}
```
「NG」

```java
class twitterapiclient {
    
}
```

### クラス名はフルスペルで記述。
#### 「理由」
- クラスの役割の明確化。

「OK」

```java
class TwitterApiClient {
    
}
```
「NG」

```java
class TwApiCli {
    
}
```

### 例外クラスの末尾に「Exception」をつける
#### 「理由」
- 例外対象の明確化。

「OK」

```java
class TestObjectException extends Exception{
    
}
```
「NG」

```java
class TestObjectError extends Exception {
    
}
```

## メソッド
### 目的のわかる名前にする。
#### 「理由」
- 可読性や保守性の向上

「OK」

```java
public String toString(){

}
```

「NG」

```java
public String Tesst2(){

}
```

