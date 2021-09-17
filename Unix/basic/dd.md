# ddメモ

## 概要
- ファイルをブロック単位でコピーするコマンド。
  - ddではショルするデータの単位をブロックと表現する。
- 例として、USBメモリのバックアップやパーテーションのコピーが可能。

## 基本
- if,of
  - if : ファイルから読み出す。
  - if : ファイルへ書き出す。

```bash
# 10までのデータを作る。
seq 10 > data
# dataファイルをddで読み込み別ファイルへ書き出す(コピー)。
dd if=data of=data_1
# 確認。data_1の作成及び中身を確認。
ls
cat data_1
```

```bash
# デバイスファイルの中身をisoファイルとして保存
# 以下はCD-ROMの中身をisoファイルとして保存。
dd if=/dev/cdrom of=install.iso
```

- bs,ibs,obs
  - bs : 読み書きするバイト数
  - ibs : 読み込むバイト数。defaultは512
  - obs : 書き込むバイト数。defaultは512

```bash
# 200バイトのファイルを作成する。
dd bs=200 if=/dev/zero of=data count=1
# k単位でファイルを作成する。
dd bs=1k if=/dev/zero of=sample count=1
# 確認
ls -lh
```

- conv
  - conv : 指定した方法への変換。

```bash
# 大文字・小文字にする。
echo "abc" | dd conv=ucase
echo "ABC" | dd conv=lcase
```

```bash
# 10バイトのブロックに数字を埋め込む。
seq 10 | dd cbs=10 conv=block of=data
```
