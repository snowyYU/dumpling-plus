/**
* 在这个文件可设置一些公关的东西
*/
import elementPlus from 'element-plus'
import { app } from '@storybook/vue3'
import "element-plus/dist/index.css"
import "normalize.css"
app.use(elementPlus)

// 
// import packages from '~/index'
// packages.install(app)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    // 展示完整控件文档
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}