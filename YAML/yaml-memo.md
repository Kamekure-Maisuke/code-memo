# YAMLメモ
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
- ここから