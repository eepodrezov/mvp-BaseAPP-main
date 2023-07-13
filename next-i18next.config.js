const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
