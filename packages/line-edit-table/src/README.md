## 2021.09.07

### LineEditTable Attributes

| 参数             | 说明                               | 类型    | 可选值         | 默认值 |
| ---------------- | ---------------------------------- | ------- | -------------- | ------ |
| columns          | 列表项目配置                       | Array   |                | —      |
| data             | 列表数据，支持 v-model 双向绑定    | Array   |                | —      |
| mode             | 列表模式                           | Mode    | edit \| detail | edit   |
| is-index         | 序号列显示状态                     | boolean |                | false  |
| index-props      | 序号列参数，参考 Table-column 参数 | object  |                | —      |
| show-operation   | 操作列                             | boolean |                | true   |
| operation-props  | 操作列参数，参考 Table-column 参数 | object  |                | —      |
| loading          | 列表加载状态                       | boolean |                | false  |
| show-plus-button | 新增按钮显示状态                   | boolean |                | true   |

### LineEditTable Methods

| 方法名        | 说明                       | 参数 |
| ------------- | -------------------------- | ---- |
| validate      | 与 Form validate 相同      | -    |
| clearValidate | 与 Form clearValidate 相同 | -    |

### LineEditTable Events

| 事件名称       | 说明                    | 回调参数                                           |
| -------------- | ----------------------- | -------------------------------------------------- |
| delete-click   | 点击删除按钮            | -                                                  |
| plus-click     | 点击新增行按钮          | -                                                  |
| input          | 在 Input 值改变时触发   | (key: string, value: string \| number, scope: any) |
| blur           | 在 Input 失去焦点时触发 | (key: string, scope: any)                          |
| change         | 选中值发生变化时触发    | (key: string, value: any, scope: any)              |
| visible-change | 下拉框出现/隐藏时触发   | (key: string, value: boolean, scope: any)          |

### columns

| 参数       | 说明                   | 类型   | 可选值 | 默认值 |
| ---------- | ---------------------- | ------ | ------ | ------ |
| prop       | 参考 Table-column 参数 | string |        | —      |
| label      | 参考 Table-column 参数 | string |        | —      |
| type       | 表单控件类型           | string |        | —      |
| fieldProps | 表单控件参数           | Object |        | —      |
| rules      | 表单校验规则           | Array  |        | —      |

> columns 是一个数组

### 参考文档

[Table](https://element-plus.org/#/zh-CN/component/table)

[Form](https://element-plus.org/#/zh-CN/component/form)

[Input](https://element-plus.org/#/zh-CN/component/input)

[InputNumber](https://element-plus.org/#/zh-CN/component/input-number)

[Select](https://element-plus.org/#/zh-CN/component/select)
