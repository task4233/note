module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.'
    }
  },
  ga: 'UA-134364564-2',
  base: '/note/',
  dest: 'docs',
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
  plugins: [
    '@vuepress/blog',
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
  },
}
