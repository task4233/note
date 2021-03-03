---
date: 2021-03-02
description: 'あさかつ'
category:
 - 朝活
---

# はてブのテック系記事の雑談をする会におけるログ
## day13
### 扱ったトピック
・https://publickey1.jp/blog/21/rpapower_automate_desktop_for_windows_10microsoft_ignite_2021.html
→Win10環境での自動化が捗りそう
・https://japanese.engadget.com/dji-fpv-140358933.html
→VRでドローンを操縦すると鳥の気分になれるんだろうか
・https://qiita.com/e99h2121/items/ea5822922d83d00ebc4a
→GitLab社内でまとめられた、リモートワークの中でも生産性高く働くための事項集の紹介
・https://coliss.com/articles/build-websites/operation/work/eagle-ver2.html
→ファイル管理ツールのオススメ記事なのだけど、私はGoogleDriveで十分な気がしてる
・https://qiita.com/angel_p_57/items/ca643138ed9902f7bf1e
→公開鍵暗号の解説動画を対象に、曖昧な表現や誤った表現を指摘して修正している記事。こういう記事は誤った理解を直せる機会になるので凄く好き

### 関連リンク集
・https://about.gitlab.com/handbook/
→リモートワークでも生産性高く働くためのTipsがまとめられたGitLabのドキュメント
・https://flow.microsoft.com/en-us/desktop/
→PowerAutomateDesktopのダウンロードはこちらから

