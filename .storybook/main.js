const { mergeConfig } = require('vite')
const { resolve } = require('path')

module.exports = {
  // stories来源
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  /**
   * 插件
   * https://storybook.js.org/addons
   */
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-storysource", // 源码插件
  ],
  // 框架
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },

  /**
   * vite扩展自定义配置
   * configType as env: 模式，值为"DEVELOPMENT" or "PRODUCTION".
   */
  async viteFinal(config, { configType: env }) {

    // 可在cmd打印出信息
    // console.log( 'config', config )

    return mergeConfig(config, {
      base: './',
      resolve: {
        alias: {
          "@": resolve("src"),
          "*": resolve(""),
          "~": resolve("packages"),
        },
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          }
        ]
      },
    });
  },
}