---
date: 2019-08-28
description: 'ksnctfの解き直し'
category:
 - CTF
---

# KsnCTF021 Perfect Cipher

ksnctf: http://ksnctf.sweetduet.info/21

# 21. Perfect Cipher
 - `It is proved that the one-time pad is information-theoretically secure.`
   - one-time padは情報理論的に安全であると示されている
 - one-time pad is 何?
   - OTP(乱数列を高々1回だけ使う暗号の運用法)じゃん
   - HackCon'19でも出てて解けなかったやつだ......
 - とりあえず配布されたzipを解凍する
 
```
$ unzip encrypt.zip -d ./encrypt
$ ls
encrypt.cpp     encrypt.enc     flag.enc        mt19937ar.cpp   mt19937ar.h
```

 - `mt19937`は, 乱数生成関連だった気がする
   - メルセンヌ・ツイスタという乱数生成器らしい
 - `encrypt.cpp`を見る
   - `encrypt.enc`の1バイト目にplain fileのバイト長が書いてある
     - 0x28 = 40Byte
   - 乱数生成した数とxorをとり, それをkeyとしているらしい
   - keyがわかればplain fileが復元できる
   - 乱数生成した数は擬似乱数だから復元できないか?
   - `encrypt.cpp`と`encrypt.enc`なので, xorを取れば復元できそう
     - 