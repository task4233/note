---
date: 2019-01-30
description: 'TodoアプリをRailsで作る過程を綴っていきます.'
category:
 - rails
 - todo
---

# Rails_Todoの製作手順めも
# 12/26
1. rootのToppageの作成
## homeアクションとaboutアクションを追加
$ rails generate controller StaticPages home about
($ rails generate controller {ControllerName} {action_name}+)

```bash
Running via Spring preloader in process 30664
      create  app/controllers/static_pages_controller.rb
       route  get 'static_pages/about'
       route  get 'static_pages/home'
      invoke  erb
      create    app/views/static_pages
      create    app/views/static_pages/home.html.erb
      create    app/views/static_pages/about.html.erb
      invoke  test_unit
      create    test/controllers/static_pages_controller_test.rb
      invoke  helper
      create    app/helpers/static_pages_helper.rb
      invoke    test_unit
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/static_pages.coffee
      invoke    scss
      create      app/assets/stylesheets/static_pages.scss
```

結果, `$rails s`すると, 以下のページにアクセス可能になる。  
 - http://192.168.33.10:3000/static_pages/home
 - http://192.168.33.10:3000/static_pages/about 
## 内容の編集
表示される内容はViewにあたるので, 以下のパスに存在している。  
 - /app/views/static_pages/home
 - /app/views/static_pages/about

## テストの作成
テストは`/test/controllers/`以下に存在する。
```ruby
# test/controllers/static_pages_controller_test.rb
~
test “should get home” do
  # homeページにGETリクエスト
  get static_pages_home_url
  # レスポンスがGREENになるはず
  assert_response :success
end
~
```

テスト駆動開発はテストから作る。
 - リクエストして, 正しくレスポンスされるかを確認する
{get/post} {page_url}
assert_response :success

 - オブジェクトが存在するかを確認
assert_select “{object_name(e.g. title)}”, “{Screening text}”

## 埋め込みRuby
<% … %> := 中に書かれたコードを実行するだけ
<%= … %> := 中に蚊kれたコードの実行結果がそこに挿入される

`provide`メソッドを使用してタイトルをページごとに変更する。
```ruby
app/view/static_pages/*.html.erb
<% provide(:title, “Help”) %>
~
<%= yield(:title) %>
```

ページのレイアウトは`app/views/layouts/application.html.erb`以下に存在している。 これを用いることで, `provide`メソッドを各ファイルで定義し, `yield`メソッドを書く必要がなくなる。

## html5のサポート
```ruby
<!--[if lt IE 9]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/r29/html5.min.js">
  </script>
<![endif]-->
```

## bootstrapの追加
app/assets/stylesheet/custom.scssに, 
@import bootstrap
@import bootstrap-sprockets
を追加

## bootstrapの効果
navbar navbar-fixed-top := nav要素を上に表示
navbar-inverse := 色反転

nav navbar-nav navbar-right := navbar内のnav要素を右に表示

jumbotran := 背景をそれっぽく覆う

## renderメソッドによる分散コーディング
<%= render ‘layouts/hoge’ %>
と書くと, 
app/views/layout/_hoge.html.erb を参照する。

## アセットパイプライン
 - app/assets := 現在のアプリケーション固有のアセット
 - lib/assets := 開発チームによって作成されたライブラリ用のアセット
 - vendor/assets := サードパーティのアセット

## フルプロセッサエンジン
chain可能で, 順番に参照して結合する。
末尾から実行される。
e.g.) hoge.js.coffee.erbだと, erb→coffeeScriptの順番

## リンクのテスト(統合テスト)
$ rails generate integration_test {test_name}
test/integration/{test_name}_test.rbが作成される


# 12/27
# Usersモデルの作成
まずはコントローラを作成
```bash
$ rails g controller Users new
# Usersコントローラにnewアクションを与える
```
次にモデルを作成
$ rails g model User name: string email string

## モデルのバリデーション
app/models/user.rb以下に記入
validate {要素名}, オプション

presence := 存在しているか
length := 文字列長(maximum, minimum, etc…)
uniqueness := 一意性があるか{ case_sensitive: false }で大文字小文字を区別しない
format: {with: } := 正規表現
/ := 正規表現の開始と終端
\A := 文字列の先頭
[\w+\-.]+ := 英数字, _, +, -, .のいずれかを少なくとも1回繰り返す
@ := アットマーク
[a-z\d\-.]+ := 英小文字, 数字, -, . のいずれか1つを少なくとも1文字以上繰り返す
\. := ドット
[a-z]+ := 英小文字を少なくとも1回以上繰り返す
\z := 文字列の末尾
i := 大文字小文字を無視するオプション

## dbのmigrate
ファイル直接書き換えの場合は,  $ rails db:migrate:reset

# Usersリソース
config/routes.rbに
resources :users を追加。

すると, index, show, new, create, edit, update, destroyが使用可能になる。
アクションの定義は, app/controllers/users_controller.rbで行う。
def {action_name}
  …
end
で追加できる。

debuggerを追加するとbybugが使用可能になる。

## signup
app/views/users/new.html.erbに追加。
明日はSignupのテストから。

テスト終わり
assert_template
assert_select := 以降のテキストが存在しているか
content_tag := 以降の要素をタグとしてhtmlを作成
assert_no_difference := その中の行為で要素の変更がないことをテストする

# sessions(login, logout)
## sessionsコントローラを生成(newアクションを追加)
$ rails g controller Sessions new

## ルートを追加
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
## ルートを確認する
$ rails routes

## flashメッセージで報告
def createの部分にflash.now[:danger] = ‘Invalid’を追加すると良い

## トグルメニューの追加
class=“dropdown-toggle”を追加すればおk

