---
date: 2019-02-07
description: 'VuePressをはじめて気づいたこととか'
tags: 
 - VuePress
---

# Memo(VuePress)
# コマンド(2019-01-26)
開発時のコマンドは, 
`$ yarn docs:dev`

このコマンドは, `package.json`で設定可能。

# レイアウトおよびmarkdown
`/.vuepress/theme/Layout.vue`で設定可能。  

# Markdown Slot
`:::`でスロットを作れるらしいが, 上手くいかない。  
あとでまたやる。  
https://vuepress.vuejs.org/guide/markdown-slot.html#why-do-i-need-markdown-slot

# Vueやりますか
## 要件
```
$ node -v
v8.12.0

$ npm -v  
6.4.1

// インストール
$ npm install -g vue-cli

$ vue --version
2.9.6
```

## ポート指定
 - ポート指定は`config/index.js`で設定可能
 - ポートの許可は
   - Vagrantfileのfowarding_port
   - /etc/sysconfig/iptablesで許可する
   - ホスト側のセキュリティソフト等も確認する

## componentsフォルダ内の*.vueファイルでしていること
::: tip
 - `<template>`にhtml構造の記述
 - `<script>`にjsを記述(htmlに書かれているmsgもここで定義)
 - `<style>`にcssを記述
:::
以上の3点をまとめて, `*.vue`に記述。

## checkboxの追加(2019-01-27)
以下のpackageで追加可能.  
ただし, staticなので注意.  
[markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists)

## Computedとmethods, watchの違い(2019-01-30)
|Property Name|Speed|Details|
|:-:|:-:|:-:|
|`Computed`|高速|値は依存関係に基づきキャッシュされ, 依存元が変更されない限りはメモ化された値を返す|  
|`methods`|普通|依存元が刻々と変化する場合に用いられる|
|`watch`|速い|データが変わるのに応じて非同期やコストの高い処理を実行したいときに, ウォッチャとして扱うのに向いている|


 - [算出プロパティとウォッチャ](https://jp.vuejs.org/v2/guide/computed.html)

## リンクをBase依存にする
`$withBase`を使えば良い.  
e.g.)  
```vue
<img :src="withBase('/foo.png')" alt="foo">
```
 - [Base URL](https://vuepress.vuejs.org/guide/assets.html#base-url)

## sass対応する(2/7)
`$ npm install sass-resources-loader --save-dev`でインストールできる

## 1.x系にしたときのtheme
 - themeは, src/.vuepress/theme/stylesにある
 - index.stylではなく直接編集した方が楽
 
# 参考資料
 - [vue-cliでVue.jsをインストールしたときのファイルについて](https://qiita.com/magaya0403/items/2b5d9641592df0c7cba2)
 - [webpack4対応webpack-dev-serverの主要な設定オプション(CLI,webpack.config.js)の意味と挙動](https://qiita.com/riversun/items/d27f6d3ab7aaa119deab)
 - [TypeScriptでVue.jsを書く – Vue CLIを使った開発のポイントを紹介](https://mae.chab.in/archives/60167)
 - [はじめに](https://jp.vuejs.org/v2/guide/index.html)
 - [Config.jsの公式](https://vuepress.vuejs.org/config/#basic-config)
 - [VuePressでディレクトリ構成からサイドバーのメニューを自動設定する](https://qiita.com/jacoyutorius/items/ad769d5e303d222f215a)
 - [算出プロパティとウォッチャ](https://jp.vuejs.org/v2/guide/computed.html)
 - [Asset Handling](https://vuepress.vuejs.org/guide/assets.html#asset-handling)