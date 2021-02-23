module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.'
    }
  },
  base: '/',
  head: [
    [
      "link", {
        rel: "icon", href: "/favicon.ico"
      }
    ]
  ],
  dest: 'docs',
  plugins: [
    '@vuepress/pwa',
    '@vuepress/blog',
    'latex',
    ['@vuepress/google-analytics',
    {
      ga: 'UA-134364564-2',
    }],
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
  },
  extendMarkdown(md) {
    // TODO: markdown settings
  }
}
