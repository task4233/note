module.exports = {
  base: '/note/',
  dest: 'docs',
  extendMarkdown(md) {
    md.use(require('markdown-it-katex'))
    md.use(require('markdown-it-task-lists'))
    md.set({
      breaks: true,
      linkify: true
    })
  },
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
  plugins: [
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
      { text: 'About'        , link: '/about/' },
      { text: 'Articles'       , link: '/lists/' },
      { text: 'Chukapi-Fun-Art', link: '/chukapi_fun_art/' },
    ],
    lastUpdated: true,
    search: true,
  }
}
