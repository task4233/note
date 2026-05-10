import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import mark from 'markdown-it-mark'

const GA_ID = 'UA-134364564-2'

export default defineConfig({
  lang: 'ja-JP',
  title: 'Note',
  description: 'Take it easy. But not lazy.',
  base: '/',
  cleanUrls: false,
  outDir: '../docs',
  lastUpdated: true,
  appearance: false,

  head: [
    ['meta', { name: 'keywords', content: 'task4233, techblog' }],
    ['link', { rel: 'icon', href: '/imgs/icons/icon.png' }],
    ['meta', { name: 'theme-color', content: '#1976D2' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'shortcut icon', href: '/imgs/icons/favicon.ico' }],
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` }],
    ['script', {}, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`],
  ],

  srcExclude: ['tags/**'],

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('mjx-'),
      },
    },
  },

  themeConfig: {
    externalLinkIcon: true,
    nav: [
      { text: 'Links', link: '/#links' },
      { text: 'Articles', link: 'https://blog.task4233.dev' },
      { text: 'Chukapi-Fun-Art', link: '/chukapi_fun_art.html' },
    ],
    outline: { level: [2, 3] },
    // search: Phase 2 で有効化（rails_todo.md の重複 heading id を直してから）
    lastUpdated: { text: '最終更新' },
  },

  markdown: {
    config: (md) => {
      md.use(mathjax3)
      md.use(mark)
    },
  },
})
