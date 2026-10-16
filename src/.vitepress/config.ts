import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'

// GA4 の Measurement ID（G-XXXXXXXXXX）。空のあいだは計測タグを出さない（ADR 0003）
const GA_MEASUREMENT_ID = ''
const SITE_URL = 'https://task4233.dev'

// `vitepress build` は config の読み込み前に NODE_ENV=production を立てる。dev では計測しない
const gaHead: HeadConfig[] =
  GA_MEASUREMENT_ID && process.env.NODE_ENV === 'production'
    ? [
        ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}` }],
        ['script', {}, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`],
      ]
    : []

// locale key → URL / ファイルの prefix（root は prefix なし）
const LOCALE_PREFIX = { root: '', ja: 'ja/' } as const
const OG_LOCALE = { root: 'en_US', ja: 'ja_JP' } as const
type LocaleKey = keyof typeof LOCALE_PREFIX

// 'ja/card.md' → { locale: 'ja', basePath: 'card.md' }
function splitLocale(relativePath: string): { locale: LocaleKey; basePath: string } {
  for (const [locale, prefix] of Object.entries(LOCALE_PREFIX) as [LocaleKey, string][]) {
    if (prefix && relativePath.startsWith(prefix)) {
      return { locale, basePath: relativePath.slice(prefix.length) }
    }
  }
  return { locale: 'root', basePath: relativePath }
}

// cleanUrls 前提で 'ja/card.md' → '/ja/card'、'index.md' → '/'
function toUrlPath(relativePath: string): string {
  return '/' + relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}

export default defineConfig({
  title: 'Note',
  base: '/',
  cleanUrls: true,
  outDir: '../docs',
  lastUpdated: true,
  appearance: false,

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: 'Take it easy. But not lazy.',
      themeConfig: {
        nav: [
          { text: 'Links', link: '/#links' },
          { text: 'Card', link: '/card' },
          { text: 'Articles', link: 'https://blog.task4233.dev' },
        ],
        lastUpdated: {
          text: 'Last updated',
          formatOptions: { dateStyle: 'medium', timeStyle: 'short', forceLocale: true },
        },
      },
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      description: '気楽に、でも怠けずに。',
      themeConfig: {
        nav: [
          { text: 'Links', link: '/ja/#links' },
          { text: 'Card', link: '/ja/card' },
          { text: 'Articles', link: 'https://blog.task4233.dev' },
        ],
        lastUpdated: {
          text: '最終更新',
          formatOptions: { dateStyle: 'medium', timeStyle: 'short', forceLocale: true },
        },
        langMenuLabel: '言語を切り替える',
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
    },
  },

  head: [
    ['meta', { name: 'keywords', content: 'task4233, portfolio' }],
    ['link', { rel: 'icon', href: '/imgs/icons/icon.png' }],
    ['meta', { name: 'theme-color', content: '#1976D2' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'shortcut icon', href: '/imgs/icons/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://task4233.dev/imgs/icon.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ...gaHead,
  ],

  // 対になる他言語ページが存在する locale を frontmatter に載せる。
  // theme/locale-links.ts がこれを見て、言語切替から存在しないページを外す（ADR 0002）
  transformPageData(pageData, { siteConfig }) {
    const { basePath } = splitLocale(pageData.relativePath)
    pageData.frontmatter.availableLocales = (Object.keys(LOCALE_PREFIX) as LocaleKey[])
      .filter((locale) => existsSync(join(siteConfig.srcDir, LOCALE_PREFIX[locale] + basePath)))
  },

  // OGP と hreflang はページごとに値が変わるので head ではなくここで出す
  transformHead({ pageData, title, description }) {
    if (pageData.isNotFound) return
    const { locale, basePath } = splitLocale(pageData.relativePath)
    const available: LocaleKey[] = pageData.frontmatter.availableLocales ?? [locale]
    const tags: HeadConfig[] = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: SITE_URL + toUrlPath(pageData.relativePath) }],
      ['meta', { property: 'og:locale', content: OG_LOCALE[locale] }],
    ]
    if (available.length < 2) return tags
    for (const other of available) {
      const href = SITE_URL + toUrlPath(LOCALE_PREFIX[other] + basePath)
      if (other !== locale) tags.push(['meta', { property: 'og:locale:alternate', content: OG_LOCALE[other] }])
      tags.push(['link', { rel: 'alternate', hreflang: other === 'root' ? 'en' : other, href }])
      if (other === 'root') tags.push(['link', { rel: 'alternate', hreflang: 'x-default', href }])
    }
    return tags
  },

  vite: {
    resolve: {
      alias: [
        {
          // default theme 内部の useLangs を差し替える。VitePress の内部構成に依存するため、
          // 更新でパスが変わるとこの alias は当たらなくなり、標準の挙動に戻る（ADR 0002）
          find: /^\.{1,2}\/composables\/langs(\.js)?$/,
          replacement: fileURLToPath(new URL('./theme/locale-links.ts', import.meta.url)),
        },
      ],
    },
  },

  themeConfig: {
    externalLinkIcon: true,
  },
})
