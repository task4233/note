import { defineConfig } from 'vitepress'

const GA_ID = 'UA-134364564-2'

export default defineConfig({
  lang: 'ja-JP',
  title: 'Note',
  description: 'Take it easy. But not lazy.',
  base: '/',
  cleanUrls: true,
  outDir: '../docs',
  lastUpdated: true,
  appearance: false,

  head: [
    ['meta', { name: 'keywords', content: 'task4233, portfolio' }],
    ['link', { rel: 'icon', href: '/imgs/icons/icon.png' }],
    ['meta', { name: 'theme-color', content: '#1976D2' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'shortcut icon', href: '/imgs/icons/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://task4233.dev/imgs/icon.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` }],
    ['script', {}, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`],
  ],

  themeConfig: {
    externalLinkIcon: true,
    nav: [
      { text: 'Links', link: '/#links' },
      { text: 'Card', link: '/card' },
      { text: 'Articles', link: 'https://blog.task4233.dev' },
    ],
    lastUpdated: {
      text: '最終更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
        forceLocale: true,
      },
    },
    sidebarMenuLabel: 'メニュー',
    returnToTopLabel: 'トップへ戻る',
    skipToContentLabel: 'コンテンツへスキップ',
    notFound: {
      title: 'ページが見つかりません',
      quote: '',
      linkText: 'トップへ戻る',
      linkLabel: 'トップに戻る',
    },
  },
})
