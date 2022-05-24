export const argTypes = {
  // props
  isIndex: {
    description: "是否展示表格行序号",
  },
  isMultiSelect: {
    description: "是否开启表格行多选功能",
  },
  showOperation: {
    description: "是否展示表格右边【操作】列",
  },
  operationProps: {
    description: "【操作】列透传attr参数",
  },
  columns: {
    description: "表格头数据对象",
  },
  data: {
    description: "表格数据对象",
  },
  showPlusButton: {
    description: "是否展示表格下方新增行按钮，对应slot:button，若无slot则默认展示“新增行”",
  },
  mode: {
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '',
      },
    },
    controls: 'text',
    description: "模式，可选：edit|detail",
  },
  selectable: {
    description: '当isMultiSelect:true时有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选',
  },
  indexProps: {
    description: '行序号列透传参数',
  },
  loading: {
    description: '列表加载状态',
  },


  // events
  "delete-click": {
    description: "“操作”列删除按钮点击触发事件",
  },
  "plus-click": {
    description: "新增行按钮触发事件",
  },
  "field-change": {
    description: "当绑定值变化时触发的事件",
  },
  "update:data": {
    description: "表格数据对象",
  },
  "input": {
    description: "当type:input控件获得焦点时触发",
  },
  "input-click": {
    description: "当type:input控件点击时触发",
  },
  "blur": {
    description: "当type:input或input-number控件失去焦点时触发",
  },
  "change": {
    description: "当控件数据发生变化时触发",
  },
  "visible-change": {
    description: "当下拉框select控件出现/隐藏时触发",
  },

  // slots
  operation: {
    table: {
      category: 'slots'
    },
    description: "【操作】列slot,如无则单独展示“删除”按钮并回调delete-click事件",
  },
  button: {
    table: {
      category: 'slots'
    },
    description: "表格下方新增行slot",
  },

}