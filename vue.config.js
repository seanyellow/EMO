const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import '@/assets/css/global.sass';`
      }
    }
  },
  configureWebpack: {
    plugins: [  // 3. 配置全局使用 jquery
      new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    })],
  },
  // 基本路径
  baseUrl: './',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
}
