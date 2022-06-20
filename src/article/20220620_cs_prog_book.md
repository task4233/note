---
date: 2022-06-13
description: 'サイバーセキュリティプログラミング 第2版のメモ'
tags:
 - 記録
---

# サイバーセキュリティプログラミング 第2版のメモ

💡
このメモはサイバーセキュリティプログラミング 第2版の内容や読んだ時の感想を綴るためのメモです。メモなので雑多に書きます。

## 1章: LinuxとPythonの環境構築
- 丁寧

## 2章: PythonによるTCP/UDP/SSH通信
- [Paramiko](https://github.com/paramiko/paramiko)
  - SSHv2プロトコル用のPythonライブラリ

## 3章: Pythonによるネットワークパケットの盗聴
- パケットを盗聴してパースする
- RFCを見れば構造が分かるので、それを元にパースすれば良い

## 4章: Pythonによるパケット閲覧と操作
- [Scapy](https://github.com/secdev/scapy)
  - パケットを操作するためのPythonライブラリ
- Wiresharkで出来ることをPythonで出来る

## 5章: Pythonのライブラリを用いたWebサーバへの攻撃
- [gobuster](https://github.com/OJ/gobuster)
  - Go製のURI, DNS, Virtual Host Name, Amazon S3バケットのブルートフォースツール
- [SVN Digger](https://www.invicti.com/blog/web-security/svn-digger-better-lists-for-forced-browsing/)
  - 辞書攻撃のワードリスト

## 6章: jythonを活用したBurp Proxyの拡張
- [jython](https://github.com/jython/jython)
  - Python2のJava実装
- [Writing your first Burp Suite extension](https://portswigger.net/burp/extender/writing-your-first-burp-suite-extension)
  - Burp Suite Extension拡張に関するPortSwiggerの公式記事

## 7章: GitHubからの命令の取得
- GitHubは開発に利用されることから、ドメインやIPアドレスによってブロックする企業は少ないと考えられる
- ローカルのマルウェアに対する指示をコミットに積んでGitHubにpushすることで、マルウェアはそれをpullして動作する
  - 賢い

## 8章: Windows上での情報収集
- [PyWinHook](https://www.lfd.uci.edu/~gohlke/pythonlibs/#_pywinhook)
  - Windowsにおけるキー入力イベントをトラップできるPythonのライブラリ
- [pywin32](https://github.com/mhammond/pywin32)
  - Windows APIのPythonラッパー
  - スクリーンショット等のためのWindows APIを呼び出すことができる
- [Generating Payloads in Metasploit](https://www.offensive-security.com/metasploit-unleashed/generating-payloads/)
  - シェルコードの生成に利用できる
- サンドボックス検知のために、マシンを起動してからの経過時間と利用者が最後にマシンに入力を行った時間を利用できる
  - マシンを起動してからの経過時間が30分にも関わらず、最後にマシンに入力を行った時間が30分前であれば、マシンに感染してからマルウェアが起動したのではなく、解析用のサンドボックス上で起動したと考えられる

## 9章: 情報の持ち出し
- [PyCryptodome](https://www.pycryptodome.org/en/latest/)
  - 低レベルの暗号化に関する作業のためのPythonライブラリ
- 情報を持ち出す手段
  - Email送信(SMTP)
  - ファイル転送(FTP)
  - *bin系に対するHTTPリクエスト(GET/POST)
    - [PasteBin](https://pastebin.com/)
    - [Request Bin](https://requestbin.com/)
    - SlackBot(付録A)
    - など

## 10章: WMIに着目した権限昇格
- [wmi Tutorial](http://timgolden.me.uk/python/wmi/tutorial.html)
  - Pythonを用いてWMIにアクセスする方法などをまとめたページ
  - Pythonスニペットがたくさんある
- [Windowsにおける権限に関するドキュメント](https://docs.microsoft.com/ja-jp/windows/security/identity-protection/access-control/local-accounts)
- 注目すべき権限

|権限名|詳細|
|:-:|:-:|
|`SeBackupPrivilege`|ファイル/ディレクトリのバックアップ、ACL(Access Control List)に関係なく全てのファイルへの読み取りが可能になる|
|`SeDebugPrivilege`|他のプロセスのデバッグが可能になる|
|`SeLoadDriver`|ドライバのロード/アンロードが可能になる|

## 11章: Volatilityを用いたメモリフォレンジック
- [Volatility3](https://github.com/volatilityfoundation/volatility3)
  - Python製のメモリフォレンジックツール
  - 
- 仮想マシンとメモリ情報が保存される拡張子

|仮想マシンソフト|拡張子|
|:-:|:-:|
|VMware|.vmem|
|Hyper-V|.bin|
|Parallels|.mem|

- [Volatility Workbench](https://www.osforensics.com/tools/volatility-workbench.html)
  - メモリダンプからアーティファクトを抽出するためのコマンドラインメモリ分析およびフォレンジックツール
  - メモリイメージを公開してる？らしいが、パッと見た感じ見つからなかった......

## おわりに
- ソースコードのスニペットが提示されているのはとても良いなと思った
- まだ実際には動かせていないので、必要に応じて動かしたい
