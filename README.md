# dumpling-plus

business components base element-plus

strongly recomend use pnpm to manage packages

## about tech & libs

- [element-plus](https://element-plus.org/zh-CN/)
- [strory-book](https://storybook.js.org/docs/7.0/vue/get-started/introduction)
- [pnpm](https://pnpm.io/)
- [vite](https://vitejs.dev/)

## usage

```
pnpm add dumpling-plus
```

```javascript
import DumplingPlus from "dumpling-plus";
app.use(DumplingPlus);
```

```javascript
// 使用上传组件
import DumplingPlus from "dumpling-plus";
import { downloadResponseById, uploadFile } from "@/apis/common";
app.use(DumplingPlus, { downloadResponseById, uploadFile });
```

## development

clone this project and `pnpm storybook`,it will start a storybook project

## build

> initial version only has umd version bundle,others will come soon

```shell
# pnpm build:esm
pnpm build:rollup-umd
npm version patch
npm publish
```

## directory explain

```
├─ build         // 编辑打包脚本目录，用于存放脚本文件
│  ├─ rollup.config.js
├─ docs          // 文档目录，用于生成 vuepress 文档页面 (deprecated)
│  ├─ .vuepress
│  ├─ guide
│  ├─ README.md
├─ src      // 用于示例展示
│  ├─ stories   // 各个stories
├─ packages      // packages 目录，用于编写存放组件，如dialog
│  ├─ index.ts
├─ typings      // 新增 typings 目录， 用于存放 .d.ts 文件，把 shims-vue.d.ts 移动到这里
│  ├─ shims-vue.d.ts
├─ .npmignore    // 新增 .npmignore 配置文件
├─ vite.config.js // 新增 vite.config.js 配置文件

```

## scripts explain (build:lib && build had been deprecated)

```
"scripts": {
    "build": "yarn build:clean && yarn build:lib && yarn build:esm-bundle && rimraf lib/demo.html",
    "build:clean": "rimraf lib",
    "build:lib": "vue-cli-service build --target lib --name index --dest lib packages/index.ts",
    "build:esm-bundle": "rollup --config ./build/rollup.config.js"
}
```

- --target: 构建目标，默认为应用模式。改为 lib 启用库模式。
- --name: 输出文件名
- --dest : 输出目录，默认 dist。改成 lib
- [entry]: 入口文件路径，默认为 src/App.vue。这里我们指定编译 packages/ 组件库目录。

## reference

- [zhihu](https://zhuanlan.zhihu.com/p/423793783)
- [Developing personal component library with rollup + vue3](https://qdmana.com/2021/05/20210509184821450j.html)
- [Component Library( Vue 3 + Rollup)](https://dev.to/shubhadip/vue-3-component-library-270p)
- [compile SFC style failure](https://github.com/team-innovation/vue-sfc-rollup/issues/79)
