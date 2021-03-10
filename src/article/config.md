---
date: 2019-01-25
description: 'VuePress公式のConfigについて読んだ時のメモ'
tags:
 - VuePress
---

# VuePressのConfigめも
# はじめに
これは, 私なりにVuePressを読んだ時のメモです.
詳しくは, [公式](https://vuepress.vuejs.org/config)をみてね.

# Config Reference

## 記法
### Type
設定されるパラメータの型を示すよ.  
例えば, base: `string`と書かれている場合は, string(文字列)型をそこに設定してね.  
だから, この場合は`base: '/home/'`のように書けば良いね.  

### Default
何も設定しない場合に入る値が書かれているよ.  
例えば, Default: `/`と書かれている場合は, `'/'`がデフォルトで設定されているということになるね.  
`undefined`と書かれていることもあって, そのときはデフォルトで何も設定されていないということになるよ.

## Basic Config
### base
 - Type: `string`
 - Default: `/`  
この要素がデプロイされる場所になるよ.  
もしsubpathを使うときは, `/sub/`のように書くと, `hoge.jp/sub/`のようになるね.

### title
 - Type: `string`
 - Default: `undefined`  
この要素がサイトのタイトルになるよ.  
デフォルトだと, 全てのページのnavbar(デフォルトだと左上)に表示されるよ.

### description
 - Type: `string`
 - Default: `undefined`  
この要素がサイトの説明文になるよ.  
全てのページの`<meta>`タグとして, htmlファイルに出力されるよ.

### head
 - Type: `Array`
 - Defalut: `[]`  
この要素が, 生成されるhtmlファイルの`<head>`要素に挿入されるよ.  
いずれのタグも以下の様式で書いてね.  
`[タグ名, { 要素名: 要素の値 }, ...]`  
例えば, faviconの設定は以下のようになるね.  
```
# .vuepress/config.js
module.exports = {
  head: [
    ['link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ]
  ]
}
```

### host
 - Type: `string`
 - Default: `'0.0.0.0'`  
この要素が, dev serverの出力host番号になるよ.  

### port
 - Type: `number`
 - Default: `8080`  
この要素が, dev serverの出力port番号になるよ.

### dest
 - Type: `string`
 - Default: `.vuepress/dist`  
この要素が, `$ vuepress build`を叩いた時の出力ディレクトリになるよ.  
出力されるものは, *.htmlがメイン.

### ga
 - Type: `string`
 - Default: `undefined`  
この要素は, Google Analytics IDを使いたいときに設定してね.

### locales
 - Type: `{ [path: string]: Object }`
 - Default: `undefined`  
この要素は, i18nサポート(国際化)のために場所を決定するよ.  
例えば, 英語と日本語に対応したいときは以下のようになる.  
```
module.exports = {
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'ja-JP',
      title: 'VuePress',
      description: 'Vue静的サイトジェネレータ'
    '/en/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    }
  }
}
```