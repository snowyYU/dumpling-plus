# 新增功能

## 2021.03.30

- 增加参数 useTooltip 表格内容默认显示三行，超出部分省略，通过 Tooltip 方式显示

## 3.14

- 增加 loading 状态，更新组件属性文档

## 3.10

- 增加删除的确认框,deleteConfirm

## 3.5

- 调整 td 标签 padding 为 10px 0（原先为 12px 0）

## 2.27

- 添加组件文档
- 添加参数 operationFixed 控制操作列是否固定，默认 'right'

## 2.25

- 增加多选开启参数 multiSelect 默认 false
- 增加配置操作行内按钮选项 operationBtns Array 默认 ['detail', 'edit', 'delete']

### Attributes

| 参数           | 说明                       | 类型                 | 可选值 | 默认值                       |
| -------------- | -------------------------- | -------------------- | ------ | ---------------------------- |
| columns        | 表格配置                   | Array                | -      | []                           |
| indexTitle     | 序号标题                   | String               | -      | 序号                         |
| isMultiSelect  | 是否开启多选               | Boolean              | -      | false                        |
| isIndex        | 是否开启序号               | Boolean              | -      | false                        |
| selectable     | 控制 CheckBox 是否可选     | Function(row, index) | -      | -                            |
| showOperation  | 控制是否显示操作列         | Boolean              | -      | false                        |
| operationWidth | 控制列宽度                 | String               | -      | '150'                        |
| multiSelect    | 另一种多选的开关           | Boolean              | -      | false                        |
| operationBtns  | 操作列按钮类型             | Array                | -      | ['detail', 'edit', 'delete'] |
| operationFixed | 控制操作列是否固定         | String               | -      | 'right'                      |
| deleteConfirm  | 点击删除按钮是否弹出默认框 | Boolean/Array        | -      | false                        |
| loading        | 表格数据加载状态          | Boolean             | -      | false                        |

### Events

| 事件名       | 说明         | 参数 |
| ------------ | ------------ | ---- |
| handleDetail | 点击详情按钮 | -    |
| handleEdit   | 点击编辑按钮 | -    |
| handleDelete | 点击删除按钮 | -    |

具体内容参考 [Table](https://element.eleme.cn/#/zh-CN/component/table)
