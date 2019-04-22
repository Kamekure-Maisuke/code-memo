# YAMLメモ

<!-- TOC -->

- [YAMLメモ](#yamlメモ)
    - [概要](#概要)
    - [環境](#環境)
    - [記法](#記法)
        - [チュートリアル](#チュートリアル)
        - [扱えるデータ形式](#扱えるデータ形式)
            - [1. スカラー](#1-スカラー)
            - [2. シーケンス](#2-シーケンス)
            - [3. マッピング](#3-マッピング)
        - [様々な構造の組み合わせ](#様々な構造の組み合わせ)
            - [シーケンスとマッピング](#シーケンスとマッピング)
        - [改行データの扱い](#改行データの扱い)
        - [アンカーとエイリアス](#アンカーとエイリアス)

<!-- /TOC -->

## 概要
- 人間にとって、読みやすいデータ直列化の標準形式。
- フレームワークやツールでの設定ファイル記述や、データ保存の際に利用。
- [公式サイト](https://yaml.org/)
- JSONに類似している。

## 環境
- Windows 10
- Ruby 2.6.0

## 記法
### チュートリアル
- 最初の例として、yamlで「名前」を管理するとする。
- yamlのファイル拡張子は、「.yml」とする。
- Rubyとyamlを利用した、簡単なサンプルは下記。

```ruby
# yaml命令の扱い
require 'yaml'
# yamlファイルの読み込み
names = YAML.load_file('myinfo.yml')
# yaml設定内容の出力
p names
```

```yaml
# 「名前」の管理
- tanaka
- suzuki
- satou
```

- サンプルでの出力結果は、下記。

```shell
$ ruby test.rb

["tanaka", "suzuki", "satou"]
```

### 扱えるデータ形式
- YAMLでは、下記の3つがある。
    - **スカラー**
    - **シーケンス**
    - **マッピング**

#### 1. スカラー
- 値。
    - 文字列
    - 数値
    - 真偽値
    - NULL
    - 日付

- 下記、例。
    - ※型は自動判別

```yaml
# 文字列
- tanaka
# 数値
- 56
# 真偽値
# 記法として、「true/false」「yes/no」「on/off」があり、真偽値として扱われる。
- false
# null
# 記法として、「null」「~」がある。
- null
# 日付
- 2019-04-22
# 真偽値を文字列として扱う場合。
- 'false'
# 数値を文字列として扱う場合。
- '78'
```


#### 2. シーケンス
- 配列
- 下記、例。

```yaml
# フロースタイル
- tanaka
- suzuki
- satou

# インラインスタイル
[78,56,34]

# 入れ子構造
# ※1文字以上の空白必要。タブは使えない。
# ※入れ子の際、その前に何もつけない。
- tanaka
- 
  - suzuki
  - satou
- sakamoto
```

#### 3. マッピング
- 連想配列やハッシュ。
    - key,value型のデータ
- 下記、例。
- ※「:」の後の空白は必要。

```yaml
# フロースタイル
name: tanaka
age: 67

# インラインスタイル
{ name: suzuki, age: 38 }

# 入れ子
name: satou
age: 
  first : 12
  second: 24
```

### 様々な構造の組み合わせ

#### シーケンスとマッピング
- シーケンスとマッピングを組み合わせて、構造を定義。
- 下記、「配列が値のハッシュ」

```yaml
# フロースタイル
name: 
  - tanaka
  - satou
  - suzuki
age: 
  - 56
  - 30
  - 35

# インラインスタイル
name: [tanaka,satou]
age: [67,30]
```

- 下記、「ハッシュが値の配列」

```yaml
# フロースタイル
- name: tanaka
  age: 67
- name: satou
  age: 30
- name: suzuki
  age: 69

# インラインスタイル
- { name: tanaka, age: 67 }
- { name: satou, age: 30 }
```

### 改行データの扱い
- YAMLでは、改行は文字列として、扱われる場合がある。
- 下記の書き方では、一つの文字列になる。

```yaml
# 結果 : "I am Tanaka ."

I
am
Tanaka
.
```

- 改行を含める場合、「|」という縦棒を加えた記述をする。
- 下記、例。

```yaml
# 結果 : ["I\nam\nTanaka\n."]
- |
  I
  am
  Tanaka
  .

# 結果 : ["I\nam\nTanaka\n.\n"]
- |+
  I
  am
  Tanaka
  .

# 結果 : ["I\nam\nTanaka\n."]
- |-
  I
  am
  Tanaka
  .

```

- 下記、「途中の改行はスペース、最後の改行だけ保持」の場合。
- 「>」という、不等号を加える。

```yaml
# 結果 : ["I am Tanaka .\n"]
- >
  I
  am
  Tanaka
  .

# 結果 : ["I am Tanaka .\n\n"]
- >+
  I
  am
  Tanaka
  .

# 結果 : ["I am Tanaka ."]
- >-
  I
  am
  Tanaka
  .

```

### アンカーとエイリアス
- YAMLでは、アンカー(変数)とエイリアス(参照名、別名)をつけることができる。
- 下記、基本例。

```yaml
# アンカー定義は、「&」で行う。
- &name suzuki
# エイリアス利用定義は、「*」で行う。
- *name
- &age 89
- *age
```

- 下記、「ハッシュ」にアンカーやエイリアスを利用した、複雑なデータ構造例。

```yaml
- &satou
  name: satou
  age: 89
- &suzuki
  name: suzuki
  age: 43
  roommate:
    - *satou
- name: siraishi
  age: 39
  roommate:
    - *satou
    - *suzuki

# 結果 : [{"name"=>"satou", "age"=>89}, {"name"=>"suzuki", "age"=>43, "roommate"=>[{"name"=>"satou", "age"=>89}]}, {"name"=>"siraishi", "age"=>39, "roommate"=>[{"name"=>"satou", "age"=>89}, {"name"=>"suzuki", "age"=>43, "roommate"=>[{"name"=>"satou", "age"=>89}]}]}]
```