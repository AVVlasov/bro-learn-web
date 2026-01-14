const pkg = require('./package')

module.exports = {
  apiPath: 'stubs/api',
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`
    }
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    'bro-learn-web.main': '/bro-learn-web',
    'link.bro-learn-web.auth': '/auth'
  },
  features: {
    'bro-learn-web': {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    'bro-learn-web.api': '/api'
  },
  // Путь к кастомному HTML-шаблону prom-режима (оставьте undefined чтобы использовать дефолт)
  htmlTemplatePath: undefined
}
