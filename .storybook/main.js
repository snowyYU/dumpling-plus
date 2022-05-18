const { mergeConfig } = require('vite')
const { resolve } = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },

  // "DEVELOPMENT" or "PRODUCTION".
  async viteFinal(config, { configType: env }) {
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