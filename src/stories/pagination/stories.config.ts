export const argTypes = {
  // props
  showPageMsg: {
    description: "是否展示页数及每页条数选择功能",
  },
  showJumper: {
    description: "是否展示跳页功能",
  },
  currentPage: {
    description: "当前页",
  },
  pageSize: {
    description: "每页条数",
  },
  total: {
    description: "总条数",
  },
  // emits
  "update:page-size": {
    table: {
      category: "events",
    },
    description: "如果传入了 page-size，必须监听 page-size 变更的事件",
  },
  "update:current-page": {
    table: {
      category: "events",
    },
    description: "如果传入了 current-page，必须监听 current-page 变更的事件",
  },
  "size-change": {
    table: {
      category: "events",
    },
    description: "pageSize 改变时触发",
  },
  "current-change": {
    table: {
      category: "events",
    },
    description: "current-change 改变时触发",
  },
  "prev-click": {
    table: {
      category: "events",
    },
    description: "用户点击上一页按钮改变当前页时触发	",
  },
  "next-click": {
    table: {
      category: "events",
    },
    description: "用户点击下一页按钮改变当前页时触发	",
  },
  // slots
  left: {
    description: "左边的slot模板",
  },
};
