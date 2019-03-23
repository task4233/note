---
date: 2019-03-21
description: 'VuePressの自動ビルド+デプロイ'
category:
 - vuepress
 - circleci
---

# CircleCIを用いたVuePressの自動ビルド+デプロイ
 - タイトルのとおりです

# はじめに
 - VuePressは毎回buildする必要があるので面倒
 - 誰かがCIを使って自動デプロイとか言ってたな
 - やってみるか

 - や　り　ま　し　た

# CircleCIのセッティング
 - インストール等のセッティングを行います
 - 本題を見たい方は, 本題まで飛んでください

## 初期設定
 - 大抵はつぎの公式ページに書かれています
 - 公式がちゃんとしているので書くことはあまりないですが, 流れだけざっとさらっていきます
 - 部分的に翻訳されているようです
   - [Welcome to CircleCI Documentation](https://circleci.com/docs/ja/2.0/)

### 1. 登録
 - つぎの公式記事の通りに進めれば問題ないはずです
   - [CircleCIを始める](https://circleci.com/docs/ja/2.0/first-steps/#section=getting-started)

### 2.ssh-keyの設定
 - つぎの記事の通りに進めれば問題ないはずです
   - [Circle CI で Github に write access 可能な Deploy key を設定する](https://qiita.com/boushi-bird@github/items/6b6eb1d1ed6f6d3341e4)
   - [CircleCI に SSH 鍵を登録する](https://circleci.com/docs/ja/2.0/add-ssh-key/)

::: danger 注意
 - **パスフレーズ付きのrsa鍵だとCircleCI側から認められないので注意してください**
   - これに騙されました
:::
 
### 3.CircleCI CLIツールのインストール
 - つぎの公式記事の通りに進めれば問題ないはずです
   - [Installation](https://circleci.com/docs/ja/2.0/local-cli/#installation)

 - CircleCI CLIツールでは, つぎのようなことができます
   - CI config(.circleci/config.yml)のデバッグとvalidation
   - ローカルでのジョブ実行
   - CircleCIのAPI利用
   - CircleCI Orbs関連


 - インストールするコマンドだけ残しておきます
 - MacとLinuxでは次のコマンドでインストールできるようです
 - 念の為アップデートまで含めたコマンドを書いておきます
 
```bash
# install
$ curl -fLSs https://circle.ci/cli | bash 
# update
$ circleci update
$ circleci switch
```

 - インストールしている際に, `permission denied`が発生することがあるようです
 - その時はつぎのようにコマンドを変更して対処してください

```bash
```

## .circleci/config.ymlファイルの作成
 - CircleCIの動作を定義するymlファイルを作成します
 - 記法についてはつぎの記事の通りに書けば問題ないはずです
   - [Configuring CircleCI](https://circleci.com/docs/2.0/configuration-reference/)

::: danger 注意
 - **インデントでerrorになることが多いです**
 - 注意しましょう
   - これで小一時間溶かしました
:::

 - 雛形は, 先ほどの記事の下の方にあります
   - [Full Example](https://circleci.com/docs/2.0/configuration-reference/#full-example)


## 作成したファイルのvalidation
 - つぎの公式記事の通りに進めれば問題ないはずです
   - [Validate A CircleCI Config](https://circleci.com/docs/2.0/local-cli/#validate-a-circleci-config)

 - 次のコマンドでvalidationができます
   - ただし, config.ymlは`.circleci/config.yml`に配置しましょう
 
```bash
$ circleci config validate
# Config file at .circleci/config.yml is valid
```

# 本題
 - タイトルで触れている自動ビルド + デプロイの部分に入っていきます
 - 全体の流れはつぎのとおりです
 - 四角で囲まれた部分をCircleCIを用いて構築していきます

 - CircleCIにやってもらいたいことは, つぎの2つです
   - `$ yarn src:build`の実行
   - 実行後にできた`./docs`以下のファイルを`gh-pages`ブランチに配置

 - しかし, いずれもnodeのパッケージをインストールしておく必要があります
 - その処理を書いてから, 先ほどの2つの処理を加えていきます

## 0. nodeのパッケージインストール
 - nodeのパッケージをインストールするためには, つぎのように書きます
 - `restore_cache`と`save_cache`でnode_moduleのキャッシュを残しておくものです
 
```yml
// .circleci/config.yml
+ version: 2
+ jobs:
+   build:
+     docker:
+       - image: node:8.12
+     working_directory: ~/task4233/note
+     steps:
+       - checkout
+       - restore_cache:
+           key: yarn-{{ .Branch }}-{{ checksum "yarn.lock" }}
+       - run:
+           name: Install dependencies
+           command: yarn
+       - save_cache:
+           key: yarn-{{ .Branch }}-{{ checksum "yarn.lock" }}
+           paths:
+             - ./node_modules
+
+ workflows:
+   version: 2
+   build-deploy:
+     jobs:
+       - build
```

## 1. `$ yarn src:build`の実行
 - これは簡単です
 - つぎのように, `.circleci/config.yml`に追記します

```yml
// .circleci/config.yml
version: 2
jobs:
  build:
    docker:
      - image: node:8.12
    working_directory: ~/task4233/note
    steps:
      - checkout
      - restore_cache:
          key: yarn-{{ .Branch }}-{{ checksum "yarn.lock" }}
      - run:
          name: Install dependencies
          command: yarn
      - save_cache:
          key: yarn-{{ .Branch }}-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
 +     - run:
 +         name: Build
 +         command: yarn src:build

workflows:
  version: 2
  build-deploy:
    jobs:
      - build
```

## 2. `gh-pages`ブランチに配置
 - そのようなスクリプトは存在していないので, スクリプトを作成して`.circleci/config.yml`に追記します

### スクリプトの作成
 - `gh-pages`ブランチに`./docs`以下のファイルを配置するために, nodejsの`gh-pages`パッケージを利用します
 - つぎのように新たに`deploy.js`を書きます

```js
// deploy.js
+ var ghpages = require("gh-pages");
+
+ ghpages.publish("./docs", {
+     user: {
+         name: "{YOUR_NAME}",
+         email: "{YOUR_EMAIL}"
+     },
+     message: "Auto build and deploy [ci skip]"
+ }, function(err) {
+     if (err) {
+         console.log(err);
+         process.exit(1);
+     } else {
+         console.log("Successfully Delployed!");
+     }
+ });
```

 - 6,7行目は自身のものに変更してください
 - 9行目でわざわざmessageを記載しているのは, コミットメッセージに`[ci skip]`を付与することで`gh-pages`ブランチでCircleCIを動作させないためです
   - `gh-pages`ブランチは公開用ブランチなので, `gh-pages`ブランチではCircleCIを動作させません

### スクリプトを実行するコマンドの追記
 - このjsファイルを実行させるためのコマンドを`package.json`に追記します
 - 他の部分は私の設定なので, 自身の`package.json`に7行目の内容のみ追記してください

```js
// package.json
{
    "name": "pg",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
+       "deploy": "node ./deploy.js",
        "src:dev": "vuepress dev src --port 3030",
        "src:build": "rm -rf ./docs && vuepress build src"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/task4233/note.git"
    },
    "author": "task4233",
    "license": "ISC",
    "devDependencies": {
        "markdown-it": "^8.4.2",
        "markdown-it-katex": "^2.0.3",
        "markdown-it-task-lists": "^2.1.1",
        "vuepress": "^0.14.8"
    },
    "dependencies": {
        "gh-pages": "^2.0.1"
    }
}
```

### .circleci/config.ymlへの追記
 - コマンドが完成したので, `.circleci/config.yml`に追記します
 - つぎのように追記します

```yml
version: 2
jobs:
  build:
    docker:
      - image: node:8.12
    working_directory: ~/task4233/note
    steps:
      - checkout
      - restore_cache:
          key: yarn-{{ .Branch }}-{{ checksum "yarn.lock" }}
      - run:
          name: Install dependencies
          command: yarn
      - save_cache:
          key: yarn-{{ .Branch }}-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
      - run:
          name: Build
          command: yarn src:build
 +    - run:
 +        name: Deploy
 +        command: yarn deploy

workflows:
  version: 2
  build-deploy:
    jobs:
      - build
```

### 書いた.circleci/config.ymlのvalidate
 - githubにpushしてから`config.yml`のせいでエラーがでると悲しくなるので, ローカルでvalidateします
 - つぎのコマンドでvalidateできます

```bash
$ circleci config validate -c {config.ymlまでのファイルパス}
# circleci config validate -c ./.circleci/config.yml
# Config file at ./.circleci/config.yml is valid.
```

