---
date: 2022-07-18
description: '#nazotokiCTF Writeup'
tags:
 - CTF
---

# nazotokiCTF Writeup
2022/07/17〜18にかけて開催された[#nazotokiCTF](https://ctf.nazotoki.tech/)に参加して全完したのでWriteupを書きます。

## nazotokiCTF概要
[のみぞう](https://twitter.com/nomizooone)さんが個人で開催してくださったCTFです。閃きで解ける問題が多かったですが、ヒントが用意されていたので気付けるような構成になっていたと思います。

以下Writeupです。

## Tutorial
### Welcome
> 初心者の方向けに練習の場をご用意しました（ガチ勢の方もしばしお付き合いください）
このCTFでは問題を解く中で例のような文字列が手に入ることがあります。これを「フラグ」と呼びます。
例：nazotokiCTF{ナゾトキ}

問題で与えられています。

**ナゾトキ**

## Riddle - Fire elements
### おひつじ座
> あなたが目指しているものの間を読め

あなた(=高橋 ピヨ彦)が目指しているものは、プロローグページより**セキュリティ業界の星**であることがわかります。

プロローグページに行くと、上下で⭐️に囲まれている画像があります。

![ai-intro](https://user-images.githubusercontent.com/29667656/179444946-14b283b3-168e-452a-a363-f446ae49ff81.png)

それらの間の文字を読むとハンドルとなります。

**ハンドル**

### しし座
> ルールを守れ

ルールページに **大切なルール** が以下の通り書かれています。

> 燃えるゴミは捨ててください  
ペットボトル

謎解きあるあるですね。

- 「モエルゴミ」 を捨てる
- 「ペットボ」 取る

と読み取れるので、これらの文字を消すと**チーター**になる。

![leo.png](https://user-images.githubusercontent.com/29667656/179442077-9499ed6e-7f50-4ce8-ae34-59d3aceeddc9.png)

**チーター**

### いて座
![sagittarius2](https://user-images.githubusercontent.com/29667656/179442165-de36d53d-1dca-4ab9-8092-f2cba32fc08f.png)

閃くだけです。

- **イースト** = トウ
- ウエスト = ザイ
- サウス = ナン
- ノース = ボク

**イースト**

## Knowledge - Earth elemtnts
### おうし座
> 2021年に行われた、コンピューターウイルス「emotet」のテイクダウン作戦の名前を日本語で言うと？「○○○○ムシ作戦」

"emotet ムシ"でググると分かります。

> 作戦名は「てんとう虫」

[最も危険なマルウエア「Emotet」が壊滅、アジト急襲のウクライナ警察が見たもの](https://xtech.nikkei.com/atcl/nxt/column/18/00676/030500073)

**テントウ**

### おとめ座

> Webアプリケーションのセキュリティ分野の研究・ガイドラインの作成・脆弱性診断ツールの開発・イベント開催などの活動をしているオープンソースソフトウェアコミュニティの名称の読み方をカタカナ4文字で答えよ。

[OWASP TOP Ten](https://owasp.org/www-project-top-ten/)とかで有名。

**オワスプ**

### やぎ座
> ある数 x を数 b のべき乗bᵖとして表した場合のpのこと。logとも呼ばれるこの数を日本語で何というか？カタカナ4文字で答えよ。

**タイスウ**

## Web - Air elemtnts
### ふたご座
valueをDevToolsを開いて `dioskouroi` を埋め込み `SUBMIT` を押します。

![ok](https://user-images.githubusercontent.com/29667656/179442580-22bba4f8-7175-4ec1-9bd1-a88dbd1d7c52.png)

**ナイーブ**

余談ですけど、POSTではなくGETリクエストだったので、[https://gemini.ctf.nazotoki.tech/check.php?realPassword=dioskouroi](https://gemini.ctf.nazotoki.tech/check.php?realPassword=dioskouroi) でもFlagが取れますね。

### てんびん座
User-Agentを `stardustChrome` に書き換えれば良いです。

```bash
$ curl https://libra.ctf.nazotoki.tech/ -H "User-Agent: stardustChrome"
<!DOCTYPE html>
<html lang="Ja">
  <head>
    <!-- Document Meta-->
    <meta charset="utf-8"/>
    <!-- Stylesheets-->
    <link href="assets/css/vendor.min.css" rel="stylesheet"/>
    <link href="assets/css/style.css" rel="stylesheet"/>
    <!-- 
    Document Title
    ============================================= 
    -->
    <title>Libra</title>
  </head>
  <body class="bg-gray">
  <section id="libra">
        <div class="container">
          <div class="row clearfix">
            <div class="col-12 col-md-12 offset-md-1 col-lg-8 offset-lg-1">
            <h2 class="heading--title">Libra</h2>
            <h6>リクエストヘッダー情報</h6>
            <p>
                フラグは<code>stardustChrome</code>という特殊なブラウザでしか閲覧できません。
            </p>
            <p>
                X-Forwarded-For:***.***.***.***<br>X-Forwarded-Proto:https<br>X-Forwarded-Port:443<br>Host:libra.ctf.nazotoki.tech<br>X-Amzn-Trace-Id:Root=1-62d4e1a2-6c741bea2a9eb7a70a0d3d73<br>accept:*/*<br><br />確かにstardustChromeを使ってるね。フラグをどうぞ！ <br />nazotokiCTF{<code>クローン</code>} <br />
            </p>
            <a href="/" onclick="window.location.reload();">再読み込み</a>
            </div>
          </div>
        </div>
      </section>
  </body>
</html>
```

**クローン**

### みずがめ座
トップページに社員番号99のアイがいたことを思い出します。また、パスワードがpasswordなので、`99`/`password`で検索します。

![1st](https://user-images.githubusercontent.com/29667656/179442950-29c03951-b9ee-427e-aa96-1a3a7ed3c975.png)

> フラグのヒントはナンバー9999に載せておいたよ！入社前情報だから普通のパスワードでは見れないかもね。

フラグのヒントは9999の社員情報を見れば良いらしいです。

`9999`/`'`で検索。

> Fatal error: Uncaught PDOException: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''''' at line 1 in /var/www/html/index.php:68 Stack trace: #0 /var/www/html/index.php(68): PDOStatement->execute() #1 {main} thrown in /var/www/html/index.php on line 68

SQL Injectionが刺さりそうです。

`9999`/`' OR 1=1 -- `で検索。

> nazotokiCTF{この候補者の苗字}

苗字はプロローグに書かれていました。

> ぼくの名前は「高橋 ピヨ彦（タカハシ ピヨヒコ）」。

**タカハシ**

## Misc - Water elements
### かに座
> 仲間はずれを探せ

zipファイルを解凍します。fileコマンドでそれぞれのファイルを確認すると仲間外れのファイルがあるので中身を見るとFlagが入っていました。

```bash
$ unzip cancer.zip
$ file `find . | xargs`
.:                                  directory
./b9c94e8a87e3647c5a0fa4ff358ecc65: pcapng capture file - version 1.0
./550eadb88a230018bf043d1b6ad15863: pcapng capture file - version 1.0
./f8a5c386478fa64f118056b82acc31d2: pcapng capture file - version 1.0
./f0525aafa095ed2665d03681537a70ea: UTF-8 Unicode text
./397cbf6db9d7ae6906ae420aedc5346c: pcapng capture file - version 1.0
./44ca0844398b2d010d8cd4a31ddb023d: pcapng capture file - version 1.0
./a0678bcea04dbd6852c219062ab2bb3c: pcapng capture file - version 1.0
./4de447a391e32baeb5a52c55aa14467b: pcapng capture file - version 1.0
./0961db32a59b8a83c1996498f9d1d80e: pcapng capture file - version 1.0
./635cbc8a5dc1a528c3b5cb9eecdc1086: pcapng capture file - version 1.0
./7463543d784aa59ca86359a50ef58c8e: pcapng capture file - version 1.0
./7c70e2cb2b4a13c4590f6b15c30385fd: pcapng capture file - version 1.0
./766cc4dd4d5005652e8514e3513683f8: pcapng capture file - version 1.0
$ cat f0525aafa095ed2665d03681537a70ea 
(snip)
nazotokiCTF{イイワケ}
```

**イイワケ**

### さそり座
画像を拡大します。白い文字で**カクダイ**と書かれています。

![ok](https://user-images.githubusercontent.com/29667656/179443334-75892baf-7ddf-414d-8eb9-f46765b0bf80.png)

**カクダイ**

### うお座
> みずがめ座からてんびん座に向かうとき、ひみつの鍵が手に入るだろう。水の中に浮かぶ真実を見定めよ。

解いていた他のpro曰く、**みずがめ座からてんびん座に向かう** と書かれているので、`Referer` を `aquarius.ctf.nazotoki.tech` にしててんびん座にHTTPリクエストを送るらしいです。

```bash
$ curl -H "Referer: aquarius.ctf.nazotoki.tech" https://libra.ctf.nazotoki.tech/
<!DOCTYPE html>
<html lang="Ja">
  <head>
    <!-- Document Meta-->
    <meta charset="utf-8"/>
    <!-- Stylesheets-->
    <link href="assets/css/vendor.min.css" rel="stylesheet"/>
    <link href="assets/css/style.css" rel="stylesheet"/>
    <!-- 
    Document Title
    ============================================= 
    -->
    <title>Libra</title>
  </head>
  <body class="bg-gray">
  <section id="libra">
        <div class="container">
          <div class="row clearfix">
            <div class="col-12 col-md-12 offset-md-1 col-lg-8 offset-lg-1">
            <h2 class="heading--title">Libra</h2>
            <h6>リクエストヘッダー情報</h6>
            <p>
                フラグは<code>stardustChrome</code>という特殊なブラウザでしか閲覧できません。
            </p>
            <p>
                X-Forwarded-For:***.***.***.***<br>X-Forwarded-Proto:https<br>X-Forwarded-Port:443<br>Host:libra.ctf.nazotoki.tech<br>X-Amzn-Trace-Id:Root=1-62d3d2c3-76d89c6a1b4e720760dac34b<br>user-agent:curl/7.64.1<br>accept:*/*<br><br />遠いところをよくおいでくださいました。ひみつの鍵を差し上げます。 
<pre>-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAunVG5a8SbXgsayNWhd4f9FYsWb8z57P2Ql8Yq+fQgq0Y2xcH
/HgHO0vZrgSbjFLxnpx4D9arOtvGdn06GLZcL3eU32jPvqVh8QhqmaQ8bdUDlEp8
yt45DMoleYflw8c9q2dDsRjLUoE2qhtMm2xR8B9U+mRq+vVgEJdvNMgmn+XtsmRx
A41n3nHTfTcOznZaNRxyAqZjooDOuUoVBStJVUqbd4a3EzMCBbdAzyQ2VdQEigT0
PVstPiMI0draaO9oKlZkfuGkJJ3Ftn8+A4cjIG8ycihsGqfEMSVUpLmUI+Etb0+C
3iD+B7P25v0CDNdD2odWIRipjdE8TmuTA+AsuQIDAQABAoIBAQCBCSw5Q4EzNNk4
g8oa9m+SvhgPO90F2mrv37PJM7H+3R+4byXduIr4pDNO1G15HOWNaKdF/r+dCf88
fMk51OnTB6SFP5mVTAqNrc9n6FrRf3rsoufd1RASI8rvYfbGGBo7hkk4Q/phbH6S
FjZb0QibbnN2nQvUBP+oO8R/+IuSV3NgxvtQ3CggRnqTiwx99kHO3gEXJVHozq09
mceaWIQeT6jAf5nMsNKl2YlBxomMkeXZ8jEcCJQcAPuHJjZ2SJmLpbADIffg/c95
oaLejnoEWUflnN/QPw7shHE2F50uKyEYAh5uNCjVHRQE15jUOQZBr5aLMtpyCkfJ
3bPrzFcBAoGBAOyEMyBBwAh2Kuk+QS9OCsFcxjTQPV/jkHnk2nU8I7xrO0MqONOL
/ily+GcbTrY4bx8zkIKuYwEAp/5Mybd+C/kRsjeSGZVrNxNDNG32JYTn49Z1miKv
jNMGUJsfOoKI6G1gKnI3j5WlP2E+xXtQkJUMwqj5vdafCTVJhWrucFyxAoGBAMnR
ave7rOChNxVEoS7YmwMUSEk/PlM4MLkv7WkOPdNATxZ2u5fj8RrHfI4pGt//QXUX
pI0dE6Y8ndM24YhynvqGYr8cyygBj+BpMZFXSFmf2ozRTawFbo2IgqqsZ6AszQVb
EUuq5k5mx5Mg+ilMMzTmxjL4AD5GRy/2ofYK5DKJAoGACdhW6HjULYX9s0fMHtP4
zqO1/GzOoTcvxGMqVMb0FdvA08LmKqghJEiM3n3cgOlIdtwGn+nyZRBJ7eP0YZb1
mKCL8pQ6TGXyHPMnM4yTczzT1xF+IQN9sSsKH+rk3JomUqc2HRsC9w+x27JpNgDc
g9fMIoyCwnRMRdORoinas4ECgYAausnYFdtHxRJulrBia/3b4ovQZ7fxfbe2T0q6
Z1B48kOHTiJ6c44zZchxa7BLips4zvDUX82CbvTYTKSCVewIclQRy9Z8bfiIWGZg
QZcrh6iCjhYjenSx+iqUQFFZPZXJ583an7/xElvMeMmpPpZpo0cM6RvfI5+6EohQ
9hBTQQKBgQCBiu+qiElJXJUTrwr3XESHUEsCPz27VWViYlj/n6GsY80QSf4Y1F0d
ynDDCJ4zE0FL1WfFFGMqaE86wvQZwvv9NCqSkpxhfbYhf/lKUmyNIyqoQYkV7kAK
NjQ0gdNlw4NLioSXny6/0k5G4OIzwh8QNf38sZGKhm7FMVQ4G8r1Yw==
-----END RSA PRIVATE KEY-----</pre>
                                    </p>
            <a href="/" onclick="window.location.reload();">再読み込み</a>
            </div>
          </div>
        </div>
      </section>
  </body>
</html>
```

RSAの秘密鍵が手に入る。配布ファイルの `password.enc` をRSAで復号する。

```bash
$ cat key
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAunVG5a8SbXgsayNWhd4f9FYsWb8z57P2Ql8Yq+fQgq0Y2xcH
/HgHO0vZrgSbjFLxnpx4D9arOtvGdn06GLZcL3eU32jPvqVh8QhqmaQ8bdUDlEp8
yt45DMoleYflw8c9q2dDsRjLUoE2qhtMm2xR8B9U+mRq+vVgEJdvNMgmn+XtsmRx
A41n3nHTfTcOznZaNRxyAqZjooDOuUoVBStJVUqbd4a3EzMCBbdAzyQ2VdQEigT0
PVstPiMI0draaO9oKlZkfuGkJJ3Ftn8+A4cjIG8ycihsGqfEMSVUpLmUI+Etb0+C
3iD+B7P25v0CDNdD2odWIRipjdE8TmuTA+AsuQIDAQABAoIBAQCBCSw5Q4EzNNk4
g8oa9m+SvhgPO90F2mrv37PJM7H+3R+4byXduIr4pDNO1G15HOWNaKdF/r+dCf88
fMk51OnTB6SFP5mVTAqNrc9n6FrRf3rsoufd1RASI8rvYfbGGBo7hkk4Q/phbH6S
FjZb0QibbnN2nQvUBP+oO8R/+IuSV3NgxvtQ3CggRnqTiwx99kHO3gEXJVHozq09
mceaWIQeT6jAf5nMsNKl2YlBxomMkeXZ8jEcCJQcAPuHJjZ2SJmLpbADIffg/c95
oaLejnoEWUflnN/QPw7shHE2F50uKyEYAh5uNCjVHRQE15jUOQZBr5aLMtpyCkfJ
3bPrzFcBAoGBAOyEMyBBwAh2Kuk+QS9OCsFcxjTQPV/jkHnk2nU8I7xrO0MqONOL
/ily+GcbTrY4bx8zkIKuYwEAp/5Mybd+C/kRsjeSGZVrNxNDNG32JYTn49Z1miKv
jNMGUJsfOoKI6G1gKnI3j5WlP2E+xXtQkJUMwqj5vdafCTVJhWrucFyxAoGBAMnR
ave7rOChNxVEoS7YmwMUSEk/PlM4MLkv7WkOPdNATxZ2u5fj8RrHfI4pGt//QXUX
pI0dE6Y8ndM24YhynvqGYr8cyygBj+BpMZFXSFmf2ozRTawFbo2IgqqsZ6AszQVb
EUuq5k5mx5Mg+ilMMzTmxjL4AD5GRy/2ofYK5DKJAoGACdhW6HjULYX9s0fMHtP4
zqO1/GzOoTcvxGMqVMb0FdvA08LmKqghJEiM3n3cgOlIdtwGn+nyZRBJ7eP0YZb1
mKCL8pQ6TGXyHPMnM4yTczzT1xF+IQN9sSsKH+rk3JomUqc2HRsC9w+x27JpNgDc
g9fMIoyCwnRMRdORoinas4ECgYAausnYFdtHxRJulrBia/3b4ovQZ7fxfbe2T0q6
Z1B48kOHTiJ6c44zZchxa7BLips4zvDUX82CbvTYTKSCVewIclQRy9Z8bfiIWGZg
QZcrh6iCjhYjenSx+iqUQFFZPZXJ583an7/xElvMeMmpPpZpo0cM6RvfI5+6EohQ
9hBTQQKBgQCBiu+qiElJXJUTrwr3XESHUEsCPz27VWViYlj/n6GsY80QSf4Y1F0d
ynDDCJ4zE0FL1WfFFGMqaE86wvQZwvv9NCqSkpxhfbYhf/lKUmyNIyqoQYkV7kAK
NjQ0gdNlw4NLioSXny6/0k5G4OIzwh8QNf38sZGKhm7FMVQ4G8r1Yw==
-----END RSA PRIVATE KEY-----
$ cat password.enc | openssl rsautl -decrypt -inkey key
The password for the zip is "fomalhaut".
$ unzip -P fomalhaut encrypt-pisces-new.zip
Archive:  encrypt-pisces-new.zip
  inflating: pisces.jpg
$ file pisces.jpg
pisces.jpg: PNG image data, 1272 x 350, 8-bit/color RGBA, non-interlaced
```

画像データのようなので見る。一緒に解いていたproによると、

![pro](https://user-images.githubusercontent.com/29667656/179443496-ab8ab8e8-313a-4b3a-8fab-234c15f78927.png)

らしいので、寄り目します。

ググると、以下の手順を踏めば見えるようになるとのことです。

0. 対象の画像を全画面で開く
1. 片方の腕を前に伸ばして人差し指を立て、その先端を両目で見る
2. 指の先端を鼻に近づけつつ、目は指の先端を見続ける
3. 目線を変えず、指を下に降ろして最初に開いていた画像をぼんやり見る

30分ほどYouTubeのレクチャーに従って練習したら解けました。私は乱視なので見るのに苦労したが何とか解けました。謎解きって感じですね。

## 2nd Challenge
### へびつかい座
> 最終問題に進むためのフラグを導く魔法の解答用紙をご用意しました（謎解きによくあるやつ）

AnswerSheetには数字が書かれている。プロローグのページに各星座の番号が付与されているため、その順番に4文字であるFlagを埋め込みます。

|番号|星座名|Flag|
|:-:|:-:|:-:|
|1|おひつじ座|ハンドル|
|2|おうし座|テントウ|
|3|ふたご座|ナイーブ|
|4|かに座|イイワケ|
|5|しし座|チーター|
|6|おとめ座|オワスプ|
|7|てんびん座|クローン|
|8|さそり座|カクダイ|
|9|いて座|イースト|
|10|やぎ座|タイスウ|
|11|みずがめ座|タカハシ|
|12|うお座|ケッパク|

シートでは最初の1文字を見ると書かれていたので、**ハテナイチオクカイタタケ**となリマス。

ハテナはトップページにあるので、それを1億回押せば良いということになります。クリックした時の挙動は、以下の通り、 `hatenaClick()` というJavaScriptで実行されるようです。

```html
<a href="/" class="navbar-brand" onclick="hatenaClick();">
  <img class="img-responsive ctf_logo" src="/files/1651e50fa5f1859f9301e4a8fd185bd6/question.png" height="25" alt="nazotokiCTF～入社試験からの脱出～">
</a>
```

JavaScriptの本体を探すと、ページ上部で以下の通りインポートしているのが分かります。

```html
<script src="/themes/core/static/js/hatena.js"></script>
```

このJavaScriptファイルを見ると、以下の通りFlagが得られます。

```javascript
function hatenaClick(){
    var $count = getCookie( 'nazotoki' );
    if( $count >= 99999999 ){
	alert("nazotokiCTF{ポラリス}");
    }
    if( !$count ){
        setCookie( 'nazotoki', 1, 1 );
    }else{
        setCookie( 'nazotoki', ++$count, 1 );
    }
}

function setCookie( $cookieName, $cookieValue, $days ){
    var $dateObject = new Date();
    var $days = 2; 
    $dateObject.setTime( $dateObject.getTime() + ( $days*24*60*60*1000 ) );
    var $expires = "expires=" + $dateObject.toGMTString();
    document.cookie = $cookieName + "=" + $cookieValue + "; " + $expires + "; domain=.ctf.nazotoki.tech";
}
function getCookie( $cookieName ){
    var $cookies = document.cookie.split(';');
    for( var $i=0; $i < $cookies.length; $i++ ){
        var $cookie = $cookies[$i].trim().split( '=' );
        if( $cookie[0] == $cookieName ){
            return $cookie[1];
        }
    }
    return "";
}

```

**ポラリス**

## Last Challenge
### 最終問題
> パスワードを解け

と書かれています。添付されたURLを開くと以下の通りヒントが提示されています。

> パスワードのヒントは愛の星座の中
流れに従い
太陽と月に背いて心の示す方を読め

**愛の星座** = 社員ナンバー99**アイの星座**

みずがめ座でアイの誕生日は7月18日と提示されているため、**かに座**であることがわかります。

かに座で利用していなかったpcapファイルがたくさんあったので、それらを見ます。

ヒントで **流れに従い** と書かれているので、これらのpcapファイルを並べます。
pcapを眺めるとFTPの通信データのようです。

それぞれのpcapファイルでは`Request: PORT 192,168,3,7,52,197` のようなリクエストから始まっています。それぞれのpcapファイルを見ると、`197` から `208` まで全て存在していることがわかるため、これらを並べます。

並べた後、これらに含まれる画像を見ると、星座の名前が書かれていることが分かります。順番は

- うお座
- やぎ座
- かに座
- てんびん座
- おひつじ座
- みずがめ座
- おとめ座
- しし座
- ふたご座
- さそり座
- いて座
- おうし座

また、最後のヒントによると

> 太陽と月に背いて心の示す方を読め

と書かれています。ここで、1つ前に解いたへびつかい座の問題を思い出します。

太陽と月、そして心(💗)が存在しています。ヒントでは太陽と月に背いて心の示す方を読めと書かれているので、先ほど得られた順番に並べてみます。

|番号|星座名|Flag|
|:-:|:-:|:-:|
|1|うお座|ケッパク|
|2|やぎ座|タイスウ|
|3|かに座|イイワケ|
|4|てんびん座|クローン|
|5|おひつじ座|ハンドル|
|6|みずがめ座|タカハシ|
|7|おとめ座|オワスプ|
|8|しし座|チーター|
|9|ふたご座|ナイーブ|
|10|さそり座|カクダイ|
|11|いて座|イースト|
|12|おうし座|テントウ|

心(💗)は3文字目の列にあるので、**パスワードハスターダスト**となります。

Last Challengeのページで**スターダスト**と入力しても通りません。
英字に直して**stardust**と入力すると、エピローグのページにリダイレクトされ、Flagを取得できます。

**オールト**

## Congratulations!!
### Thank you
アンケート回答後にFlagが得られる形式。以前教えてもらったが、回答する前にFlagを取得することができます。

```bash
$ curl -L https://docs.google.com/forms/d/e/1FAIpQLSfRQck97eWMf3YFLLzhAF14kpyLODVZC2eGCIvhr2xero2dgA/viewform 
(snip)
最後のフラグはnazotokiCTF{アリガト}です。
```

**アリガト**

## 終わりに
過去の問題で利用した情報を活用する、というのはまさに謎解きという感じがして面白かったです。また新たに開催される可能性はあるのでしょうか？楽しみです。

開催ありがとうございました！
