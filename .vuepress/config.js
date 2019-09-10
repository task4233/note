module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.'
    }
  },
  head: [
    ['link',
     {
       rel: 'stylesheet',
       href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'
     }
    ],
    ['link',
     {
       rel: 'stylesheet',
       href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css'
     }
    ],
  ],
  
  base: '/note/',
  dest: 'docs',
  plugins: [
    'latex',
    ['@vuepress/google-analytics',
     {
       ga: 'UA-134364564-2',
     }
    ]
  ],
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 2,
    nav: [
      { text: 'About'        , link: '/about.html' },
      { text: 'Articles'       , link: '/list.html' },
      { text: 'Chukapi-Fun-Art', link: '/chukapi_fun_art.html' },
    ],
    lastUpdated: true,
    search: true,
  }
}
