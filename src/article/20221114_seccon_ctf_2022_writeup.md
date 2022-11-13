---
date: 2022-11-14
description: 'SECCON CTF 2022 Writeup'
tags:
 - CTF
---


# SECCON CTF 2022 Writeup

## はじめに

2022/11/12〜13にかけて開催されたSECCON CTF 2022にチームtaskとして参加し243/726位でした。

revのwarmupであるbabycmpしか通せなかったためwriteupは不要かと思っていました。

しかし、他の参加者のwriteupを見ると、私のようにGDBで無理矢理解いている人がいなかったため、解法共有のためにwriteupを書くことにしました。

## [Rev] babycmp(176 solves/79pts)

> `baby_mode = 1` 👶
> 
> 
> [chall.baby](https://dashboard.quals-score.seccon.jp/api/download?key=prod%2Fbabycmp%2Fchall.baby) 214fb8d53720d5183ed0fa850d00c33adb310e60
> 

64bitのELFファイルで、コマンドライン引数に正しいFLAGを設定するとCorrectと表示される系の問題に見えます。

```
$ file chall.baby 
chall.baby: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=ded5cc024f968b3087bf5d3df8649d14714e7202, for GNU/Linux 3.2.0, not stripped
$ ./chall.baby
Usage: ./chall.baby FLAG
$ ./chall.baby SECCON{hoge}
Wrong...
```

Ghidraで解析すると、以下のif文がtrueならCorrectになるようです。しかし、これらのデコンパイル結果を見てもよく分かりませんでした。そこで、動的解析してみることにしました。

![Screen Shot 2022-11-14 at 0.51.56.png](SECCON%20CTF%202022%20Writeup%2006c66cb85bb74f439f392f34a7ce7e7d/Screen_Shot_2022-11-14_at_0.51.56.png)

GDBの逆アセンブル結果を見るに

- `0x0000000000001271` の `je` 命令
- `0x00000000000012b5` の `jne` 命令
- `0x00000000000012c0` の `jne` 命令

がそれぞれ条件を満たせば良いことが分かります。

```bash
$ gdb -q ./chall.baby
(snip)
gdb-peda$ disas main
(snip)
   0x0000000000001257 <+215>:	mov    r12,QWORD PTR [rbp+0x8]
   0x000000000000125b <+219>:	mov    rax,QWORD PTR [r12]
   0x000000000000125f <+223>:	mov    rdx,QWORD PTR [r12+0x8]
   0x0000000000001264 <+228>:	xor    rax,QWORD PTR [rsp+0x20] 
   0x0000000000001269 <+233>:	xor    rdx,QWORD PTR [rsp+0x28]
   0x000000000000126e <+238>:	or     rdx,rax
   0x0000000000001271 <+241>:	je     0x129e <main+286>         # 1つ目の条件
(snip)   
   0x000000000000129e <+286>:	mov    rax,QWORD PTR [r12+0x10]
   0x00000000000012a3 <+291>:	mov    rdx,QWORD PTR [r12+0x18]
   0x00000000000012a8 <+296>:	xor    rax,QWORD PTR [rsp+0x30]
   0x00000000000012ad <+301>:	xor    rdx,QWORD PTR [rsp+0x38]
   0x00000000000012b2 <+306>:	or     rdx,rax
   0x00000000000012b5 <+309>:	jne    0x1273 <main+243>         # 2つ目の条件
   0x00000000000012b7 <+311>:	mov    eax,DWORD PTR [rsp+0x40]
   0x00000000000012bb <+315>:	cmp    DWORD PTR [r12+0x20],eax
   0x00000000000012c0 <+320>:	jne    0x1273 <main+243>         # 3つ目の条件
   0x00000000000012c2 <+322>:	lea    rdi,[rip+0x1e1b]        
   0x00000000000012c9 <+329>:	xor    r12d,r12d
   0x00000000000012cc <+332>:	call   0x1100 <puts@plt>
(snip)
```

そのために、それぞれの命令の前の `xor` 命令および `cmp` 命令にて以下を比較していることが分かります。最終的に、正しいFLAGがコマンドライン引数で渡された時に、これらのレジスタとスタック領域の値が一致するはずです。FLAGに利用できる文字種はRulesに書いてある通り、ASCIIの `0x20` から `0x7e` の間です。そのための1文字ずつリークさせることが可能です。

| レジスタ | スタック領域 |
| --- | --- |
| rax | QWORD PTR [rsp+0x20] |
| rdx | QWORD PTR [rsp+0x28] |
| rax | QWORD PTR [rsp+0x30] |
| rdx | QWORD PTR [rsp+0x38] |
| eax | DWORD PTR [rsp+0x40] |

その操作をするためのGDB Scriptがこちらです。 `FLAG=` の部分16文字ずつしかリークできないので、少しずつ上書きしました。結果、FLAGを取得できました。

```python
import gdb
import re

FLAG=''
# 1st breakpoint
# breakpoint="0x555555555264"
# -> SECCON{y0u_f0und
FLAG='SECCON{y0u_f0und'

# 2nd breakpoint
# breakpoint="0x5555555552a8"
# -> SECCON{y0u_f0und_7h3_baby_flag_Y
FLAG='SECCON{y0u_f0und_7h3_baby_flag_Y'

# 3rd breakpoint
breakpoint="0x5555555552bb"
# # -> SECCON{y0u_f0und_7h3_baby_flag_YaY}

gdb.execute(f"b *{breakpoint}")

for i in range(8):
    # flag format is SECCON{[\x20-\x7e]+}
    for ch in range(0x20, 0x7e):
        if any([scheme == ch for scheme in [0x27]]):
            continue

        tmp_flag = FLAG + chr(ch)
        print(tmp_flag)
    
        gdb.execute(f"r '{tmp_flag}'")

        # rax = gdb.parse_and_eval('$rax')
        # rdx = gdb.parse_and_eval('$rdx')
        eax = gdb.parse_and_eval('$eax')

        i = gdb.inferiors()[0]
        rsp_list = []

        # offsetは0x20(rax) -> 0x28(rdx) -> 0x30(rax) -> 0x38(rdx) -> 0x40
        # y0uの0がうまく動いてなかった、なぜ？guessしてしまったけど
        padding = 0x20
        # offset = 0x20 + padding
        offset = 0x20
        for idx in range(8):
            # stack_addr = gdb.parse_and_eval(f'$rsp+{hex(offset + idx)}')
            r12 = gdb.parse_and_eval('$r12')
            stack_addr = gdb.parse_and_eval(f'{hex(int(r12) + offset+ idx)}')
            m = i.read_memory(stack_addr, 1)
            rsp_list.append(m.hex())

        # rax_list = re.split('(..)',format(int(rax), '016x'))[1::2]
        # rax_list.reverse()
        # rdx_list = re.split('(..)',format(int(rdx), '016x'))[1::2]
        # rdx_list.reverse()
        eax_list = re.split('(..)',format(int(eax), '016x'))[1::2]
        eax_list.reverse()

        # print(f"rax: {rax_list}")
        # print(f"rdx: {rdx_list}")
        print(f"eax: {eax_list}")
        print(f"rsp: {rsp_list}")

        gdb.execute('c')

        is_ok = True
        for idx in range(len(tmp_flag)-padding):
            # paddingの1の位が0の時はrax、8の時はrdxレジスタを参照する
            ra = eax_list[idx]
            sp = rsp_list[idx]
            print(f"ra: {ra}, sp: {sp}, ra==sp: {ra==sp}")
            is_ok &= (ra==sp)
        if not is_ok:
            continue
        FLAG = tmp_flag
        print(f"OK!!!! {FLAG}")
        break
```

## おわりに

あまり賢い解き方ではないですが、解けたのは嬉しかったです。Web問題の復習にはもう少し時間がかかりそうなので、それも終わったら復習記事を書こうと思います。

- [TwitterのWeb問復習スレッド](https://twitter.com/task4233/status/1591673054413094912?s=20&t=hABu5HZBk9yiez4FCmDPsQ)
