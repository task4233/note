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
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'stylesheet', href: "/main.css"}],
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
