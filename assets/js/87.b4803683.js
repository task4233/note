(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{445:function(e,t,a){"use strict";a.r(t);var r=a(49),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"vue-x-rails"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-x-rails"}},[e._v("#")]),e._v(" Vue x Rails")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://re-engines.com/2018/04/09/vue-js%E3%81%A8rails%E3%81%A7todo%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB%E3%81%BF%E3%81%9F%E3%81%84%E3%81%AA%E3%82%82%E3%81%AE%E3%82%92/",target:"_blank",rel:"noopener noreferrer"}},[e._v("こちら"),a("OutboundLink")],1),e._v("のサイトを参考にチュートリアルを進めています.")]),e._v(" "),a("h2",{attrs:{id:"_2019-1-26"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2019-1-26"}},[e._v("#")]),e._v(" 2019/1/26")]),e._v(" "),a("h2",{attrs:{id:"プロジェクトの生成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#プロジェクトの生成"}},[e._v("#")]),e._v(" プロジェクトの生成")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("$ rails new {project_name} --webpack=vue\n")])])]),a("h2",{attrs:{id:"vue-jsの参照"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-jsの参照"}},[e._v("#")]),e._v(" Vue.jsの参照")]),e._v(" "),a("p",[e._v("Viewのページで, "),a("code",[e._v("javascript_pack_tag")]),e._v("を使用することで,"),a("code",[e._v("app/javascript/packs")]),e._v("以下にあるJSファイルを探す."),a("br"),e._v("\nインストール時に"),a("code",[e._v("app/javascript/packs/hello_vue.js")]),e._v("というファイルが生成されているので, これを"),a("code",[e._v("index")]),e._v("アクションにて読み込ませる.")]),e._v(" "),a("h2",{attrs:{id:"devサーバの自動コンパイル"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#devサーバの自動コンパイル"}},[e._v("#")]),e._v(" devサーバの自動コンパイル")]),e._v(" "),a("h3",{attrs:{id:"foreman-gemのインストール"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#foreman-gemのインストール"}},[e._v("#")]),e._v(" foreman gemのインストール")]),e._v(" "),a("p",[a("code",[e._v("bin/webpack")]),e._v("というコマンドでコンパイルされる.")]),e._v(" "),a("p",[e._v("毎回のコンパイルが面倒なので, 変更を検出して自動コンパイルする."),a("br"),e._v(" "),a("a",{attrs:{href:"https://medium.com/statuscode/introducing-webpacker-7136d66cddfb",target:"_blank",rel:"noopener noreferrer"}},[e._v("Introducing Webpacker"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("code",[e._v("foreman")]),e._v("のGemをインストールする."),a("br"),e._v("\nGemfileファイルに"),a("code",[e._v("gem 'foreman'")]),e._v("を追加して"),a("code",[e._v("bundle install")]),e._v("する.")]),e._v(" "),a("h3",{attrs:{id:"bin-serverとprocfileの追記"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bin-serverとprocfileの追記"}},[e._v("#")]),e._v(" bin/serverとProcfileの追記")]),e._v(" "),a("h4",{attrs:{id:"bin-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bin-server"}},[e._v("#")]),e._v(" bin/server")]),e._v(" "),a("p",[e._v("以下で示すProcfile.devの内容を実行する.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// bin/server\n#! /bin/bash -i\nbundle install\nbundle exec foreman start -f Procfile.dev\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",[a("code",[e._v("$ chmod 777 bin/server")]),e._v("を実行しておかないと, "),a("code",[e._v("bin/server")]),e._v("がパーミッションのせいで実行できなくなる可能性がある.")])]),e._v(" "),a("h4",{attrs:{id:"packfile-dev"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#packfile-dev"}},[e._v("#")]),e._v(" Packfile.dev")]),e._v(" "),a("p",[a("code",[e._v("rails s")]),e._v("と"),a("code",[e._v("bin/webpack-dev-server")]),e._v("を実行する."),a("br"),e._v("\nポート指定のために, "),a("code",[e._v("-b 0.0.0.0")]),e._v("オプションをつける."),a("br"),e._v(" "),a("a",{attrs:{href:"https://qiita.com/Tocyuki/items/de66987ead2183e4fcae",target:"_blank",rel:"noopener noreferrer"}},[e._v("RailsでポートとIPアドレスを指定する方法"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Procfile.dev\nweb: bundle exec rails s -b 0.0.0.0\nwebpacker: ./bin/webpack-dev-server\n")])])]),a("h3",{attrs:{id:"実践"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#実践"}},[e._v("#")]),e._v(" 実践")]),e._v(" "),a("p",[a("code",[e._v("app/javascript/app.vue")]),e._v("のmessageを編集するとすぐにコンパイルされる.")]),e._v(" "),a("h2",{attrs:{id:"apiの準備"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#apiの準備"}},[e._v("#")]),e._v(" APIの準備")]),e._v(" "),a("h3",{attrs:{id:"テーブルとモデルの作成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#テーブルとモデルの作成"}},[e._v("#")]),e._v(" テーブルとモデルの作成")]),e._v(" "),a("p",[e._v("テーブル名は"),a("code",[e._v("tasks")]),e._v(", モデル名は"),a("code",[e._v("Task")]),e._v("とする.")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[e._v("Column Name")]),e._v(" "),a("th",{staticStyle:{"text-align":"center"}},[e._v("Type")]),e._v(" "),a("th",{staticStyle:{"text-align":"center"}},[e._v("Options")])])]),e._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("name")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("string")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("presence: true")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("is_done")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("boolean")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("presence: true, default: false")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("created_at")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("datetime")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("null: false")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("updated_at")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("datetime")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("null: false")])])])]),e._v(" "),a("p",[e._v("とりあえず,"),a("br"),e._v(" "),a("code",[e._v("$ rails g model Task name:string is_done:boolean")]),e._v(".")]),e._v(" "),a("p",[e._v("その後, "),a("code",[e._v("options")]),e._v("の内容を以下のようにして"),a("code",[e._v("db/migrate/*.rb")]),e._v("に追記.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// db/migrate/*.rb\nclass CreateTasks < ActiveRecord::Migration[5.1]\n  def change\n    create_table :tasks do |t|\n      t.string :name    , presence: true\n      t.boolean :is_done, default: false, presence: true\n\n      t.timestamps\n    end\n  end\nend\n\n")])])]),a("p",[e._v("ついでに, "),a("code",[e._v("app/models/task.rb")]),e._v("に上で定義したvalidatesの内容を追加.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/models/task.rb\nclass Task < ApplicationRecord\n  validates :name, presence: true\nend\n")])])]),a("h3",{attrs:{id:"apiのルーティングの設定"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#apiのルーティングの設定"}},[e._v("#")]),e._v(" APIのルーティングの設定")]),e._v(" "),a("p",[e._v("urlを"),a("code",[e._v("api/tasks")]),e._v("のようにnamespaceを切る."),a("br"),e._v("\nそうすることで, api用のルーティングが用意できる."),a("br"),e._v("\n(具体的には, "),a("code",[e._v("/api/*")]),e._v("のようにnamespaceが区切られる)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// config/routes.rb\nRails.application.routes.draw do\n  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html\n  root to: 'home#index'\n  \n  namespace :api, format: 'json' do\n    resources :tasks, only: [:index, :create, :update]\n  end\nend\n")])])]),a("h3",{attrs:{id:"コントローラを作成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#コントローラを作成"}},[e._v("#")]),e._v(" コントローラを作成")]),e._v(" "),a("p",[e._v("API用のコントローラを作成する."),a("br"),e._v("\ncontrollerの場所は, "),a("code",[e._v("app/controllers/")]),e._v("以下に新しく"),a("code",[e._v("api")]),e._v("というディレクトリを作成する."),a("br"),e._v("\n名前は慣習的に"),a("code",[e._v("tasks_controller.rb")]),e._v("とする.")]),e._v(" "),a("p",[e._v("追加するアクションは3つで, 以下の通り.")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[e._v("Action Name")]),e._v(" "),a("th",{staticStyle:{"text-align":"center"}},[e._v("REST")]),e._v(" "),a("th",{staticStyle:{"text-align":"center"}},[e._v("Overview")])])]),e._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("index")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("GET /tasks")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("更新順の@tasksを返す")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("create")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("POST /tasks")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("新しく@taskを作ってデータベースに保存")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("''")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("''")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("保存できない場合, "),a("code",[e._v(":unprocessable_entity")]),e._v("ステータスの"),a("code",[e._v("json")]),e._v("ファイルをrenderする")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("update")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("PATCH/PUT /tasks/*")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("@taskを更新する")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("''")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("''")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("更新できなかった場合, "),a("code",[e._v(":unprocessable_entity")]),e._v("ステータスの"),a("code",[e._v("json")]),e._v("ファイルをrenderする")])])])]),e._v(" "),a("p",[e._v("中身を勝手にいじられないように, "),a("code",[e._v("private")]),e._v("で"),a("code",[e._v("task_params")]),e._v("を定義しておく.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# -*- coding: utf-8 -*-\nclass Api::TasksController < ApplicationController\n \n  # GET /tasks\n  def index\n    # 後々のために, 更新順で返す\n    @tasks = Task.order('updated_at DESC')\n  end\n\n  # POST /tasks\n  def create\n    @task = Task.new(task_params)\n    \n    if @task.save\n      render :show, status :created\n    else\n      render json: @task.errors, status: :unprocessable_entity\n    end\n  end\n\n  # PATCH/PUT /tasks/*\n  def update\n    @task = Task.find(params[:id])\n    \n    if @task.update(task_params)\n      render :show, status: :ok\n    else\n      render json: @task.errors, status: :unprocessable_entity\n    end\n  end\n\n  private\n  def task_params\n    params.fetch(:task, {}).permit(\n      :name, :is_done\n    )\n  end\nend\n")])])]),a("h3",{attrs:{id:"viewのjsonファイル"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#viewのjsonファイル"}},[e._v("#")]),e._v(" ViewのJSONファイル")]),e._v(" "),a("p",[a("code",[e._v("app/views/api/tasks/")]),e._v("下に, "),a("code",[e._v("index")]),e._v("と"),a("code",[e._v("show")]),e._v("のための2つのjbuilderファイル(json)を配置."),a("br"),e._v("\njbuilderについては, 以下を参照."),a("br"),e._v(" "),a("a",{attrs:{href:"https://qiita.com/ryouzi/items/06cb0d4aa7b6527b3645",target:"_blank",rel:"noopener noreferrer"}},[e._v("Railsのjbuilderの書き方と便利なイディオムやメソッド"),a("OutboundLink")],1)]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/views/api/tasks/index.json.jbuilder\n// `set!`は, `:tasks`という属性をまとめるメソッド\njson.set! :tasks do\n  // `array!`は, `@tasks`の内容をループで回すメソッド \n  // 返り値は配列になる\n  json.array! @tasks do |task|\n    // `extract!`は, `task`の中身を指定して返せるメソッド\n    // 以下の場合は, `task`の中身を, `:id`, `:name`, ..., `:updated_at`をまとめて返すことになる\n    json.extract! task, :id, :name, :is_done, :created_at, :updated_at\n  end\nend\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/views/api/tasks/show.json.jbuilder\njson.set! :task do\n  json.extract! @task, :id, :name, :is_done, :created_at, :updated_at\nend\n")])])]),a("h3",{attrs:{id:"seeds-rbを作成し-curlコマンドで確認"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#seeds-rbを作成し-curlコマンドで確認"}},[e._v("#")]),e._v(" seeds.rbを作成し, curlコマンドで確認")]),e._v(" "),a("p",[e._v("初期値データの作成."),a("br"),e._v("\n今回は未達成Taskを2つ, 達成済みTaskを1つ作る.\nおなじみの"),a("code",[e._v("seeds.rb")]),e._v("を以下のように設定.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// db/seeds.rb\n2.times { Task.create!(name: 'Sample Task') }\n1.times { Task.create!(name: 'Done Task', is_done: true) }\n")])])]),a("p",[e._v("コマンドは"),a("code",[e._v("$ rails db:seed")]),e._v("."),a("br"),e._v("\nリセットする場合は"),a("code",[e._v("$ rails db:setup")])]),e._v(" "),a("h3",{attrs:{id:"curlでgetしてみる"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#curlでgetしてみる"}},[e._v("#")]),e._v(" curlでGETしてみる")]),e._v(" "),a("p",[a("code",[e._v("$ curl -X GET 0.0.0.0:5000/api/tasks | jq")]),e._v("を叩く.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('{\n  "tasks": [\n    {\n      "id": 6,\n      "name": "Done Task",\n      "is_done": true,\n      "created_at": "2019-01-26T13:54:22.507Z",\n      "updated_at": "2019-01-26T13:54:22.507Z"\n    },\n    {\n      "id": 5,\n      "name": "Sample Task",\n      "is_done": false,\n      "created_at": "2019-01-26T13:54:22.496Z",\n      "updated_at": "2019-01-26T13:54:22.496Z"\n    },\n    {\n      "id": 4,\n      "name": "Sample Task",\n      "is_done": false,\n      "created_at": "2019-01-26T13:54:22.486Z",\n      "updated_at": "2019-01-26T13:54:22.486Z"\n    },\n    {\n      "id": 3,\n      "name": "Done Task",\n      "is_done": true,\n      "created_at": "2019-01-26T13:54:07.951Z",\n      "updated_at": "2019-01-26T13:54:07.951Z"\n    },\n    {\n      "id": 2,\n      "name": "Sample Task",\n      "is_done": false,\n      "created_at": "2019-01-26T13:54:07.939Z",\n      "updated_at": "2019-01-26T13:54:07.939Z"\n    },\n    {\n      "id": 1,\n      "name": "Sample Task",\n      "is_done": false,\n      "created_at": "2019-01-26T13:54:07.929Z",\n      "updated_at": "2019-01-26T13:54:07.929Z"\n    }\n  ]\n}\n')])])]),a("p",[e._v("なぜか2倍作成されている..."),a("br"),e._v("\nWhy...?")]),e._v(" "),a("p",[e._v("あとで検証する. 今は眠いのだ.")]),e._v(" "),a("h3",{attrs:{id:"curlでpostしてみる"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#curlでpostしてみる"}},[e._v("#")]),e._v(" curlでPOSTしてみる")]),e._v(" "),a("p",[a("code",[e._v("$ curl -X POST 0.0.0.0:5000/api/tasks -d 'task[hoge]=fuga'")])]),e._v(" "),a("p",[a("code",[e._v("ActionController::InvalidAuthenticityToken")]),e._v("が返ってくる."),a("br"),e._v("\n認証していないのが問題らしい.")]),e._v(" "),a("h3",{attrs:{id:"認証機能の追加"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#認証機能の追加"}},[e._v("#")]),e._v(" 認証機能の追加")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://qiita.com/Yarimizu14/items/c81a8cf1859f954b953e",target:"_blank",rel:"noopener noreferrer"}},[e._v("【Rails】RailsでAPIの簡単なトークン認証を実装する"),a("OutboundLink")],1),a("br"),e._v("\nこちらの記事を参考にした.")]),e._v(" "),a("h2",{attrs:{id:"_2019-1-27"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2019-1-27"}},[e._v("#")]),e._v(" 2019/1/27")]),e._v(" "),a("h3",{attrs:{id:"認証機能の追加-つづき"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#認証機能の追加-つづき"}},[e._v("#")]),e._v(" 認証機能の追加(つづき)")]),e._v(" "),a("p",[e._v("追加するのは, "),a("code",[e._v("app/controllers/application_controller.rb")]),e._v("."),a("br"),e._v("\n以下のように追加.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("class ApplicationController < ActionController::Base\n\n  include ActionController::HttpAuthentication::Token::ControllerMethods\n\n  before_action :authenticate\n  protect_from_forgery with: :exception\n  \n  protected\n  def authenticate\n    authenticate_token || render_unauthenticated\n  end\n\n  def authenticate_token\n    authenticate_with_http_token do |token, options|\n      token == 'hoge'\n    end\n  end\n  \n  def render_unauthenticated\n    # render_errors(:unauthorized, ['invalid token'])\n    obj = { message: 'token invalid' }\n    render json: obj, status: :unauthorized\n  end\n  \nend\n\n")])])]),a("p",[e._v("この後,"),a("br"),e._v(" "),a("code",[e._v("$ curl -X POST -H 'Content-Type:application/json' -H 'Authorization: Token hoge' 0.0.0.0:5000/api/tasks -d '{ \"task\"=>{\"name\":\"fuga\"} }'")]),a("br"),e._v("\nを叩くと,"),a("br"),e._v(" "),a("code",[e._v("Can't verify CSRF token authenticity")]),e._v("と怒られる."),a("br"),e._v("\nこのtokenだとダメなのか?")]),e._v(" "),a("h2",{attrs:{id:"secureな認証付きトークンを用いてpostする"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#secureな認証付きトークンを用いてpostする"}},[e._v("#")]),e._v(" secureな認証付きトークンを用いてPOSTする")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://qiita.com/ochiochi/items/966b884eb17045dfb929",target:"_blank",rel:"noopener noreferrer"}},[e._v("Rails5 APIで認証付きのWebAPIを作ってみる"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("こちらの記事を参考にしてみる.")]),e._v(" "),a("p",[e._v("これユーザ認証だ.")]),e._v(" "),a("p",[e._v("uhmmmmmmmmmm....")]),e._v(" "),a("p",[e._v("後でやります(TODOに投げる)"),a("br"),e._v("\nDo better then perfectなので.")]),e._v(" "),a("h3",{attrs:{id:"最悪の対処法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#最悪の対処法"}},[e._v("#")]),e._v(" 最悪の対処法")]),e._v(" "),a("p",[a("code",[e._v("app/controller/application_controller.rb")]),e._v("のCSRF対策のコードをコメントアウト."),a("br"),e._v("\n許せ...")]),e._v(" "),a("p",[a("code",[e._v("$ curl -X POST -H 'Content-Type:application/json' 0.0.0.0:5000/api/tasks | jq")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('{ "task":\n  {\n    "id": 7,\n    "name": "fuga",\n    "is_done": false,\n    "created_at": "2019-01-27T01:45:10.207Z",\n    "updated_at": "2019-01-27T01:45:10.207Z"\n  }\n}\n')])])]),a("p",[e._v("おkですね(全くおkではない)"),a("br"),e._v("\n後で認証は実装する.")]),e._v(" "),a("h2",{attrs:{id:"materializeの導入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#materializeの導入"}},[e._v("#")]),e._v(" Materializeの導入")]),e._v(" "),a("p",[e._v("MaterializeというCSSフレームワークを導入する."),a("br"),e._v("\nGemを追加して"),a("code",[e._v("bundle install")])]),e._v(" "),a("p",[e._v("その後, Materializeを適応するために以下の2ファイルを変更.")]),e._v(" "),a("ul",[a("li",[e._v("Stylesheetsはセミコロン抜け注意.")]),e._v(" "),a("li",[a("code",[e._v("Sprockets::FileNotFound")]),e._v("が出たら, Gemfileとかサーバの再起動とかしてみると直る.")]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/mkhairi/materialize-sass/tree/v0.100",target:"_blank",rel:"noopener noreferrer"}},[e._v("materialize-sassの公式"),a("OutboundLink")],1)]),e._v(" "),a("li",[e._v("カラースキームは"),a("a",{attrs:{href:"https://materializecss.com/color.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("公式"),a("OutboundLink")],1),e._v("を見て")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// - app/assets/stylesheets/application.css\n// + app/assets/stylesheets/application.scss\n/* Materialize */\n\n@import "materialize/components/color-variables";\n$primary-color: color("teal", "accent-3") !default;\n$secondary-color: color("cyan", "base") !default;\n@import \'materialize\';\n@import \'material_icons\';\n')])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/assets/javascripts/application.js\n//= require jquery\n//= require jquery.turbolinks\n//= require materialize-sprockets\n//= require turbolinks\n//= require_tree .\n\n")])])]),a("h2",{attrs:{id:"componentsを活用してヘッダを作成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#componentsを活用してヘッダを作成"}},[e._v("#")]),e._v(" Componentsを活用してヘッダを作成")]),e._v(" "),a("p",[e._v("元のファイルは"),a("code",[e._v("index.html.erb")]),e._v("なので, そこの"),a("code",[e._v('<div id="app">')]),e._v("にvueの内容がマウントされる."),a("br"),e._v(" "),a("code",[e._v("<navbar>")]),e._v("の装飾をvueで行う.")]),e._v(" "),a("p",[e._v("フォルダ構成は以下の通り.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('/home/vagrant/rails_work/workspace/vue_todo/app/javascript\n|--app.vue\n|--packs\n| |--application.js\n| |--components\n| | |--header.vue // headerの情報を提供\n| |--todo.js // index.html.erbの`<div id="app">の部分にマウントされる\n')])])]),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/task4233/vue_todo/blob/master/app/javascript/packs/components/header.vue",target:"_blank",rel:"noopener noreferrer"}},[e._v("components/header.vue"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/task4233/vue_todo/blob/master/app/javascript/packs/todo.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("todo.js"),a("OutboundLink")],1)])]),e._v(" "),a("h2",{attrs:{id:"vue-routerを使用する"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-routerを使用する"}},[e._v("#")]),e._v(" Vue-Routerを使用する")]),e._v(" "),a("p",[e._v("目的は, Top, About, Contactページの作成.")]),e._v(" "),a("h3",{attrs:{id:"what-s-vue-router"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-s-vue-router"}},[e._v("#")]),e._v(" What's Vue-Router?")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://router.vuejs.org/ja/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue Router"),a("OutboundLink")],1),e._v("\nVue.jsでSPAを作るときに使うルータ."),a("br"),e._v("\n機能は以下の通り(from 公式)")]),e._v(" "),a("ul",[a("li",[e._v("ネストされたルート/ビューマッピング")]),e._v(" "),a("li",[e._v("モジュール式、コンポーネントベースのルータ構造")]),e._v(" "),a("li",[e._v("ルートパラメータ、クエリ、ワイルドカード")]),e._v(" "),a("li",[e._v("Vue.js の transition 機能による、transition エフェクトの表示")]),e._v(" "),a("li",[e._v("細かいナビゲーションコントロール")]),e._v(" "),a("li",[e._v("自動で付与される active CSS クラス")]),e._v(" "),a("li",[e._v("HTML5 history モードまたは hash モードと IE9 の互換性")]),e._v(" "),a("li",[e._v("カスタマイズ可能なスクロール動作")])]),e._v(" "),a("p",[e._v("兎にも角にも実装してみます.")]),e._v(" "),a("h3",{attrs:{id:"vue-routerの追加"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-routerの追加"}},[e._v("#")]),e._v(" Vue-Routerの追加")]),e._v(" "),a("p",[a("code",[e._v("$ yarn add vue-router")]),a("br"),e._v("\nで"),a("code",[e._v("vue-router")]),e._v("を追加")]),e._v(" "),a("h3",{attrs:{id:"componentsの作成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#componentsの作成"}},[e._v("#")]),e._v(" Componentsの作成")]),e._v(" "),a("h4",{attrs:{id:"index-vue-top"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#index-vue-top"}},[e._v("#")]),e._v(" index.vue(Top)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/javascript/packs/components/index.vue\n<template>\n  <div>\n    <p>Index</p>\n  </div>\n</template>\n")])])]),a("h4",{attrs:{id:"about-vue-about"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#about-vue-about"}},[e._v("#")]),e._v(" about.vue(About)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/javascript/packs/components/about.vue\n<template>\n  <div>\n    <p>\n      This is a sample todo application.<br>\n      As I wanna practice vue.js, I've made this app.\n    </p>\n  </div>\n</template>\n")])])]),a("h4",{attrs:{id:"contact-vue-contact"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#contact-vue-contact"}},[e._v("#")]),e._v(" contact.vue(Contact)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/javascript/packs/components/contact.vue\n<template>\n  <div>\n    <p>\n      If you wanna contact me, plz send direct message to below account.<br>\n      Twitter: `@task4233`\n    </p>\n  </div>\n</template>\n")])])]),a("h3",{attrs:{id:"作成したcomponentsをvue-routerに登録"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#作成したcomponentsをvue-routerに登録"}},[e._v("#")]),e._v(" 作成したComponentsをVue-routerに登録")]),e._v(" "),a("p",[e._v("Vue-routerを使用するために, "),a("code",[e._v("router")]),e._v("ディレクトリを作成してそちらに記述."),a("br"),e._v(" "),a("code",[e._v("mode: 'history'")]),e._v("とすることで, HTMLのhistory APIを使用して, 同じビューないでURLを書き換えられる."),a("br"),e._v(" "),a("a",{attrs:{href:"https://router.vuejs.org/ja/guide/essentials/history-mode.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("HTML Historyモード"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("ただし, not-foundパスが"),a("code",[e._v("index.html")]),e._v("にリダイレクトされるため, 404ページを"),a("code",[e._v("NotFountComponent")]),e._v("とする.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// app/javascript/packs/router/router.js\nimport Vue from 'vue/dist/vue.esm.js'\nimport VueRouter from 'vue-router'\nimport Index from '../components/index.vue'\nimport About from '../components/about.vue'\nimport Contact from '../components/contact.vue'\n\nVue.use(VueRouter)\n\nexport default new VueRouter({\n  mode: 'history',\n  routes: [\n    { path: '/', components: Index },\n    { path: '/about', components: About },\n    { path: '/contact', components: Contact },\n    { path: '*', component: NotFoundComponent }\n  ]\n})\n")])])]),a("h4",{attrs:{id:"vue-routerに応じたタグの修正"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-routerに応じたタグの修正"}},[e._v("#")]),e._v(" Vue-Routerに応じたタグの修正")]),e._v(" "),a("p",[e._v("Vue-Routerを使用すると,以下のようなタグが提供される.")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"center"}},[e._v("Name")]),e._v(" "),a("th",{staticStyle:{"text-align":"center"}},[e._v("Effect")])])]),e._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[a("code",[e._v("<router-link>")])]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("code",[e._v("<a>")]),e._v("タグとして変換されるが,")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("''")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("Vue-Routerに登録されたパスからコンポーネントを探す")])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"center"}},[a("code",[e._v("<router-view>")])]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[a("code",[e._v("<router-link>")]),e._v("で見つけたコンポーネントを表示")])])])]),e._v(" "),a("p",[e._v("要するに, "),a("code",[e._v("<a>")]),e._v("タグを"),a("code",[e._v("<router-link>")]),e._v("に修正する.")]),e._v(" "),a("p",[e._v("その後, "),a("code",[e._v("app/views/home/index.html.erb")]),e._v("に"),a("code",[e._v("<router-view></router-view>")]),e._v("を追加.")]),e._v(" "),a("h2",{attrs:{id:"axiosを用いたapi通信-ajax"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#axiosを用いたapi通信-ajax"}},[e._v("#")]),e._v(" Axiosを用いたAPI通信(Ajax)")]),e._v(" "),a("h3",{attrs:{id:"what-s-axios"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-s-axios"}},[e._v("#")]),e._v(" What's Axios?")]),e._v(" "),a("p",[e._v("Ajax通信ライブラリらしい."),a("br"),e._v(" "),a("a",{attrs:{href:"https://github.com/axios/axios",target:"_blank",rel:"noopener noreferrer"}},[e._v("axios"),a("OutboundLink")],1)]),e._v(" "),a("h3",{attrs:{id:"axiosのインストール"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#axiosのインストール"}},[e._v("#")]),e._v(" Axiosのインストール")]),e._v(" "),a("p",[a("code",[e._v("$ yarn add axios")])]),e._v(" "),a("h3",{attrs:{id:"実践-axios"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#実践-axios"}},[e._v("#")]),e._v(" 実践(Axios)")]),e._v(" "),a("p",[e._v("checkboxの書き方は, Materialize 1.0.0から変わったので注意."),a("br"),e._v("\n詳しくは, "),a("a",{attrs:{href:"https://materializecss.com/checkboxes.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("公式"),a("OutboundLink")],1),e._v("を見よ.")]),e._v(" "),a("p",[e._v("また, 一覧を表示するために, JSを書く."),a("br"),e._v("\n仕組みは, インスタンスにプロパティとして"),a("code",[e._v("Task")]),e._v("(array)と, "),a("code",[e._v("newTask")]),e._v("(string)を与え, メソッドでAPIで取得してきた値をループさせて"),a("code",[e._v("tasks")]),e._v("に格納するというもの.")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("method")]),e._v("は, Vueインスタンスがマウントされたタイミングで実行されるライフサイクルフック(詳しくは, "),a("a",{attrs:{href:"https://jp.vuejs.org/v2/guide/instance.html#%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%80%E3%82%A4%E3%82%A2%E3%82%B0%E3%83%A9%E3%83%A0",target:"_blank",rel:"noopener noreferrer"}},[e._v("ライフサイクルダイアグラム"),a("OutboundLink")],1),e._v("をみるとよい)")]),e._v(" "),a("li",[e._v("一覧表示は, "),a("a",{attrs:{href:"https://jp.vuejs.org/v2/api/#v-for",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-for")]),a("OutboundLink")],1),e._v("と"),a("a",{attrs:{href:"https://jp.vuejs.org/v2/api/#v-if",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-if")]),a("OutboundLink")],1),e._v("を使ってやればよい(汚くなるけども, まぁ動くので)")]),e._v(" "),a("li",[e._v("v-bindで置換")]),e._v(" "),a("li",[e._v("単一コンポーネントにするので, コンパイル時にCSSを出さないようにする")]),e._v(" "),a("li",[e._v("具体的には, "),a("code",[e._v("config/webpack/environment.js")]),e._v("で"),a("code",[e._v("environment.loaders.get('vue').options.extractCSS=false")]),e._v("とすれば良い")]),e._v(" "),a("li",[e._v("accomplished tasksは基本的に非表示, 必要な時に表示すればおk.")]),e._v(" "),a("li",[e._v("ボタンが押されたとき("),a("a",{attrs:{href:"https://jp.vuejs.org/v2/api/#v-on",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-on")]),a("OutboundLink")],1),e._v(")に表示すればおk.")])]),e._v(" "),a("h3",{attrs:{id:"新規作成フォームの作成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#新規作成フォームの作成"}},[e._v("#")]),e._v(" 新規作成フォームの作成")]),e._v(" "),a("p",[e._v("双方向バインディングが可能な"),a("a",{attrs:{href:"https://jp.vuejs.org/v2/api/#v-model",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("v-model")]),a("OutboundLink")],1),e._v("を用いる."),a("br"),e._v(" "),a("code",[e._v("<input>")]),e._v("タグで入力された値と, インスタンスの"),a("a",{attrs:{href:"#%E5%AE%9F%E8%B7%B5-axios"}},[a("code",[e._v("newTask")]),e._v("プロパティ")]),e._v("とをバインドさせる.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",[e._v("基本的には, "),a("code",[e._v("script")]),e._v("の"),a("code",[e._v("method")]),e._v("を定義して, イベントに対してそれを呼び出すという様式になっている様子."),a("br"),e._v("\nJSと同じ.")])])])}),[],!1,null,null,null);t.default=s.exports}}]);