export const argTypes = {
  // props
  "model-value / v-model": {
    table: {
      type: {
        summary: 'string / number / boolean',
      },
      category: 'props'
    },
    description: "绑定值",
  },
  props: {
    description: "多选框label和value对应key配置 ",
  },
  options: {
    description: "多选框配置列表",
  },
  radioButton: {
    description: "是否设置为单选按钮组",
  },
  size: {
    table: {
      type: {
        summary: 'string',
        detail: '可选值:large/default/small',
      },
      defaultValue: {
        summary: 'default',
      },
      category: 'props'
    },
    description: "输入框尺寸",
  },
  // emits
  "change": {
    table: {
      category: 'event'
    },
    description: "绑定值变化时触发的事件",
  },
}