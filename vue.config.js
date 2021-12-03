const { resolve } = require("path");
const path = require("path");
const WebpackBar = require("webpackbar");
const dayjs = require("dayjs");
const time = dayjs().format("YYYY-M-D HH:mm:ss");
process.env.VUE_APP_UPDATE_TIME = time;
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
} = require("./config/default/vue.custom.config");
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  configureWebpack() {
    return {
      devtool: "source-map",
      resolve: {
        alias: {
          "@": resolve("src"),
          "*": resolve(""),
          "~": resolve("packages"),
        },
        fallback: {
          path: require.resolve("path-browserify"),
        },
      },
      module: {
        rules: [
          {
            test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
            loader: "@intlify/vue-i18n-loader",
            include: [
              // Use `Rule.include` to specify the files of locale messages to be pre-compiled
              path.resolve(__dirname, "src/lang"),
            ],
          },
        ],
      },
      plugins: [
        new WebpackBar({
          name: title,
        }),
      ],
    };
  },
};
