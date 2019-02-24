# mermaid.jsメモ
## 概要
- Javascriptのチャート生成ライブラリ
- テキスト形式で、図やフローチャートを生成できる。

## 記法
### 基本
#### ノード（接続点）
- 各図形の意味は、[こちら](https://www.edrawsoft.com/jp/flowchart-symbols.php)を参考にする。

```mermaid
graph TD;
    ノード
    ノード1[テキスト入りノード]
    ノード2(丸括弧形ノード)
    ノード3((円形ノード))
    ノード4>非対称形ノード]
    ノード5{ひし形ノード}
```

#### リンク（接続）
- 例のチャートは、下記の順番で指定。
    - 矢印付きリンク
    - オープンリンク
    - リンク上テキスト
    - 矢印とテキストのリンク
    - 点線リンク
    - 点線リンク上テキスト
    - 太線リンク
    - 太線上のテキスト
    - 特殊文字コード使用
        - 特殊文字詳細は、[こちら](http://www.shikaku-d.com/neko/character_entity.html)
        - 特殊文字変換ツールは[こちら](https://tech-unlimited.com/escape.html)

```mermaid
graph TD
    鈴木-->田中;
    佐藤---高橋;
    渡辺---|仲良し|伊藤;
    中村-->|好き|山本;
    小林-.->加藤;
    佐々木-.気になる.->山田
```

```mermaid
graph TD
    斉藤==>松本
    井上==嫌い==>木村;
    A["クローバーマーク&clubs;"] -->B["顔文字(/・&omega;・)/"]
```

#### サブグラフ

```mermaid
graph TB
    神-->従人
    神-->部下
    subgraph Cクラス
    支配者-->従人
    end
    subgraph Bクラス
    リーダー-->部下
    end
    subgraph Aクラス
    神-->信者
    end
```

#### 動き

```mermaid
graph LR;
    A-->Google;
    click A callback "クリック"
    click Google "https://www.google.co.jp/" "リンク指定"
```

#### スタイル指定

```mermaid
graph LR
    start(開始)-->stop(完了)
    style start fill:#f9f,stroke:#333,stroke-width:4px
    style stop fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5
```

### フローチャート
- フローチャートを作成の際には、「graph タイプ」で指定
- 指定タイプは、下記。
    - TB - 上から下
    - BT - 下から上
    - RL - 右から左
    - LR - 左から右

- 下記は、上から下への流れを示すフローチャート

```mermaid
graph TB
    A-->B;
    A-->C;
    A-->D;

    B-->E;
    B-->F;

    C-->F;
    C-->G;

    D-->G;
    D-->H;
```

- 下記は、左から右への流れを示すフローチャート  
※同じノード（接続点）があれば、自動的に流れを示す。

```mermaid
graph LR;
    A-->B;
    B-->C;
    C-->D;
    D-->E;
    E-->F;
    F-->G;
    G-->H;
    H-->I;

    I-->A;
```

### シーケンス図
- 最初に「sequenceDiagram」を指定する。

```mermaid
sequenceDiagram
    クライアント->>サーバー: 要求
    サーバー-->>クライアント: 送信
```

- ライフライン（参加者）を定義することもできる。
- エイリアス（変数や名前）を指定することもできる。

```mermaid
sequenceDiagram
    participant クライアント
    participant sv as サーバー
    participant db as データベース

    # データ取得コード
    クライアント ->>+ sv : 要求
    sv ->>+ db : 発行
    db -->>- sv : 結果
    sv -->>- クライアント : 結果

    alt 正常終了
        Note over クライアント : 取得データ表示
    else エラー
        Note over クライアント : エラー表示
    end
```

- 実行仕様（イベント）を追加できる。

```mermaid
sequenceDiagram
    クライアント->>+サーバー: 要求
    サーバー-->>-クライアント: 送信
```

- ノート（メモ）を追加できる。

```mermaid
sequenceDiagram
    クライアント->>+サーバー: 要求
    Note right of サーバー: これは基本処理です
    サーバー-->>-クライアント: 送信
```

```mermaid
sequenceDiagram
    クライアント->>+サーバー: 要求
    Note over クライアント,サーバー: きちんと返してくれるかな。
    サーバー-->>-クライアント: 送信
```

- ループ表現可能

```mermaid
sequenceDiagram
    クライアント->>+サーバー: 要求
    loop ループ処理
        サーバー-->>-クライアント: 送信
    end
```

- 条件分岐可能

```mermaid
sequenceDiagram
    participant cl as クライアント
    participant sv as サーバー
    cl->>sv: 要求
    alt 正常
        sv->>cl: 送信
    else 異常
        sv->>cl: ダメ
    end
```

### ガントチャート
- 最初に「gant」を指定する。

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title タスク管理

    section 田中
    完了タスク            :done,    des1, 2019-01-06,2019-01-08
    作業中タスク               :active,  des2, 2019-01-09, 3d
    予定タスク               :         des3, after des2, 5d
    予定タスク2              :         des4, after des3, 5d

    section 鈴木
    完了タスク            :done,    des1, 2019-01-06,2019-01-10
    作業中タスク               :active,  des2, 2019-01-11, 5d
    予定タスク               :         des3, after des2, 6d
    予定タスク2              :         des4, after des3, 6d
```