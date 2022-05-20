export const argTypes = {
  // props

  columns: {
    type: { name: "array", required: true },
    description: "列配置",
    table: {
      type: {
        summary: "array",
        detail: "something really really long",
      },
    },
  },
  data: {
    description: "表格数据",
    table: {
      category: 'props',
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
        summary: 'string | number'
      },
    },
  },
  operationFixed: {
    description: "是否固定在左侧或者右侧。true 表示固定在左侧",
    tabel: {
      type: {
        summary: 'string / boolean'
      },
    },
  },
  operationBtns: {
    description: "操作列按钮",
    tabel: {
      type: {
        summary: 'object',
      },
    },
  },
  // emits
  "select": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "select-all": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "selection-change": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "cell-mouse-enter": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "cell-mouse-leave": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "cell-click": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "cell-dblclick": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "cell-contextmenu": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "row-click": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "row-contextmenu": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "row-dblclick": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "header-click": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "header-contextmenu": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "sort-change": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "filter-change": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "current-change": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "header-dragend": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "expand-change": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "detail-click": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "edit-click": {
    table: {
      category: 'events'
    },
    description: "",
  },
  "delete-click": {
    table: {
      category: 'events'
    },
    description: "",
  },
}