# Elasticserachメモ

## 目次

<!-- TOC -->

- [Elasticserachメモ](#elasticserachメモ)
    - [目次](#目次)
    - [概要](#概要)
    - [特徴](#特徴)
        - [分散配置による高速化と高可用性の実現](#分散配置による高速化と高可用性の実現)
        - [シンプルなREST APIのアクセス](#シンプルなrest-apiのアクセス)
        - [JSONフォーマットに対応した柔軟性の高いドキュメント指向データベース](#jsonフォーマットに対応した柔軟性の高いドキュメント指向データベース)
        - [ログ収集・可視化などの多様な関連ソフトウェアとの連携](#ログ収集・可視化などの多様な関連ソフトウェアとの連携)
    - [導入事例](#導入事例)
    - [基本用語と概念](#基本用語と概念)
        - [ドキュメント](#ドキュメント)
        - [フィールド](#フィールド)
        - [インデックス](#インデックス)
        - [ドキュメントタイプ](#ドキュメントタイプ)
        - [マッピング](#マッピング)
        - [※おさらい基本図](#※おさらい基本図)
        - [ノード](#ノード)
        - [クラスタ](#クラスタ)
        - [シャード](#シャード)
        - [レプリカ](#レプリカ)
        - [※おさらい基本図](#※おさらい基本図-1)
    - [システム構成](#システム構成)
        - [ノード種別](#ノード種別)
            - [Master(Master-eligible)ノード](#mastermaster-eligibleノード)
            - [Dataノード](#dataノード)
            - [Ingestノード](#ingestノード)
            - [Coordinatingノード](#coordinatingノード)
        - [Masterノード選定](#masterノード選定)
        - [ノードのクラスタ参加](#ノードのクラスタ参加)

<!-- /TOC -->

## 概要
- オープンソースの全文検索エンジン。  
→※全文検索エンジンとは、複数の文書やデータにまたがって、特定の文字列をキーに、目的のものを探す方式。  
→種類として「逐次検索」「索引検索」がある。  
→Elasticsearchは、「索引検索」にあたる。

## 特徴
### 分散配置による高速化と高可用性の実現
- Elasticserachでは、インデックスを作成すると、内部で「シャード」と呼ばれる単位に分割して、格納
- 複数のノード（接続装置）を配置させて分散することにより、インデックスの検索処理が向上する。
- ノードを追加した際の、シャードの再構成はすべて自動的に行ってくれる。
- シャードに対して、「レプリカ」と呼ばれる複製を持たせることができ、ノードダウン時の自動復旧が可能。
### シンプルなREST APIのアクセス
- インデックスの作成や検索はもちろん、クラスタの管理・メンテナンスも含めて、すべての操作をREST API経由で行うことができる。
- REST APIのURLを見るだけで、どのようなリソースにどのような操作を行っているかがクリアになる。
- 
### JSONフォーマットに対応した柔軟性の高いドキュメント指向データベース
- インデックスやクエリの対象となるドキュメントを、すべてJSONフォーマットで表す。
- 格納するドキュメント(レコード)は事前にスキーマを定義しなくても、データの格納が可能。
- 格納するデータの値を見て、Elasticserachが自動的にデータの型を推論する。
### ログ収集・可視化などの多様な関連ソフトウェアとの連携
- 単体使用でも優れているが、関連するソフトウェアと組み合わせることで、幅広い用途に適用。
- 下記の関連ソフトウェア（※Elasticserach Stack）の連携高機能なログ分析システムの構築の容易化。
    - Kibana・・・可視化
    - Logstash・・・ログ収集
    - Beats・・・メトリクスデータ収集

## 導入事例
- 日本経済新聞社
- NAVER
- GitHub
- Netflix
- CERN

## 基本用語と概念
### ドキュメント
- 格納する1つの文章の単位。  
※RDBで言えば、レコードに該当。  
※相違点は、ドキュメントはすべてJSONオブジェクトである。

- 中身は1つ以上のフィールド（※後述）で構成。  
→下記、例。

```json
{
    "host" : "192.222.2.2.2.2",
    "ident" : "-",
    "user" : "-",
    "date" : "2016-09-10T12:30:01",
    "request" : "GET http://~~~~~~~.com/index.html HTTP/1.1",
    "status" : "200",
    "bytes" : "1850"
}
```

### フィールド
- ドキュメント内の項目名の組をフィールドと呼ぶ。  
※上記の例では、`"date" : "2016-09-10T12:30:01"`の部分が1つのフィールドに該当。
- ドキュメントは、1つ以上のフィールドから構成。
- Elasticserachにおける転置インデックスは、フィールドごとに作成・管理。
- クエリ実行の際には、フィールド単位で実行。
- サポートしているデータ型に関しては、下記。

    - <文字列>
        - text型・・・ニュース記事やブログ本文等に使用。  
        →各単語によって分割。分割された単語によって転置インデックスが決定

        ```json
        {
            "news":"Wornderful Japan World Hello."
        }
        ```

        - keyword型・・・「完全一致」検索に使用。例として、アドレスUやURL等。  
        →分割せずに検索したいとき。

        ```json
        {
            "author":"gonbei_nanashi@excample.com"
        }
        ```

    - <数値型>
        - long型
        - short型
        - integer型
        - float型
        - その他

        ```json
        {
            "price":"3200",
            "temp":"34.7"
        }
        ```

    - <日付>
        - date型・・・日付のみ表記や、UNIXエボックからの表記等、様々な表記からいずれか指定。

        ```json
        {
            "birth":"1999-09-09T21:21:21"
        }
        ```

    - <真偽>
        - boolean型・・・「true」「false」で指定。

        ```json
        {
            "completed":"true"
        }
        ```

    - <オブジェクト>
        - JSONオブジェクト型・・・object型使用で、JSONオブジェクト自体をデータ型として扱う。

        ```json
        {
            "book": {
                "title":"Rails Book",
                "price":"67888"
            }
        }
        ```

    - <配列>
        - array・・・配列の各要素は、同じデータ型をとる。
            - 数値

            ```json
            {
                "ids":"[1,2,3,4]"
            }
            ```
            - 文字列

            ```json
            {
                "city":["Tokyo","Osaka","Nagoya","Fukuoka",]
            }
            ```

            - objectのarray型  
            ※「flavor」とはハードウェアのテンプレート。

            ```json
            {
                "vms":[
                    {
                        "host":"web01",
                        "flavor":"small"
                    },
                    {
                        "host":"db01",
                        "flavor":"large"
                    }
                ]
            }
            ```

### インデックス
- ドキュメントを保存する場所。
- そのままの格納ではなく、アナライザによって分割された各単語や転置インデックスの構成の情報が、様々なデータ形式によって保存されている。
- また、格納の際には、一定数の「シャード」という単位に分割され、各ノード（接続装置、接続点）に分散して格納。

### ドキュメントタイプ
- ドキュメントに含まれるフィールドの型や、属性情報などのデータ構造が定義されたもの。  
※Elasticsearch6.0以降では、1つのインデックスに格納できるドキュメントタイプは、1つのみとなる。

### マッピング
- ドキュメントタイプを具体的に定義したもの。
- ドキュメント内の各フィールドのデータ構造やデータ型を記述した情報。
- 下記、コマンドによる定義例。
    - "my_index"というインデックスの"hello"というドキュメントタイプにおいて、"user_name","message"というフィールドをそれぞれtext型として定義。

    ```console
    $ curl -XPUT http//lacalhost:9200/my_index/_mapping/hello \
    -H 'Content-Type: application/json' -d '
    {
        "properties" : {
            "user_name" : { "type" : "text" },
            "message" : { "type" : "text" }
        }
    }
    '
    ```

- 事前にマッピングを定義しない場合、Elasticsearchが予測して、自動的にマッピングを定義してからドキュメントを格納。

### ※おさらい基本図
![testds](https://user-images.githubusercontent.com/44114228/52528034-90009b00-2d16-11e9-8754-c3d17cd32a49.png)

### ノード
- Elasticsearchが動作する各サーバのこと。  
→Javaで動いているため、１つのJVMインスタンスと考えても良い。
- 典型的なでデプロイ方法は、各物理（仮想）サーバのOS上に1ノードだけ起動するのだが、1つのOS上に複数のElasticsearchノードを起動することも可能。
- 各ノードは設定ファイルで指定できる一意のノード名(`node.name`)を持っている。

### クラスタ
- 複数のノード起動時に、お互いにメッセージを送信し合い、自律的に形成するノードグループのこと。
- 各ノードは設定ファイルで指定できる一意のクラスタ名（`cluster.name`）を持つ。
- Elasticsearchでは、ノード名やクラスタなどの簡単な設定を行うだけで、クラスタを構成できる。

### シャード
- インデックスの各データを分割した単位（部分）のこと。
- 実体は、各ノード上に作られるベースエンジンのApache Luceneのインデックスファイルのこと。
- 分散したノード間で、連携・協調しながら、各ノードローカルにあるLucene（ルシーン）インデックスファイルに対して、格納や検索などの操作を実行。

※シャード数は事前にに指定しておく必要がある。インデックス作成時に作成。  
※インデックス作成後に増やすことはできない。

### レプリカ
- シャードやレプリカの可用性を高めるために、各シャードが自動的に複製するもの。
- 複製元シャードのことを「プライマリシャード」、複製先シャードのことを「レプリカシャード」と呼ぶ。
- インデックス更新の際には、必ず最初にプライマリシャードが反映されて、逐次レプリカシャードが複製する仕組み。
- 可用性担保のため、Elasticsearchでは、プライマリシャードとレプリカシャードが同じノードにならないように、自動的にノードを割り当てる機能を持つ。
- ノード障害により、プライマリシャードが喪失した場合は、レプリカシャードのうち１つが選択されて、自動的にプライマリシャードへ役割を変更する機能を持つ。
- シャードとは異なり、レプリカの数はインデックス作成後も柔軟に変更可能。

### ※おさらい基本図
![test](https://user-images.githubusercontent.com/44114228/52528305-d8bc5200-2d1e-11e9-86e6-78c8f7089587.png)

## システム構成

- 分散システムであり、クラスタを構成する各ノードがお互いに通信を行い、各ノード固有の役割を持って連係動作する仕組み。
- ここでは、各ノードの種別や役割、組み合わせや構成等を、説明。

### ノード種別

- 全部で4種類のノードがある。
    - Master(Master-eligible)ノード
    - Dateノード
    - Ingestノード
    - Coordinatingノード
- 規模や要件に応じて、1台で複数の属性を持たせたり、1つの属性のみを持たせた専用ノードの構成が可能。

#### Master(Master-eligible)ノード
- Elastucsearchクラスタは、必ず1台のMasterノードを持つ必要がある。
- クラスタ管理を行うノードとして、以下の役割がある。
    - ノードの参加と離脱の管理  
    →定期的に全ノードに対して、生存確認のpingコマンドを送信し、各ノードからの返信の有無で、生死判定を行う。
    - クラスタメタデータの管理  
    →ノード構成情報、インデックスやマッピングに関する設定情報、シャード割り当てやステータス情報等を管理し、更新情報を各ノードに伝達。
    - シャードの割り当てと再配置  
    →シャードに関する情報をもとに、新しいシャードの割り当て、既存のシャードの再配置の実行。

- Masterノードが停止してクラスタの機能も停止しないように、準備するMastertノードに昇格できる候補のノードのことを、「Master-eligible」ノードと呼ぶ。  
※デフォルトの設定では、すべてのノードがこの役割を持っている。

#### Dataノード
- Elasticsearchにおけるデータの格納・クエリへの応答・内部的なLuceneインデックスファイルのマージなどの管理を行う、等の役割を持つ。
- またクライアントからリクエストのハンドリングも行う。
- クライアントがドキュメントをインデックスに格納すると、格納対象となるシャード番号を決定して、そのシャード番号を保持しているDataノードへ処理をまわす。

![ygygy](https://user-images.githubusercontent.com/44114228/52530865-9b23ed00-2d4f-11e9-9a85-3557457780e4.png)

- 一方で、クエリ処理の場合、クエリ内容の対応する1つ以上のシャードを持つノードへルーティングを行い（**sctatterフェーズ**）、各ノードからレスポンスを集約して（**gatherフェーズ**）、まとめられた結果をクライアントへ応答。

![tesvkbd](https://user-images.githubusercontent.com/44114228/52530983-bc85d880-2d51-11e9-9e64-66e5f68a477e.png)

- デフォルト設定では、すべてのノードはDataノードの役割を持っている。
- 設定変更の際には、各ノードの設定ファイルの「elasticsearch.yml」を変更。

#### Ingestノード
- ノードの内部でデータの変換や加工といった、従来Logstash(ログ収集ソフト)で行う処理を実行できる機能。
- Elasticsearch5.0から新登場。
- Ingestノード上で処理フロー（pipline）を定義すると、クライアントから送られてくるデータをpipelineで前処理。処理後のデータはDataノードに送られてインデックスに格納。  
※Ingestノードを構成した場合でも、必ずしもpipelineを定義する必要はない。要件に応じて定義する。
- デフォルト設定では、すべてのノードはIngestノードの役割を持っている。
- 設定変更の際には、各ノードの設定ファイルの「elasticsearch.yml」を変更。

#### Coordinatingノード
- クライアントからのリクエストのハンドリングのみを実行。
- つまり、下記専用ノード。
    - インデックス処理時に、適切なプライマリシャードを持つDataノードへルーティングを行う。
    - クエリ処理時に「scatter」「gather」を専門に行う。

![eghfkyv](https://user-images.githubusercontent.com/44114228/52531262-dd502d00-2d55-11e9-84e9-380b47022c9d.png)

### Masterノード選定
- Masterノードは、クラスタのリーダーとして、状態管理の責任を持つ。
- そのため、Masterノードが停止してしまうと、クラスタ自体が停止してしまうため、高可用性（高い継続稼働力、復旧が早い）を担保するためには、必ず下記の構成にする。
    - Master-elgibleノードの数を3以上の奇数にして、稼働させる。  
    →偶数の場合、スプリットブレインが起きる可能性がある。  
    ※スプリットブレインとは、「クラスタが2つに分断されて、かつそれぞれのクラスタ上でMasterノードが独立して稼働してしまう状態のこと。」

### ノードのクラスタ参加
- Elasticsearchでは、各ノードは起動時に既存のクラスタ自動的に参加する仕組みを持っている。
- 検知方法として下記。
    1. 各ノードは起動時に、設定ファイルの「"discovery.zen.ping.unicast.hosts"」で定義されたノード（群）も接続を試みる。
    2. 接続成功後、クラスタ一員として参加。