## day12
### 扱ったトピック
 - [ビックカメラ、容量無制限のクラウドサービス「Bic CLOUD」](https://watch.impress.co.jp/docs/news/1309262.html)
   - どこの層をターゲットにしたいのか疑問
 - [ヤマトの「クロネコマーク」、4月にデザイン変更。1957年以来初](https://watch.impress.co.jp/docs/news/1309215.html)
   - 変わるらしい
 - [本企画での色覚検証について](https://events.z-holdings.co.jp/tougou/color.html)
   - 経営統合関連で注目度が高まったという印象
 - [システム過負荷でなぜATMにトラブルが？　みずほ銀システム障害、運用面の課題あらわに](https://www.itmedia.co.jp/news/articles/2103/02/news057.html)
   - 原因はデータ移行処理と月末処理によるシステムへの負担
 - [POSIX準拠シェルスクリプトでマルチコアの能力を活用する並列処理の実装（最大並列数あり、GNU Parallel, xargsなし）](https://qiita.com/ko1nksm/items/ed2781b2373f518945c8)
   - 知見多めの記事。exit 130 = 128 + 2 = kill(シグナル番号2)というのを初めて知った。

### 関連リンク
 - https://twitter.com/nagise/status/1366540966673281030?s=20
   - 時代の流れ
 - [コマンドラインツールを書くなら知っておきたい Bash の 予約済み Exit Code](https://qiita.com/Linda_pp/items/1104d2d9a263b60e104b)
   - Bashの予約済みExitCode
 - [Unix Exit Code 137 143](https://hondou.homedns.org/pukiwiki/index.php?Unix%20Exit%20Code%20137%20143)
   - UNIX Exit Code 143の意味するところ

## day11
### 扱ったトピック
 - [みずほ銀行 ATMシステム障害 復旧作業終わり稼働始める](https://www3.nhk.or.jp/news/html/20210301/k10012890751000.html)
   - 午前7時からATMを稼働させてトラブルは起きていないとのこと
 - [アジャイルと契約 / Agile Contracts](https://speakerdeck.com/fkino/agile-contracts)
   - アジャイル開発だと契約とズレてしまいがちなので、というお話
 - [grepでは困難な、特定文字列の存在行から別の文字列が存在する行までの抽出 (Perlのflip-flop演算子の使い方)](https://kiririmode.hatenablog.jp/entry/20210226/1614351599)
   - sed(awk)でもこの記事の内容なら実現できそう
 - [A Vim Guide for Advanced Users](https://thevaluable.dev/vim-advanced/)
   - :marksは使ったことが無かった

### 関連リンク集
 - [Rebuild](https://rebuild.fm)
   - IT系のpodcast

## day10
### 扱ったトピック
 - [TrelloのDescription欄だけでUIを超えた手触りが良すぎて学びしかない](https://blog.hirokiky.org/entry/2021/02/27/104744)
   - 要件定義で機能を決めてから別個で実装してるのかな
 - [🦜Goのプロジェクト構成の基本](https://zenn.dev/nobonobo/articles/4fb018a24f9ee9)
   - GOPATH以下にプロジェクトを置く必要はない
 - [Microsoft、「新しいWindows」を4月に発表か](https://iphone-mania.jp/news-350046/)
   - Macに寄せてきてる気が
 - [PDFのコピペが文字化けするのはなぜか？～CID/GIDと原ノ味フォント～](https://slideshare.net/trueroad_jp/pdfcidgid)
   - これは知見
 - [総務省、無料の社会人データサイエンス入門を再び開講](https://ledge.ai/soumu0227/)
   - そこまで魅力的には見えなかった
 - [競技プログラミングコンテスト「AtCoder」アルゴリズム実技検定初の公式テキストが登場](https://jp.techcrunch.com/2021/02/27/atcoder-practical-algorithm-skill-test-book/)
   - 目次を見た限り中身は基本的な内容が多そう
 - [ビル・ゲイツ、「iPhoneよりAndroidが好き」と明かして理由を語る](https://japanese.engadget.com/bill-gates-preference-android-over-i-phone-035009710.html)
   - どっちもあまり詳しくないので何とも言えない
 - [Twitterが同社初となる有料クリエイターサブスク機能「スーパーフォロー」発表、サービスの構造が劇的に変わる可能性](https://jp.techcrunch.com/2021/02/27/2021-02-25-twitters-super-follow-creator-subscription-takes-shots-at-substack-and-patreon/)
   - 流行るか否かは業界によりそう
 - [Googleの無料サービス「Dialogflow」ノーコードでLINEチャットボットに挑戦：Dialogflowやってみた記事5選](https://ledge.ai/development-try-0227/)
   - パネルプログラミングでチャットボットが作る話だった
 - [UTMを使ってM1 MacにUbuntu20.04をインストールして、その中でDockerを動かして、その中でUbuntu20.10を動かしてみる](https://qiita.com/akase244/items/726edbdd10085198f61f)
   - やってみた系記事

## day9
### 扱ったトピック
 - [数学が好きな人を好きな人のための数学基礎知識](https://slideshare.net/nisei/ss-241772408)
   - 技術を使うために基礎的な数学用語はできると良いよね
 - [パーツの交換・修理が簡単に行えるモジュール交換式ノートPC「Framework Laptop」が登場](https://gigazine.net/news/20210226-framework-laptop/)
   - 拡張カードシステムという発想が面白い。接続部の耐久性が少し気になるところ
 - [私なりの技術書の読み方](https://blog.hanhans.net/2021/02/26/how-to-read-a-book/)
   - 時間を決めて読むのが良いというのは同意できる
 - [磁気スプレーで対象を超小型ロボットにする技術　体内に薬を届けた後、自己分解も](https://itmedia.co.jp/news/articles/2102/26/news107.html)
   - 実用化されたら凄そう
 - [VM環境のCPU仮想化はどうやって実現しているのか
ハードウェア仮想化支援機構の仕組み](https://logmi.jp/tech/articles/323956)
   - 再読。記事の更新があったらまた読みたい

### 関連リンク集
 - [Pomodoro Tracker](https://pomodoro-tracker.com/?lang=ja)
   - ポモドーロ・テクニックに基づいたタイマー

## day8
### 扱ったトピック
 - [メルカリ、「無意識（アンコンシャス）バイアス ワークショップ」の社内研修資料を無償公開](https://about.mercari.com/press/news/articles/20210225_unconsciousbiasworkshop/)
   - バイアスにも色々あることを再確認した
 - [VM環境のCPU仮想化はどうやって実現しているのか
ハードウェア仮想化支援機構の仕組み](https://logmi.jp/tech/articles/323956)
   - センシティブな命令=仮想CPU上では実CPUと動作を変えなければいけない命令のことって定義されてた。見逃してた
 - [Node.js Native ESM への道 〜最終章: Babel / TypeScript Modules との闘い〜](https://slideshare.net/teppeis/nodejs-esm-final-season)
   - CJS Interopというワードを初めて知った
 - [iPhoneのアプリアイコンを一気に移動させる鮮やかな方法が話題に](https://iphone-mania.jp/news-349612/)
   - 便利
 - [Pythonやデータサイエンティスト入門が無料に](https://ledge.ai/meti-learning-0225/)
   - 初学者向けかな
 - [無料で使える開発に役立つサービスをまとめた「free-for.dev」レビュー、埋もれたサービスも発掘可能](https://gigazine.net/news/20210225-free-for-dev/)
   - フリーのツールを使いたいときに便利そう

## day7
### 扱ったトピック

- [格安SIM/格安スマホのIIJmio｜新プラン【ギガプラン】登場！](https://pr.iijmio.jp/gigaplan/)
  - 5Gも使える割になかなか安い
- [「いったんメモ帳に貼って再コピペ」消滅か。次期Windows 10に書式なしテキスト貼付機能](https://internet.watch.impress.co.jp/docs/yajiuma/1308379.html)
  - Windows10でコピペする時に、書式が無効化されるのはありがたい
- [文系パパエンジニアが放送大学等でコンピュータサイエンス・数学を学んで理系学士を取りに行く話](https://wbspry.hatenablog.com/entry/2021/02/24/111912)
  - 最近は働きながらCSの学士を取りに行く方が増えているんだなという印象がある
- [PCで「→」マークを簡単に入力できる方法がタメになると話題に　「知らなかった」「1発で変換された」](https://nlab.itmedia.co.jp/nl/articles/2102/24/news143.html)
  - Macのz+kやz+lは知っていたけど、これは知らなかった
- [M1搭載Macで「SSDの寿命が縮むほど異常な量のデータ読み書きを確認した」という報告](https://gigazine.net/news/20210224-m1-mac-excessive-ssd-wear/)
  - 物によってはM1搭載のMacにおいて、SSDで異常な量の書き込みが行われているとのこと
- [リモートワークは百害あって一利なし？ オフィスワークに戻る企業、ハイブリッドを模索する企業、ワクチン普及後の働き方](https://news.yahoo.co.jp/articles/48905760dc1da31f034b9573c97bcdbfd7cb6179)
  - リモートワークの欠点として挙げられている「寂しさ」を解消する手段として、ClubHouseは適しているんだなという気がした

## Day6
### 扱ったトピック
 - [Webエンジニアが勉強できるGit Repository 10選](https://qiita.com/hedrall/items/177eb850c4c054146321)
   - developer-roadmapやawesomeはフロント以外の業界でも見るね
 - [取り返しのつかない我がエンジニア人生よ](https://anond.hatelabo.jp/20210223235037)
   - ポエムでした
 - [情報工学部の学生にはMacとWindowsのどちらが適していますか？](https://jp.quora.com/%E6%83%85%E5%A0%B1%E5%B7%A5%E5%AD%A6%E9%83%A8%E3%81%AE%E5%AD%A6%E7%94%9F%E3%81%AB%E3%81%AFMac%E3%81%A8Windows%E3%81%AE%E3%81%A9%E3%81%A1%E3%82%89%E3%81%8C%E9%81%A9%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99)
   - 最近はWindowsならWSL2、MacOSはBSDベースのUNIXなので、使いたい方を使えばいいかなと思った
 - [テスラ株が４営業日続落、年初からの上昇を帳消し](https://www.bloomberg.co.jp/news/articles/2021-02-23/QOZ49IT0AFB401)
   - 1月ごろの報道では総資産19兆円とのことだったので、1.6兆円の損失はそこまでひびいていないのかもしれない
 - [着陸時の動画や火星の風の音。NASA探査車「Perseverance」新たなデータ公開](https://sorae.info/space/20210223-perseverance.html)
   - 意外と綺麗に見えていて、データ圧縮を工夫しているんだろうなと思った

### 関連リンク集
 - [Hacking: 美しき策謀 第2版 ―脆弱性攻撃の理論と実際](https://www.amazon.co.jp/dp/4873115140)
 - [sindresorhus/pure](https://github.com/sindresorhus/pure)
   - 高速で軽量なzshテーマ

## Day5
### 扱ったトピック
 - [IPアドレスに縛られない新しい通信識別技術と既存のインターネットが共存するための国際規格が発行されました](https://www.meti.go.jp/press/2020/02/20210222002/20210222002.html)
   - 欲しいデータ／コンテンツを取得する際に「場所（IPアドレス）」を指定して取りに行くのではなく、データ／コンテンツの「名前」を指定して取りに行く新しいネットワーク技術と、既存のインターネットが共存するための国際規格が発行されました
   - この国際規格により、Society5.0 を支える重要な基盤要素であるIoTにおけるデータ通信が効率化され、様々な産業分野でデジタル化が促進されることが期待されます
   - IoT関連の国際規格が発行されたとのこと。詳細は今後追います
 - [「ChromeはmacOS上でSafariの10倍もメモリを食う」という実験結果](https://gigazine.net/news/20210222-browser-memory-chrome-safari/)
   - Macにおける最低のメモリ使用量が落ちてきているので意外と気にしなくても良い？
 - [LEXUS、助手席でゲームが遊べるPC/液晶完備のゲーマー向けセダン](Macにおける最低のメモリ使用量が落ちてきているので意外と気にしなくても良い？)
   - ここでリモートワークすると快適だったりするのかな
 - [イオン銀行に不正アクセス、個人情報2062件が流出　情報管理用クラウドツールで設定ミス](https://www.itmedia.co.jp/news/articles/2102/22/news129.html)
   - 昨日、財団のお話で聞いていた内容で、使っている人は今一度設定を見直した方がいいかもしれない
 - [Clubhouseを“盗聴”できるアプリがGitHubで公開される](https://pc.watch.impress.co.jp/docs/news/yajiuma/1307813.html)
   - 盗聴される危険を意識しながら話すことが重要かもしれない

### 関連リンク集
 - [Twitterが音声によるソーシャルネットワーク機能「Spaces」のベータテストを開始](https://jp.techcrunch.com/2020/12/18/2020-12-17-twitter-launches-its-voice-based-spaces-social-networking-feature-into-beta-testing/)
   - FF内のみの関係で話せるClubhouse的なツール

## Day4
### 扱ったトピック
 - https://qiita.com/takobaya391076/items/49b15c1fa36734b3fa53
   - 野菜ジュース等を選択肢に入れると結果が変わりそう
 - https://jaguchi.com/blog/2021/02/wtf-is-oss/
   - OSSはツールとして使うだけでなく、コードの書き方が学べる資料として使うことが多い気がした
 - https://iphone-mania.jp/news-348654/
   - RAMの使用量が多くなる理由の説明が薄い気がした

### 関連リンク集
 - https://github.com/servo/servo
   - Rustで書かれた研究用のブラウザ。最初はcomponents/script下を読むと良さそう
 - https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html
   - Rustで簡易的なレンダリングエンジンを構築する記事。

## Day3
### 扱ったトピック
 - https://gigazine.net/news/20210220-getting-better-linux-10-project/
   - 2つ目でシェル実装していたのが気になってソースコードを見ると、cdコマンドはosパッケージ、他のコマンド実行はexecパッケージのCommandを使って中身のシェルに実行させてるだけだった
 - https://dev.classmethod.jp/articles/static-file-hosting/
   - AWSのお話をしていた。SAA良さそう。

### 関連リンク集
 - https://aws.amazon.com/jp/certification/
   - AWSの試験を受けるならこれ

## Day2
### 扱ったトピック
 - https://logmi.jp/business/articles/323771
   - 中年がいなかったのでスキップ
 - https://smoozapp.com/blog/2021/02/19/user_data_report/
   - 意外と他のアプリでも情報は抜き取られているよね
 - https://itmedia.co.jp/news/articles/2102/19/news140.html
   - できました
 - https://shoeisha.co.jp/campaign/award/2021/result/
   - けんちょん本の話から派生して競プロの話をした

## Day1
### 扱ったトピック
 - EXPERIENCE JAPAN PICTOGRAMS
   - https://experience-japan.info
 - COCOA、修正版配布も課題残る　「Androidは1日1回アプリの再起動を」「iOSは最新の14に」
   - https://itmedia.co.jp/news/articles/2102/18/news160.html
 - Effetive Remote Working - Speaker Deck
   - https://speakerdeck.com/iwashi86/effective-remote-working-f8421bbb-a932-4ac6-a1c3-4b54ff2cf920
### 関連リンク集
 - https://developer.android.com/guide/components/services?hl=ja
   - AndroidアプリにはServiceというコンポーネントがありバックグラウンド処理に用いられる
 - https://developer.android.com/training/monitoring-device-state/doze-standby?hl=ja
   - Android6.0から利用できるDozeモードではネットワークアクセスが制限されるため、Dozeモードから復旧した際の処理を実装する必要がある
