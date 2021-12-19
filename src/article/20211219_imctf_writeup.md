---
date: 2021-12-19
description: 'IMCTF2021 Writeup'
tags: 
 - CTF
---


# IMCTF writeup
## はじめに
IMCTF2021にTsukushiのメンバーとして参加し、その中で私が5694点獲得して全体2位でした。

<img width="1117" alt="スクリーンショット 2021-12-19 18 20 22" src="https://user-images.githubusercontent.com/29667656/146669851-acd54360-7ee2-42f3-8efa-642d0078f618.png">

解いた問題だけ簡単に方針を書いておきました。

## Web
### can you see cookie?🍪
> 君には、このクッキーが見えるか？ 

対象ページにアクセスするとCookieが付与されているので、それを見れば良いです。見るとBase64エンコードされていたのでデコードしました。

### for stranger of storage🤠
> なんてこった！最悪だぜ！まさかそんなとこに置き忘れるなんて！

Local Storageに意味ありげな文字列があったので、CyberChefに投げ込みました。

https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,'')&input=NTQgNDcgNTYgMzAgNDkgNDcgMzEgNmMgNDkgNDggNTIgNmMgNjIgNDcgNzcgNjcgNjUgNTcgMzkgMzEgNDkgNDcgNDYgNjkgNjIgMzMgNTYgMzAgNDkgNDggNTIgNmYgNWEgNTMgNDIgN2EgNjQgNDggNGEgNjggNjIgNmQgNjQgNmMgNDkgNDggNTIgNmYgNjEgNTcgMzUgNmUgNjMgNzkgNDIgNjggNjMgNmQgNTUgNjcgNjEgNDcgNDYgNzcgNjMgNDcgNTYgNzUgNjEgNTcgMzQgNmUgNDkgNDggNTIgNzYgNDkgNDcgMzEgNmMgNDMgNmMgNGUgMzAgNjMgNmQgNDYgNzUgNWEgMzIgNTUgNjcgNjQgNDcgNjggNzAgNjIgNmQgNjQgN2EgNDMgNmQgNmMgNzQgNTkgMzMgNTIgNmQgNjUgMzMgNGUgMzAgNjMgNmQgNDYgNzUgNWEgMzIgNTYgNjYgNjQgNDcgNjggNzAgNjIgNmQgNjQgN2EgNTggMzIgNDYgNzkgNWEgNTYgMzkgNmYgNTkgNTggNDIgNzcgNWEgNTcgMzUgNzAgNjIgNjkgNjQgNjYgNjQgNDcgMzkgNjYgNjIgNTcgNTYgMzkgNDMgNmIgNDYgNzAgNjIgNjkgNjQgMzAgNDkgNDcgMzUgNzYgNDkgNDcgNTIgNzYgNjQgNTcgNGEgMzAgNDkgNDcgNDYgNjkgNjIgMzMgNTYgMzAgNDkgNDcgNmMgMzA

### not any more logging📜
> 私たちにはもはやログなど必要ない。そう、リリースしたのだから。

JavaScriptを見たら難読化されていたので、解除して部分文字列を連結しました。

## Misc
### no this site no life? 🎥
> クリスマスが盗まれたらしい。緑の怪物がやりやがった。どうしてかって？知ったことか。取り返したいなら、このファイルを使いな！

`dp B07PQNYBZ4`でググったら出てきたので、Chromeのconsoleで実行しました。

### made of honey🍯
> 100エーカーの森にもICT化の波は来ているらしい。ここ、はちみつ王国で怪しい影がうごめく。「よう！俺様テガー！今宵、クマ王子プー様はクリスマスパーティーにご出席らしい。やつのPCはお留守だ。今のうちにハチミツ金庫のパスワードを抜き取っちまおう。なんだこれ？」テガーはクリススー・エヴァンに見せてみた。「ああ、これは、プーが欲しがっているものだよ。これで新しいハチミツの産地を開拓するんだってね」

crackstationに投げたら復元できたので連結しました。

### brute force gui💪
> R2 は最高のアストロメク・ドロイドだと思うかい？彼はC3にクイズを出したらしい。「パスワードが分かるか？600万言語以上話せる私に不可能などあるものですか！」

GUIアプリを立ち上げると2桁の数字が入力できたので、適当に99を入れたら通りました。

## Crypto
### static random👽
> 「俺たちの活躍を見逃すな！」「We Are ...」

seedが固定値なので、randomも実質固定値です。encrypt関数が公開されているので、その逆操作を行いました。

```python
import random

def dec(inputtext: str):
    random.seed("we wish a merry xmas")
    encoded: str = ""
    for item in inputtext:
        encoded += chr(ord(item) + random.randint(0, 10))
    return encoded

if __name__ == "__main__":
    with open("message.txt", "r") as f:
        enc = f.read()
        print(dec(enc))
```

### oreore😎
> 太郎君は天才なので独自暗号を発明しました。彼によると最も安全な暗号らしいですが...

base64 -> hexStringとされていたので、逆の変換を行ったら通りました。

### love letter💌
> クリスマスのエモいエピソードを解読してフラグをゲットしましょう。

```
ewvnuwjq wlte b cupl cleelx eu ibtbiu rux fjxqwehbw. ewvnuwjq cqilw fer, wu jl vwlk ejl rcbz eu ldgxlww hn brrlfequt. ejl cupl cleelx mbw qhfer{lnl_cupl_nuv_ibtbiu_nlbbbbj}. ibtbiu mbw wjufilk btk euwwlk ejl cupl cleelx.
```

換字式暗号です。`a`や`the`、`to`は変換できるので地道にやれば解けます。

```
TSUYOSHI SENT A LOVE LETTER TO KANAKO FOR CHRISTMAS. TSUYOSHI LIKES CTF, SO HE USED THE FLA_ TO E__RESS MY AFFECTION. THE LOVE LETTER _AS IMCTF{EYE_LOVE_YOU_KANAKO_YEAAAAH}. KANAKO _AS SHOCKED AND TOSSED THE LOVE LETTER.
```

## rev
### nin nin pdf
> 「にんにん！拙者は忍者ハットリくん！今宵、秘密の暗号を雪の中に隠したぞ！」

PDF Stream Dumper Parserで読み取ると、Base64エンコードされた文字列があったので、それをBase64デコードしました。

### become monkey🐒
> カオスエンジニアリングを実践しましょう。さあ、今から Failure Injection Testing を始めます。皆さんにはこれからおサルさんになってもらいます。え？何ですか？「Chaos Monkey」っていうツールがあるんですか？知りません。とりあえず今すぐできることをやってください。

Exceptionをたくさん出せば良いです。

- Zero Division
  - ゼロ除算すれば良いです
- Format Error
  - 文字列を入力すれば良いです
- Overflow
  - 巨大な数字を入力すれば良いです

## おわりに
今回はチームメンバがシュッとFlagを通してくれたので本当によかったです。

それと、BugHunterの称号をいただきました。

![](https://i.imgur.com/wzoNgq4.png)

問題数が多くて非常に楽しめました。
ありがとうございました！
