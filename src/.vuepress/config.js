module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.'
    }
  },
  base: '/',head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
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
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
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
