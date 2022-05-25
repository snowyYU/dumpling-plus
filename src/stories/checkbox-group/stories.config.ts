export const argTypes = {
  // props
  "model-value / v-model": {
    table: {
      type: {
        summary: 'array',
      },
      defaultValue: {
        summary: '[]',
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
  // emits
  "change": {
    table: {
      category: 'event'
    },
    description: "当绑定值变化时触发的事件",
  },
}