## 2021.09.07

将 item 上的 visible 属性移至上层 col 中，使之 visible 为 false 时不会有占位空间

## 2021.08.27

```javascript
const schema = [
  {
    key: "",
    label: "",
    type: "",
    formItemProps: {},
    fieldProps: {},
    span: 8,
    customLabel: false,
    customError: false,
    formAreaTitleType: "",
    height: "",
    visible: false,
    ref: "",
  },
];
```

### props

| 参数 | 说明       | 类型   | 可选值                                                                                                                             | 默认值 |
| ---- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| type | 表单项类型 | string | input / input-number / textarea / select / cascader / radio / checkbox / switch / time-select / time-picker / date-picker / custom | —      |

更多可用参数参考 element 文档

[Form](https://element-plus.org/#/zh-CN/component/form)

[Layout](https://element-plus.org/#/zh-CN/component/layout)

[Input](https://element-plus.org/#/zh-CN/component/input)

[InputNumber](https://element-plus.org/#/zh-CN/component/input-number)

[Select](https://element-plus.org/#/zh-CN/component/select)

[Cascader](https://element-plus.org/#/zh-CN/component/cascader)

[Radio](https://element-plus.org/#/zh-CN/component/radio)

[Checkbox](https://element-plus.org/#/zh-CN/component/checkbox)

[Switch](https://element-plus.org/#/zh-CN/component/switch)

[TimeSelect](https://element-plus.org/#/zh-CN/component/time-select)

[TimePicker](https://element-plus.org/#/zh-CN/component/time-picker)

[DatePicker](https://element-plus.org/#/zh-CN/component/date-picker)
