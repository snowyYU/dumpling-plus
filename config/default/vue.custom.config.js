const vueDefaultConfig = {
  publicPath: './',
  outputDir: 'wms-view',
  assetsDir: 'static',
  lintOnSave: true,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  //webpack 配置的项目名称
  title: 'dumpling-plus',
  titleSeparator: ' - ',
  titleReverse: false,
  devPort: '9999',
  abbreviation: 'vt2at',
  providePlugin: {},
  build7z: false,
  startMessage: '欢迎使用',
}

module.exports = vueDefaultConfig
