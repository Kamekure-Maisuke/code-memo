# Javaコーディングルール・慣習メモ

<!-- TOC -->

- [Javaコーディングルール・慣習メモ](#javaコーディングルール・慣習メモ)
    - [命名](#命名)
        - [大文字と小文字での名前判別はしない。](#大文字と小文字での名前判別はしない)
            - [「理由」](#理由)
    - [パッケージ](#パッケージ)
        - [命名はすべて小文字。](#命名はすべて小文字)
            - [「理由」](#理由-1)
            - [「補足」](#補足)
        - [名前を省略語にしない](#名前を省略語にしない)
            - [「理由」](#理由-2)
            - [「補足」](#補足-1)
        - [インポートの「*」での省略化。](#インポートのでの省略化)
            - [「理由」](#理由-3)
            - [「補足」](#補足-2)
    - [クラス](#クラス)
        - [クラス名は役割ある名前にする。](#クラス名は役割ある名前にする)
            - [「理由」](#理由-4)
        - [名前の最初の1文字は大文字、複数単語の場合は各単語の先頭を大文字。](#名前の最初の1文字は大文字複数単語の場合は各単語の先頭を大文字)
            - [「理由」](#理由-5)
            - [「補足」](#補足-3)
        - [クラス名はフルスペルで記述。](#クラス名はフルスペルで記述)
            - [「理由」](#理由-6)
        - [例外クラスの末尾に「Exception」をつける](#例外クラスの末尾にexceptionをつける)
            - [「理由」](#理由-7)
    - [メソッド](#メソッド)
        - [目的のわかる名前にする。](#目的のわかる名前にする)
            - [「理由」](#理由-8)
        - [キャメル形式で記述](#キャメル形式で記述)
            - [「補足」](#補足-4)
        - [booleanメソッドは真偽目的が分かりやすい名前にする。](#booleanメソッドは真偽目的が分かりやすい名前にする)
    - [変数](#変数)
        - [内容がわかる名前にする。](#内容がわかる名前にする)
        - [boolean型変数は真偽目的が分かりやすい名前にする。](#boolean型変数は真偽目的が分かりやすい名前にする)
        - [コンポーネント型変数は、「使用目的 + コンポーネント名」。](#コンポーネント型変数は使用目的--コンポーネント名)
            - [補足](#補足)
    - [定数](#定数)
        - [全て大文字](#全て大文字)
        - [複数単語の場合は、アンダーバーで区切る。](#複数単語の場合はアンダーバーで区切る)

<!-- /TOC -->

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

### キャメル形式で記述
#### 「補足」
- 最初の単語の先頭を小文字。
- 複数単語の場合は、それ以降の各単語の先頭を大文字。

「OK」

```java
public String showInfo(){

}
```

「NG」

```java
public String showinfo(){

}
```

### booleanメソッドは真偽目的が分かりやすい名前にする。

「OK」

```java
boolean canRemove()

boolean checkChange()
```

「NG」

```java
boolean setName()

boolean isRemove()
```

## 変数

### 内容がわかる名前にする。

「OK」

```java
startDate
endDate
maxPrice
minPrice
```

「NG」

```java
a
num
str
```

### boolean型変数は真偽目的が分かりやすい名前にする。

「OK」

```java
boolean canRemove;

boolean checkChange;
```

「NG」

```java
boolean isRemove;

boolean name;
```

### コンポーネント型変数は、「使用目的 + コンポーネント名」。
#### 補足
- 下記の例では、「Button」というコンポーネントがある場合。

「OK」

```java
Button cancelButton = new Button():
```

「NG」

```java
Button cancel = new Button():
```

## 定数
### 全て大文字

「OK」

```java
static final int MODE = 7;

static final string COUNTRY = "JAPAN";
```

「NG」

```java
static final string country = "JAPAN"
```

### 複数単語の場合は、アンダーバーで区切る。

「OK」

```java
static final int EDIT_MODE = 1;

static final string MY_COUNTRY = "JAPAN";
```

「NG」

```java
static final string myCountry = "JAPAN"
```
