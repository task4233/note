module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Note',
      description: 'Take it easy. But not lazy.',
      head: [
        ['meta', {
          name: 'keywords',
          content: 'task4233, techblog'
        }],
      ]
    }
  },
  base: '/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/imgs/icons/icon.png'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['link', {
      rel: 'shortcut icon',
      href: '/imgs/icons/favicon.ico'
    }],
  ],
  dest: 'docs',
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 2,
    nav: [{
        text: 'Links',
        link: '/#links'
      },
      {
        text: 'Articles',
        link: 'https://blog.task4233.dev'
      },
      {
        text: 'Chukapi-Fun-Art',
        link: '/chukapi_fun_art.html'
      },
    ],
    lastUpdated: true,
    search: true,
  },
  plugins: [
    ['@vuepress/blog'],
    ['latex'],
    ['@vuepress/google-analytics',
      {
        ga: 'UA-134364564-2',
      }
    ],
    ['@vuepress/search', {
      searchMaxSuggestions: 5
    }],
    ['smooth-scroll'],
    ['@vuepress/back-to-top'],
    ['@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment');
          moment.locale(lang);
          return moment(timestamp).fromNow();
        }
      }
    ]
  ],
}
