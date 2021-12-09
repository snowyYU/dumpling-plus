# dumpling-plus

## usage

```
npm i dumpling-plus -S
```

```javascript
import DumplingPlus from "dumpling-plus";
import { downloadResponseById, uploadFile } from "@/apis/common";
app.use(DumplingPlus, { downloadResponseById, uploadFile });
```

## development

clone this project and `npm run serve`,it will start a demo project

## build

> initial version only has umd version bundle,others will come soon

```
npm run build:esm
```

## directory explain

```
├─ build         // 编辑打包脚本目录，用于存放脚本文件
│  ├─ rollup.config.js
├─ docs          // 文档目录，用于生成 vuepress 文档页面
│  ├─ .vuepress
│  ├─ guide
│  ├─ README.md
├─ src      // 用于示例展示
│  ├─ App.vue
│  ├─ main.ts
├─ packages      // 新增 packages 目录，用于编写存放组件，如dialog
│  ├─ index.ts
├─ typings      // 新增 typings 目录， 用于存放 .d.ts 文件，把 shims-vue.d.ts 移动到这里
│  ├─ shims-vue.d.ts
├─ .npmignore    // 新增 .npmignore 配置文件
├─ vue.config.js // 新增 vue.config.js 配置文件

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