## ログアウト
helperに追加
session.delete(:user_id)
@current_user = nil
でおk。セッションを切っても@curernt_userはそのままなので, nilで上書きする

その後, controllerに追加
controllerに全部書いてもいいが, 中身が大きくなりすぎるので, helperを用いて分割する。

# todo
rails g model Task title:string
rails g controller Tasks
ルーティングの追加

他のアクションの追加
new, create
viewの追加
edit, update

controllerで宣言したresourceはviewでも利用可能

# 1/27
## Controller間のインスタンス参照
他のコントローラのインスタンスは参照できないので, そのコントローラで他のコントローラを呼び出せばよい.  
以下のような感じ.

```ruby
// app/controllers/static_pages_controller.rb
class StaticPagesController < ApplicationController
  def home
    @user = current_user if logged_in?
  end
end
```

```ruby
// app/controllers/helpers/sessions_helper.rb
~~~
def current_user
  if session[:user_id]
    @current_user ||= User.find_by(id: session[:user_id])
  end
end
~~~
```

## Twitter認証
[`git-crypt`](https://github.com/AGWA/git-crypt)を使うと良いらしい?  

## API管理のためのgit-crypt
[git-crypt](https://github.com/AGWA/git-crypt)

### Installation
[Install.md](https://github.com/AGWA/git-crypt/blob/master/INSTALL.md)に書いてある.  

#### 1. clone
リポジトリをクローン.  
`$ git clone https://github.com/AGWA/git-crypt.git` 
#### 2. `make`して`make install`
```
$ make
$ make install
```
#### 3. `gpg`で作るための`*.conf`ファイルを作成
いちいち入力してるとミスがあったときに困るので, `.conf`ファイルで設定します.  
(今回はkey-gen.confとします).  
ファイルの内容は以下の通り.  
```
// key-gen.conf
Key-Type: RSA
Key-Length: 4096

SubKey-Type: RSA
SubKey-Length: 4096

Expire-Date: 2y           // 期間(お好みでok)

Name-Real: {real-name}    // 名前をここに入力
Name-Email: {email}       // emailアドレスをここに入力

passphrase: {pass-phrase} // pass-phraseをここに入力

%commit                   
%echo Successfully done
```
#### 4. rng-toolsのインストール
このまま`$ gpg --gen-key --batch key-gen.conf`をしても良いが, かなり時間がかかるので`rng-tools`パッケージを使う。  

> rngd は /dev/hwrng から乱数を得て, カーネルのエントロピープールに乱数を提供します. rngd はあくまでカーネルのエントロピープールに乱数を提供するのみで, ハードウェア乱数生成器のデータを直接 /dev/random 等から出力するのでありません. また rngd は入力されたデータが本当にランダムかどうか, FIPS 140-2 (2002-10-10) テストを行ってくれます.

> ハードウェア乱数生成器を利用することで /dev/random からより高速に乱数を生成することができます. ハードウェア乱数生成器を利用しない場合と利用する場合の生成速度の違いは以下のようになります.
(引用:[Raspberry Pi のハードウェア乱数生成器を利用する](https://blog.ymyzk.com/2015/05/raspberry-pi-hardware-random-number-generator/))

私はCentOS7を利用しているので, 以下のコマンドを叩きました.  
(環境に応じてコマンドを変更してください)  
```
$ sudo yum install rng-tools
```

### 5. gpgによる鍵の生成
以下のコマンドを実行して鍵を生成します.  
```
$ gpg --gen-key --batch ./key-gen.conf
```
その後, 別のterminalを開き, 以下のコマンドを実行します.
```
$ sudo rngd -r /dev/urandom
```
すると, 最初の`gpg`コマンドの方で, 以下のように出力されるはずです.
```
gpg --gen-key --batch ./key-gen.conf
gpg: 鍵*を絶対的に信用するよう記録しました
gpg: Successfully done
```

### 6. git-cryptの設定
設定は, `.gitattributes`に以下のように書き込みます.  
ここで, {file-name}の部分には暗号化したいファイル名を入れます. 
```
// .gitattributes
{file-name} filter=git-crypt diff=git-crypt

e.g.)  
API-KEY.xml filter=git-crypt diff=git-crypt
```

その後, 以下のコマンドでGPGで生成した鍵を特定できる文字列を入れます.  
私はgpgで鍵を生成したときの`email`を入れました.  
```
$ git-crypt add-gpg-user {email}

e.g.) 
$ git-crypt add-gpg-user hoge@fuga.com
```

#### 7. git add
あとは, `.gitattributes`で設定したファイルをステージング(`$ git add`)します.  
暗号化されているファイルは  
`$ git-crypt status -e`  
で確認できます.  
もし, 暗号化されていないのにステージングされている場合は, 
`$ git-crypt status -f`  
で暗号化対象にされるので, OKです.  

Twitter APPの認証が必要らしいので, 少し待ちます.  
[Ruby on RailsでTwitter認証機能を実装してみる](https://reasonable-code.com/rails-twitter-auth/)

# Postの設定
`app/controllers/shared/_task_form.html.erb`が正しく描画されないことが多々あった.  

その原因は, `form_for`の引数を`@user.tasks`というリレーションにしていたからだった.  

そのため, 新しく`@tasks`インスタンスを宣言し,  
`static_pages_controller.rb`の`home`アクションで,  
```ruby
def home
  ~~
  @tasks = current_user.tasks.build if logged_in?
end
```
を追記した.

# 01/30
# DBの再構築
`$ rails db:reset`よりも`$ rails db:migrate:reset`を使うべき.  
 - [rake db:reset と rake db:migrate:reset の違い](https://easyramble.com/difference-bettween-rake-db-migrate-reset.html)

::: danger
`db:reset`はmigration fileを編集してもその内容は更新されない.
:::
 
