export const argTypes = {
  // props
  layoutConfig: {
    type: { name: "object", required: false },
    description: "布局配置，包括【Row 属性：、Col 属性：】",
  },
  formProps: {
    type: { name: "object", required: false },
    description: "表单透传props",
  },
  schema: {
    description: "表单项配置参数",
  },
  model: {
    description: "数据对象",
  },
  firstLineMaxItem: {
    description: "第一行最多显示项数",
  },
  enterKeyTriggerSearch: {
    description: "是否开启 enter 键触发查询事件",
  },
  showBtnArr: {
    description: "右边展示的按钮组",
  },
  blueBtnText: {
    description: "蓝色查询按钮的文字",
  },
  initToggleStatus: {
    description: "初始化展开/收起按钮",
  },

  // events
  "update:model": {
    description: "当控件数据更新时触发",
  },
  input: {
    description: "当输入框获得焦点时触发",
  },
  blur: {
    description: "当输入框失去焦点时触发",
  },
  change: {
    description: "当控件数据发生变化时触发",
  },
  select: {
    description: "当type:autocomplete选中数据发生变化时触发",
  },
  "visible-change": {
    description: "下拉框出现/隐藏时触发",
  },
  search: {
    description: "当点击查询按钮 并 表单验证通过时触发",
  },
  reset: {
    description: "当点击重置按钮时触发",
  },
  "hide-over-flow": {
    description: "当切换展开/收起状态时触发",
  },

  // slots
};
