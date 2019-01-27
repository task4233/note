# Vue x Rails
[こちら](https://re-engines.com/2018/04/09/vue-js%E3%81%A8rails%E3%81%A7todo%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB%E3%81%BF%E3%81%9F%E3%81%84%E3%81%AA%E3%82%82%E3%81%AE%E3%82%92/)のサイトを参考にチュートリアルを進めています.

## 2019/1/26
## プロジェクトの生成
```
$ rails new {project_name} --webpack=vue
```

## Vue.jsの参照
Viewのページで, `javascript_pack_tag`を使用することで,`app/javascript/packs`以下にあるJSファイルを探す.  
インストール時に`app/javascript/packs/hello_vue.js`というファイルが生成されているので, これを`index`アクションにて読み込ませる.  

## devサーバの自動コンパイル
### foreman gemのインストール
`bin/webpack`というコマンドでコンパイルされる.  

毎回のコンパイルが面倒なので, 変更を検出して自動コンパイルする.  
[Introducing Webpacker](https://medium.com/statuscode/introducing-webpacker-7136d66cddfb)

`foreman`のGemをインストールする.  
Gemfileファイルに`gem 'foreman'`を追加して`bundle install`する.

### bin/serverとProcfileの追記
#### bin/server
以下で示すProcfile.devの内容を実行する.
```
// bin/server
#! /bin/bash -i
bundle install
bundle exec foreman start -f Procfile.dev
```

#### Packfile.dev
`rails s`と`bin/webpack-dev-server`を実行する.  
ポート指定のために, `-b 0.0.0.0`オプションをつける.  
[RailsでポートとIPアドレスを指定する方法](https://qiita.com/Tocyuki/items/de66987ead2183e4fcae).
```
// Procfile.dev
web: bundle exec rails s -b 0.0.0.0
webpacker: ./bin/webpack-dev-server
```

### 実践
`app/javascript/app.vue`のmessageを編集するとすぐにコンパイルされる.  

## APIの準備

### テーブルとモデルの作成
テーブル名は`tasks`, モデル名は`Task`とする.  

|Column Name|Type|Options|  
|:-:|:-:|:-:|  
|name|string|presence: true|
|is_done|boolean|presence: true, default: false|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|


とりあえず,   
`$ rails g model Task name:string is_done:boolean`.  

その後, `options`の内容を以下のようにして`db/migrate/*.rb`に追記.
```
// db/migrate/*.rb
class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name    , presence: true
      t.boolean :is_done, default: false, presence: true

      t.timestamps
    end
  end
end

```

ついでに, `app/models/task.rb`に上で定義したvalidatesの内容を追加.
```
// app/models/task.rb
class Task < ApplicationRecord
  validates :name, presence: true
end
```

### APIのルーティングの設定
urlを`api/tasks`のようにnamespaceを切る.  
そうすることで, api用のルーティングが用意できる.  
(具体的には, `/api/*`のようにnamespaceが区切られる) 
```
// config/routes.rb
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  
  namespace :api, format: 'json' do
    resources :tasks, only: [:index, :create, :update]
  end
end
```

### コントローラを作成
API用のコントローラを作成する.  
controllerの場所は, `app/controllers/`以下に新しく`api`というディレクトリを作成する.  
名前は慣習的に`tasks_controller.rb`とする.  

追加するアクションは3つで, 以下の通り.
|Action Name|REST|Overview|
|:-:|:-:|:-:|
|index|GET /tasks|更新順の@tasksを返す|  
|create|POST /tasks|新しく@taskを作ってデータベースに保存|
|''|''|保存できない場合, `:unprocessable_entity`ステータスの`json`ファイルをrenderする|
|update|PATCH/PUT /tasks/*|@taskを更新する|
|''|''|更新できなかった場合, `:unprocessable_entity`ステータスの`json`ファイルをrenderする|

中身を勝手にいじられないように, `private`で`task_params`を定義しておく.
```
# -*- coding: utf-8 -*-
class Api::TasksController < ApplicationController
 
  # GET /tasks
  def index
    # 後々のために, 更新順で返す
    @tasks = Task.order('updated_at DESC')
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)
    
    if @task.save
      render :show, status :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/*
  def update
    @task = Task.find(params[:id])
    
    if @task.update(task_params)
      render :show, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  private
  def task_params
    params.fetch(:task, {}).permit(
      :name, :is_done
    )
  end
end
```

### ViewのJSONファイル
`app/views/api/tasks/`下に, `index`と`show`のための2つのjbuilderファイル(json)を配置.  
jbuilderについては, 以下を参照.  
[Railsのjbuilderの書き方と便利なイディオムやメソッド](https://qiita.com/ryouzi/items/06cb0d4aa7b6527b3645)

```
// app/views/api/tasks/index.json.jbuilder
// `set!`は, `:tasks`という属性をまとめるメソッド
json.set! :tasks do
  // `array!`は, `@tasks`の内容をループで回すメソッド 
  // 返り値は配列になる
  json.array! @tasks do |task|
    // `extract!`は, `task`の中身を指定して返せるメソッド
    // 以下の場合は, `task`の中身を, `:id`, `:name`, ..., `:updated_at`をまとめて返すことになる
    json.extract! task, :id, :name, :is_done, :created_at, :updated_at
  end
end
```

```
// app/views/api/tasks/show.json.jbuilder
json.set! :task do
  json.extract! @task, :id, :name, :is_done, :created_at, :updated_at
end
```

### seeds.rbを作成し, curlコマンドで確認
初期値データの作成.  
今回は未達成Taskを2つ, 達成済みTaskを1つ作る.
おなじみの`seeds.rb`を以下のように設定.
```
// db/seeds.rb
2.times { Task.create!(name: 'Sample Task') }
1.times { Task.create!(name: 'Done Task', is_done: true) }
```

コマンドは`$ rails db:seed`.  
リセットする場合は`$ rails db:setup`

### curlでGETしてみる
`$ curl -X GET 0.0.0.0:5000/api/tasks | jq`を叩く.  
```
{
  "tasks": [
    {
      "id": 6,
      "name": "Done Task",
      "is_done": true,
      "created_at": "2019-01-26T13:54:22.507Z",
      "updated_at": "2019-01-26T13:54:22.507Z"
    },
    {
      "id": 5,
      "name": "Sample Task",
      "is_done": false,
      "created_at": "2019-01-26T13:54:22.496Z",
      "updated_at": "2019-01-26T13:54:22.496Z"
    },
    {
      "id": 4,
      "name": "Sample Task",
      "is_done": false,
      "created_at": "2019-01-26T13:54:22.486Z",
      "updated_at": "2019-01-26T13:54:22.486Z"
    },
    {
      "id": 3,
      "name": "Done Task",
      "is_done": true,
      "created_at": "2019-01-26T13:54:07.951Z",
      "updated_at": "2019-01-26T13:54:07.951Z"
    },
    {
      "id": 2,
      "name": "Sample Task",
      "is_done": false,
      "created_at": "2019-01-26T13:54:07.939Z",
      "updated_at": "2019-01-26T13:54:07.939Z"
    },
    {
      "id": 1,
      "name": "Sample Task",
      "is_done": false,
      "created_at": "2019-01-26T13:54:07.929Z",
      "updated_at": "2019-01-26T13:54:07.929Z"
    }
  ]
}
```

なぜか2倍作成されている...  
Why...?  


あとで検証する. 今は眠いのだ.
### curlでPOSTしてみる
`$ curl -X POST 0.0.0.0:5000/api/tasks -d 'task[hoge]=fuga'`  

`ActionController::InvalidAuthenticityToken`が返ってくる.  
認証していないのが問題らしい.  

### 認証機能の追加
[【Rails】RailsでAPIの簡単なトークン認証を実装する](https://qiita.com/Yarimizu14/items/c81a8cf1859f954b953e)  
こちらの記事を参考にした.  

## 2019/1/27
### 認証機能の追加(つづき)
追加するのは, `app/controllers/application_controller.rb`.  
以下のように追加.
```
class ApplicationController < ActionController::Base

  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate
  protect_from_forgery with: :exception
  
  protected
  def authenticate
    authenticate_token || render_unauthenticated
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      token == 'hoge'
    end
  end
  
  def render_unauthenticated
    # render_errors(:unauthorized, ['invalid token'])
    obj = { message: 'token invalid' }
    render json: obj, status: :unauthorized
  end
  
end

```

この後,   
`$ curl -X POST -H 'Content-Type:application/json' -H 'Authorization: Token hoge' 0.0.0.0:5000/api/tasks -d '{ "task"=>{"name":"fuga"} }'`  
を叩くと,  
`Can't verify CSRF token authenticity`と怒られる.  
このtokenだとダメなのか?  

## secureな認証付きトークンを用いてPOSTする
[Rails5 APIで認証付きのWebAPIを作ってみる](https://qiita.com/ochiochi/items/966b884eb17045dfb929)

こちらの記事を参考にしてみる.  

これユーザ認証だ.  

uhmmmmmmmmmm....  

後でやります(TODOに投げる)  
Do better then perfectなので.  

### 最悪の対処法
`app/controller/application_controller.rb`のCSRF対策のコードをコメントアウト.  
許せ...

`$ curl -X POST -H 'Content-Type:application/json' 0.0.0.0:5000/api/tasks | jq`  
```
{ "task":
  {
    "id": 7,
    "name": "fuga",
    "is_done": false,
    "created_at": "2019-01-27T01:45:10.207Z",
    "updated_at": "2019-01-27T01:45:10.207Z"
  }
}
```

おkですね(全くおkではない)  
後で認証は実装する.  

## Materializeの導入
MaterializeというCSSフレームワークを導入する.  
Gemを追加して`bundle install`

その後, Materializeを適応するために以下の2ファイルを変更.  
 - Stylesheetsはセミコロン抜け注意.  
 - `Sprockets::FileNotFound`が出たら, Gemfileとかサーバの再起動とかしてみると直る.
 - [materialize-sassの公式](https://github.com/mkhairi/materialize-sass/tree/v0.100)

```
// - app/assets/stylesheets/application.css
// + app/assets/stylesheets/application.scss
/* Materialize */

@import "materialize/components/color-variables";
$primary-color: color("teal", "accent-3") !default;
$secondary-color: color("cyan", "base") !default;
@import 'materialize';
@import 'material_icons';
```

```
// app/assets/javascripts/application.js
//= require jquery
//= require jquery.turbolinks
//= require materialize-sprockets
//= require turbolinks
//= require_tree .

```

## Componentsを活用してヘッダを作成
