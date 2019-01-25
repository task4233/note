module.exports = {
  locales: {
  },
  title: 'Note',
  description: 'つらつらと書いていきます',
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
  }
}
