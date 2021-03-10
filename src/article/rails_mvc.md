---
date: 2019-02-01
description: '現状をまとめた.MVCの振り分けが難しい...'
tags:
 - rails
 - memo
---

# MVCまとめ
問題点: 現在のM, V, Cが散らばり過ぎて対応できなくなっている.  
そのため, 一度現状を整理する.  

## M(Model)
現在のモデルはUser, Taskの2つである.

### Taskモデル
 - 格納されるTaskの要素を持つ.
 - 前述したUserモデルに対して, belongs_toの関係を持つ.

#### 要素
|要素名|型|制約|用途|
|:-:|:-:|:-:|:-:|
|`id`|Integer|-|Taskに一意に割り当てられる番号|
|`title`|string|length < 128, presence: true|Taskの内容|
|`updated_at`|Date| - |自動的に保持|
|`created_at`|Date| - |ユーザ作成時の時刻を保持|
  
### Userモデル
 - ログインしたUserの要素を持つ.  
 - 後述するTaskモデルに対して, has_manyの関係を持つ.  
 - リンクしているUserが`destroy`されたときは, 関係のある`Task`も`destroy`される.

#### 要素
|要素名|型|制約|用途|
|:-:|:-:|:-:|:-:|
|`id`|Integer|-|Userに一意に割り当てられる番号|
|`name`|string|length < 33, presence: true|表示されるUserの名前|
|`unique_name`|string|length < 33, presence: true, unique|一意に定めるアカウント名|
|`email`|string|length < 129, unique|ログインの際に使用できる|
|`password`|string|4 < length < 33, presence: true|ログインの際に使用する|
|`updated_at`|Date| - |自動的に保持|
|`created_at`|Date| - |ユーザ作成時の時刻を保持|

### めも
`unique_name`があるなら, email要らないのでは?という気持ち.

## V(View)
Viewは散らかり過ぎて参っているので, どうにかしたい.  

とりあえず現状をまとめる.

### layouts
|ページ名|概要|o/x|
|:-:|:-:|:-:|
|_header.html.erb|ヘッダーに書く情報|o|
|_footer.html.erb|フッターに書く情報(要らない情報多めかも)|o|
|_shim.html.erb|下位ブラウザのために必要|o|
|application.html.erb|メイン(消してはならない)|o|

### sessions
|ページ名|概要|o/x|
|:-:|:-:|:-:|
|new.html.erb|Sign in用(使用を変えてemail -> unique_nameにするかも)|o|

### shared
|ページ名|概要|o/x|
|:-:|:-:|:-:|
|_task_form.html.erb|タスクを新しく作るやつ(え, これtaskのView要らんやん...)|o?|
|_error_messages.html.erb|エラーメッセージの表示(良くわかってない)|o|
|_user_info.html.erb|ユーザのinfoを表示するやつ(良くわかってない)|o(?)|

### static_pages
|ページ名|概要|o/x|
|:-:|:-:|:-:|
|home.html.erb|メインページとなる部分|o?|
|about.html.erb|ページの概要となる部分(あまり作れてない)|o?|
|help.html.erb|ページのヘルプ等を書くつもりだったがよくわかってない|o?|
|contact.html.erb|問い合わせがある場合はここに(もうTwitterIDだけ書いとけば良いかな...?|o?|

これ, static_pagesである意味あるか?

### tasks
|ページ名|概要|o/x|
|:-:|:-:|:-:|
|index.html.erb|タスクの一斉表示(これlayoutの_taskなんとかで良くないか?)|?|
|edit.html.erb|タスクのedit(これってこのページじゃないと無理なのか?)|o?|
|new.html.erb|タスクのCreate(これもViewをわざわざ用意する必要があるのか?)|o?|
|_task.html.erb|view/users/showのところでTasksを表示するときのパラメータっぽい|x?|

TasksってView要らない気がする(Viewは別にして, Controllerだけあれば良いと考えているので)

### users
 - Userを表示するときにgravator要るか?というお気持ち.

|ページ名|概要|o/x|
|:-:|:-:|:-:|
|index.html.erb|gravatorとname, emailを表示する(これってメニューバーで確認できそう?)|o?|
|new.html.erb|Userの新規登録(必要ではあるが, これもここである必要ってあるのか?)|o?|
|show.html.erb|Userの情報と関連しているTaskを表示(これindexでいい気がする)|x?|

 - こんなところだと思う.  
 - ?の部分は再考すべし

## C(Controller)
### application_controller.rb
|アクション(メソッド)名|概要|o/x|
|:-:|:-:|:-:|
|logged_in_user|ログインしているかを確認(true/false)|o|

### sessions_controller.rb
|アクション(メソッド)名|概要|o/x|
|:-:|:-:|:-:|
|create|ログイン後のセッションを作成|o|
|destroy|ログインしているセッションをdestroy|o|

### tasks_controller.rb
|アクション(メソッド)名|概要|o/x|
|:-:|:-:|:-:|
|index|Taskを全て返す|o|
|new|Taskを新規作成|o?|
|create|Taskを新しく作ってセーブ|o|
|edit|Taskを編集|o|
|update|Taskを更新|o|
|destroy|Taskを削除|o|
|task_params|strong_paramator|o|

### users_controller.rb
|アクション(メソッド)名|概要|o/x|
|:-:|:-:|:-:|
|index|Userを全て返す|o|
|new|Userを新規作成|o?|
|show|`:id`に対応したUserを表示|o|
|create|Userを新しく作ってセーブ|o|
|user_params|strong_paramator|o|
