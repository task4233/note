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
        ['meta', {
          property: 'og:title',
          content: 'Note'
        }],
        ['meta',
          {
            name: 'og:description',
            content: 'Take it easy. But not lazy.',
          },
        ],
        ['meta', {
          property: 'og:locale',
          content: 'ja'
        }],
        ['meta', {
          property: 'og:type',
          content: 'website'
        }],
        ['meta', {
          property: 'og:url',
          content: 'https://task4233.dev'
        }],
        ['meta', {
          property: 'og:site_name',
          content: 'task4233 techblog'
        }],
        [
          'meta',
          {
            property: 'og:image',
            content: 'https://task4233.dev/icon.png',
          },
        ],
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
        link: '/tags/'
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
    ['@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          "/": {
            message: "新しいコンテンツがあります。",
            buttonText: "更新する",
          },
        },
      }
    ],
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
