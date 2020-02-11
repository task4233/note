(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{256:function(e,t,a){"use strict";a.r(t);var s=a(0),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"vuepressのconfigめも"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepressのconfigめも"}},[e._v("#")]),e._v(" VuePressのConfigめも")]),e._v(" "),a("h1",{attrs:{id:"はじめに"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#はじめに"}},[e._v("#")]),e._v(" はじめに")]),e._v(" "),a("p",[e._v("これは, 私なりにVuePressを読んだ時のメモです.\n詳しくは, "),a("a",{attrs:{href:"https://vuepress.vuejs.org/config",target:"_blank",rel:"noopener noreferrer"}},[e._v("公式"),a("OutboundLink")],1),e._v("をみてね.")]),e._v(" "),a("h1",{attrs:{id:"config-reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#config-reference"}},[e._v("#")]),e._v(" Config Reference")]),e._v(" "),a("h2",{attrs:{id:"記法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#記法"}},[e._v("#")]),e._v(" 記法")]),e._v(" "),a("h3",{attrs:{id:"type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type"}},[e._v("#")]),e._v(" Type")]),e._v(" "),a("p",[e._v("設定されるパラメータの型を示すよ."),a("br"),e._v("\n例えば, base: "),a("code",[e._v("string")]),e._v("と書かれている場合は, string(文字列)型をそこに設定してね."),a("br"),e._v("\nだから, この場合は"),a("code",[e._v("base: '/home/'")]),e._v("のように書けば良いね.")]),e._v(" "),a("h3",{attrs:{id:"default"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#default"}},[e._v("#")]),e._v(" Default")]),e._v(" "),a("p",[e._v("何も設定しない場合に入る値が書かれているよ."),a("br"),e._v("\n例えば, Default: "),a("code",[e._v("/")]),e._v("と書かれている場合は, "),a("code",[e._v("'/'")]),e._v("がデフォルトで設定されているということになるね."),a("br"),e._v(" "),a("code",[e._v("undefined")]),e._v("と書かれていることもあって, そのときはデフォルトで何も設定されていないということになるよ.")]),e._v(" "),a("h2",{attrs:{id:"basic-config"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#basic-config"}},[e._v("#")]),e._v(" Basic Config")]),e._v(" "),a("h3",{attrs:{id:"base"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#base"}},[e._v("#")]),e._v(" base")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("string")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("/")]),a("br"),e._v("\nこの要素がデプロイされる場所になるよ."),a("br"),e._v("\nもしsubpathを使うときは, "),a("code",[e._v("/sub/")]),e._v("のように書くと, "),a("code",[e._v("hoge.jp/sub/")]),e._v("のようになるね.")])]),e._v(" "),a("h3",{attrs:{id:"title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#title"}},[e._v("#")]),e._v(" title")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("string")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("undefined")]),a("br"),e._v("\nこの要素がサイトのタイトルになるよ."),a("br"),e._v("\nデフォルトだと, 全てのページのnavbar(デフォルトだと左上)に表示されるよ.")])]),e._v(" "),a("h3",{attrs:{id:"description"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#description"}},[e._v("#")]),e._v(" description")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("string")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("undefined")]),a("br"),e._v("\nこの要素がサイトの説明文になるよ."),a("br"),e._v("\n全てのページの"),a("code",[e._v("<meta>")]),e._v("タグとして, htmlファイルに出力されるよ.")])]),e._v(" "),a("h3",{attrs:{id:"head"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#head"}},[e._v("#")]),e._v(" head")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("Array")])]),e._v(" "),a("li",[e._v("Defalut: "),a("code",[e._v("[]")]),a("br"),e._v("\nこの要素が, 生成されるhtmlファイルの"),a("code",[e._v("<head>")]),e._v("要素に挿入されるよ."),a("br"),e._v("\nいずれのタグも以下の様式で書いてね."),a("br"),e._v(" "),a("code",[e._v("[タグ名, { 要素名: 要素の値 }, ...]")]),a("br"),e._v("\n例えば, faviconの設定は以下のようになるね.")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# .vuepress/config.js\nmodule.exports = {\n  head: [\n    ['link',\n      {\n        rel: 'icon',\n        href: '/logo.png'\n      }\n    ]\n  ]\n}\n")])])]),a("h3",{attrs:{id:"host"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#host"}},[e._v("#")]),e._v(" host")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("string")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("'0.0.0.0'")]),a("br"),e._v("\nこの要素が, dev serverの出力host番号になるよ.")])]),e._v(" "),a("h3",{attrs:{id:"port"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#port"}},[e._v("#")]),e._v(" port")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("number")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("8080")]),a("br"),e._v("\nこの要素が, dev serverの出力port番号になるよ.")])]),e._v(" "),a("h3",{attrs:{id:"dest"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dest"}},[e._v("#")]),e._v(" dest")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("string")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v(".vuepress/dist")]),a("br"),e._v("\nこの要素が, "),a("code",[e._v("$ vuepress build")]),e._v("を叩いた時の出力ディレクトリになるよ."),a("br"),e._v("\n出力されるものは, *.htmlがメイン.")])]),e._v(" "),a("h3",{attrs:{id:"ga"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ga"}},[e._v("#")]),e._v(" ga")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("string")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("undefined")]),a("br"),e._v("\nこの要素は, Google Analytics IDを使いたいときに設定してね.")])]),e._v(" "),a("h3",{attrs:{id:"locales"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#locales"}},[e._v("#")]),e._v(" locales")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("{ [path: string]: Object }")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("undefined")]),a("br"),e._v("\nこの要素は, i18nサポート(国際化)のために場所を決定するよ."),a("br"),e._v("\n例えば, 英語と日本語に対応したいときは以下のようになる.")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("module.exports = {\n  locales: {\n    // The key is the path for the locale to be nested under.\n    // As a special case, the default locale can use '/' as its path.\n    '/': {\n      lang: 'ja-JP',\n      title: 'VuePress',\n      description: 'Vue静的サイトジェネレータ'\n    '/en/': {\n      lang: 'en-US', // this will be set as the lang attribute on <html>\n      title: 'VuePress',\n      description: 'Vue-powered Static Site Generator'\n    },\n    }\n  }\n}\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);