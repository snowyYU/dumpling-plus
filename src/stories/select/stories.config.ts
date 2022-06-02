export const argTypes = {
  // props
  "model-value / v-model": {
    table: {
      type: {
        summary: "string / number / boolean / object",
      },
      defaultValue: {
        summary: "",
      },
      category: "props",
    },
    description: "绑定值",
  },
  props: {
    description: "多选框label和value对应key配置 ",
  },
  options: {
    description: "多选框配置列表",
  },
  size: {
    table: {
      type: {
        summary: "string",
        detail: "可选值:large/default/small",
      },
      defaultValue: {
        summary: "default",
      },
      category: "props",
    },
    description: "输入框尺寸",
  },
  // emits
  change: {
    table: {
      category: "event",
    },
    description: "选中值发生变化时触发",
  },
  "visible-change": {
    table: {
      category: "event",
    },
    description: "下拉框出现/隐藏时触发",
  },
  "remove-tag": {
    table: {
      category: "event",
    },
    description: "多选模式下移除tag时触发",
  },
  clear: {
    table: {
      category: "event",
    },
    description: "可清空的单选模式下用户点击清空按钮时触发",
  },
  blur: {
    table: {
      category: "event",
    },
    description: "当 input 失去焦点时触发",
  },
  focus: {
    table: {
      category: "event",
    },
    description: "当 input 获得焦点时触发",
  },
  remoteSearch: {
    table: {
      category: "event",
    },
    description: "远程搜索remote-method触发",
  },
};
