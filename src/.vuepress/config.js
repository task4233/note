module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Note',
      description: 'Take it easy. But not lazy.'
    }
  },
  base: '/',
  dest: 'docs',
  plugins: [
    '@vuepress/blog',
    'latex',
    '@vuepress/google-analytics',
    {
      ga: 'UA-134364564-2',
    }
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
