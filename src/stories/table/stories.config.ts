export const argTypes = {
  // props
  columns: {
    type: { name: "array", required: true },
    description: "列配置",
    table: {
      type: {
        summary: "array",
      },
    },
  },
  data: {
    description: "表格数据",
    table: {
      category: "props",
      type: {
        summary: "array",
      },
    },
  },
  showOperation: {
    description: "是否开启最右边“操作”列",
  },
  operationWidth: {
    description: "设置操作列的宽度",
    tabel: {
      type: {
        summary: "string | number",
      },
    },
  },
  operationFixed: {
    description: "是否固定在左侧或者右侧。true 表示固定在左侧",
    tabel: {
      type: {
        summary: "string / boolean",
      },
    },
  },
  operationBtns: {
    description: "操作列按钮",
    tabel: {
      type: {
        summary: "object",
      },
    },
  },
  isIndex: {
    description: "是否展示第一列序号",
  },
  indexTitle: {
    description: "序号列的头部标题",
  },
  indexWidth: {
    description: "序号列的宽度",
  },
  isMultiSelect: {
    description: "是否开启表格多选功能",
  },
  selectable: {
    description: "控制 checkbox 是否可选",
  },
  operationProps: {
    description: "操作选项列的透传属性",
  },
  deleteConfirm: {
    description:
      "删除时是否使用确认框，为false时表示点击不出现提示框，为string[]类型时，第一个string为删除前提示语，第二个string为取消后提示语",
  },
  loading: {
    description: "表格加载状态",
  },
  isExpand: {
    description:
      '通过设置 type="expand" 和 slot#expand_slot 可以开启展开行功能',
  },
  // emits
  select: {
    table: {
      category: "events",
    },
    description: "当用户手动勾选数据行的 Checkbox 时触发的事件",
  },
  "select-all": {
    table: {
      category: "events",
    },
    description: "当用户手动勾选全选 Checkbox 时触发的事件",
  },
  "selection-change": {
    table: {
      category: "events",
    },
    description: "当选择项发生变化时会触发该事件",
  },
  "cell-mouse-enter": {
    table: {
      category: "events",
    },
    description: "当单元格 hover 进入时会触发该事件",
  },
  "cell-mouse-leave": {
    table: {
      category: "events",
    },
    description: "当单元格 hover 退出时会触发该事件",
  },
  "cell-click": {
    table: {
      category: "events",
    },
    description: "当某个单元格被点击时会触发该事件",
  },
  "cell-dblclick": {
    table: {
      category: "events",
    },
    description: "当某个单元格被双击击时会触发该事件",
  },
  "cell-contextmenu": {
    table: {
      category: "events",
    },
    description: "当某个单元格被鼠标右键点击时会触发该事件",
  },
  "row-click": {
    table: {
      category: "events",
    },
    description: "当某一行被点击时会触发该事件",
  },
  "row-contextmenu": {
    table: {
      category: "events",
    },
    description: "当某一行被鼠标右键点击时会触发该事件",
  },
  "row-dblclick": {
    table: {
      category: "events",
    },
    description: "当某一行被双击时会触发该事件",
  },
  "header-click": {
    table: {
      category: "events",
    },
    description: "当某一列的表头被点击时会触发该事件",
  },
  "header-contextmenu": {
    table: {
      category: "events",
    },
    description: "当某一列的表头被鼠标右键点击时触发该事件",
  },
  "sort-change": {
    table: {
      category: "events",
    },
    description: "当表格的排序条件发生变化的时候会触发该事件",
  },
  "filter-change": {
    table: {
      category: "events",
    },
    description:
      "column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件",
  },
  "current-change": {
    table: {
      category: "events",
    },
    description:
      "当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性",
  },
  "header-dragend": {
    table: {
      category: "events",
    },
    description: "当拖动表头改变了列的宽度的时候会触发该事件",
  },
  "expand-change": {
    table: {
      category: "events",
    },
    description:
      "当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）",
  },
  "detail-click": {
    table: {
      category: "events",
    },
    description: "操作项详情按钮点击事件",
  },
  "edit-click": {
    table: {
      category: "events",
    },
    description: "操作项编辑按钮点击事件",
  },
  "delete-click": {
    table: {
      category: "events",
    },
    description: "操作项删除按钮点击事件",
  },
};
