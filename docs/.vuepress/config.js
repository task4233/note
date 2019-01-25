module.exports = {
  title: 'Hello VuePress',
  description: '',
  base: '/memo/',
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
    search: true,
    nav: [
      {
        text: 'index',
        link: '/'
      },
      {
        text: 'memo',
        link: '/memo.html'
      }
    ]
  }
}
