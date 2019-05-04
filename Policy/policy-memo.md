# プログラミングポリシーメモ

<!-- TOC -->

- [プログラミングポリシーメモ](#プログラミングポリシーメモ)
    - [経緯](#経緯)
    - [参考書籍](#参考書籍)
    - [土台](#土台)
        - [プログラミングに特効薬はない。](#プログラミングに特効薬はない)
        - [コードこそが設計書](#コードこそが設計書)
        - [コードは修正されるもの](#コードは修正されるもの)
    - [有名原則](#有名原則)
        - [KISS](#kiss)
        - [DRY](#dry)
        - [YAGNI](#yagni)
        - [PIE](#pie)
        - [SLAP](#slap)
        - [OCP](#ocp)

<!-- /TOC -->

## 経緯
- プログラムの仕組みや文法を学んでいくうえで、設計思想や原則に基づいた記述の重要性は、学べていない。
- しっかりと若いうちに、把握しておいて、今後の基盤づくりを行う。

## 参考書籍
- 下記の本を参考にしながら、まとめる。
    - [プリンシプル オブ プログラミング 3年目までに身につけたい 一生役立つ101の原理原則](https://www.amazon.co.jp/dp/B071V7MY82/ref=dp-kindle-redirect)

## 土台
### プログラミングに特効薬はない。
- 開発などにおいて起こる様々な混乱事項を、解決できる特効薬は、プログラミングにはない。
- 下記のようなソフトウェアの本質が、困難性を持ち、多岐に渡る問題の場合、全てを解決できる特効薬はありえない。
    - 1. 複雑性
        - ソフトウェアは、規模や関係など、大きくて複雑。
    - 2. 同調性
            - 現実世界に同調しなくてはいけない。
            - 技術だけでなく、人間心理や行動等の様々なものとの関係によって成り立つ。
            - 現実世界も複雑である以上、プログラミングも同様の複雑さになることは不可避。
    - 3. 可変性
        - ソフトウェアは、常に変化を求められる。
        - 利用者は、環境に慣れれば、次なる要求を求めるもの。
    - 4. 不可視性
        - ソフトウェアは、概念であり、製品・過程・経緯等は見ることができない。
- 解決策としては、地道に取り組むほかない。
- ※ソフトウェア開発において、下記の項目等は、「これがなくても成立はするが、これがあると、よりよい品質と効率的な生産性を担保できる。」
    - プログラミング言語
    - ビルド環境
    - バージョン管理
    - ライブラリ
    - フレームワーク

### コードこそが設計書
- ソフトウェア開発において、上流の「基本設計」から「デバッグ」まで、すべてが設計。
- そのアウトプットが「コード」。
- つまり、設計過程での産物であるコードは、設計書。
- ソフトウェア開発で作成される文書の中で、エンジニアリングのドキュメントはコードといえる。

### コードは修正されるもの
- コードは一回きりの使い捨てではなく、その場での最適な状況によって、変更されるもの。
- ソフトウェアは、複雑なため、完璧なものにはならない。
- 障害や要望対応、機能拡張等を、最初から全て完璧にわかって作ることは不可能。
- プログラミングは、変更される前提で、「変更に強い記述」をするように心がける。

## 有名原則
### KISS
- 「Keep It Simple, Stupid. Keep It Short and Simple.」
- 意味は、「シンプルにしておこう、ばかよ。簡潔かつ単純にしておこう。」
- コード記述の際に、常に「単純性」「簡潔性」を意識する。
- むやみに修正していくと、秩序がなくなり、複雑になっていき、可読性も下がっていくため、**修正容易性**を意識することは大事。

### DRY
- 「Don't Repeat Yourself」
- 意味は、「繰り返さない」
- 同様のコードを重ねて書かない。
- 重複があると、修正や機能追加等の作業が、困難になる。
- 下記が、主な困難事項。
    - コード量の増大・コード質の複雑化による、可読性の低下。
    - 修正箇所の特定が困難になる。
- 改善するには、関数化やモジュール化等の、**抽象化**を行う。下記のメリットがある。
    - 量が減る。
    - 可読性が上がる。
    - 修正しやすくなる。
    - 品質が担保しやすくなる。
    - 抽象化部分の再利用が可能になる。

### YAGNI
- 「You Aren't Going to Need It.」
- 意味は、「それはきっと必要にならない。」
- 必要な時だけ、必要な分だけ、コードを書く。
- 変化を予測して、記述しても、たいていその予測は外れる。
- また、かえって複雑さを増すだけ。
- 汎用性よりも、単純性を考える。

### PIE
- 「Program Intently and Expressively.」
- 意味は、「意図を表現してプログラミングしよう。」
- コード記述の際には、意図がしっかりとストレートに伝わるように書く。
- 理由として、コードこそが、ソフトウェアを把握するための唯一の手掛かりであるから。

### SLAP
- 「Single Level of Abstraction Principle」
- 意味は、「抽象化レベルの統一」
- 関数を抽象レベルに沿って分割して、同じ関数に属するコードの抽象レベルをすべて統一するということ。
- 揃って分割されていると、「要約性」「閲覧性」が高く両方満たされる。
    - 「要約性」・・・関数に一覧が目次のようになる。
    - 「閲覧性」・・・分割された関数は、塊となって、閲覧性がよくなる。

### OCP
- 「Open-Closed Principle」
- 意味は、「開放・閉鎖原則」
- 「コードの振る舞いを拡張できる」「コードの振る舞いを拡張しても、その他のコードはまったく影響を受けない。」という２つの属性を満たすように、つくること。