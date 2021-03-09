module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.',
      head: [
        ['meta', {name: 'keywords', content: 'task4233, techblog'}],
        ['meta', {property: 'og:title', content: 'Note'}],
        ['meta',
          {
            name: 'og:description',
            content: 'Take it easy. But not lazy.',
          },
        ],
        ['meta', { property: 'og:locale', content: 'ja' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://task4233.dev' }],
        ['meta', { property: 'og:site_name', content: 'task4233 techblog' }],
        [
          'meta',
          {
            property: 'og:image',
            content: 'https://task4233.dev/icon.png',
          },
        ],
      ]
    }
  },
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'stylesheet', href: '/main.css'}],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico'}],
  ],
  dest: 'docs',
  plugins: [
    ['@vuepress/blog'],
    ['latex'],
    ['markdown-it-bar'],
    ['@vuepress/google-analytics',
    {
      ga: 'UA-134364564-2',
    }],
    ['@vuepress/search', {
      searchMaxSuggestions: 5
    }]
  ],
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 2,
    nav: [
      { text: 'Links'          , link: '/#links' },
      { text: 'Articles'       , link: '/list.html' },
      { text: 'Chukapi-Fun-Art', link: '/chukapi_fun_art.html' },
    ],
    lastUpdated: true,
    search: true,
  }
}
