---
date: 2019-02-14
description: 'Reminiscent'
tags:
 - CTF
---

# HackTheBox Forensics Reminiscent Writeup
## 概要

> Suspicious traffic was detected from a recruiter's virtual PC. A memory dump of the offending VM was captured before it was removed from the network for imaging and analysis. Our recruiter mentioned he received an email from someone regarding their resume. A copy of the email was recovered and is provided for reference. Find and decode the source of the malware to find the flag. 

 - キャプチャしたメモリダンプを解析して, マルウェアのソースを見つけてデコードし, フラグを見つけろ
 - 感染経路はメールの添付ファイルっぽい
 - 添付ファイルのついた電子メールのコピーは参照用に提供される

## solve
 - unzipして出てきたファイルは以下の3つ
   - flounder-pc-memdump.elf
   - imageinfo.txt
   - Resume.eml
 - テキストファイルから見てみる
   - PCに関する情報が書かれていた
   - Imageが取られた時間は, `2017-10-14 18:07:30 UTC+0000`
   - localtimeは `2017-10-04 11:07:30 -0700`らしいので, アメリカの西海岸らへんらしい
 - 次にemlファイルを見る
   - emlファイルはM社のメールソフトのファイルに多い拡張子らしい
     - ref: [.eml](https://wa3.i-3-i.info/word13892.html)
   - 拡張子を`.mht`に変えるとIEでも開けるらしい
     - ref: [EMLファイルを開く方法](https://www.wikihow.jp/EML%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E9%96%8B%E3%81%8F)
   - 内容は以下の通り


> Hi Frank, someone told me you would be great to review my resume.. cuold you have a look?
<a href="http://10.10.99.55:8080/rezume.zip">resume.zip</a>

   - どうやらマルウェアは`http://10.10.99.55:8080/rezume.zip`から持ち込まれたっぽい