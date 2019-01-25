module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.'
    }
  },
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
    ]
  ],
  markdown: {
    anchor: {
      permalink: true
    },
    config: md => {
      md.use(require("markdown-it-katex"))
      md.options.linkify = true
    }
  },
  themeConfig: {
    nav: [
      { text: 'Config' , link: '/config.html'  },
      { text: 'Memo'   , link: '/memo.html'    },
      { text: 'Article', link: '/article.html' }
    ],
    search: true
  }
}
