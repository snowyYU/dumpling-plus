export const argTypes = {
  // props
  columns: {
    type: { name: "array", required: true },
    table: {
      type: {
        summary: "array",
        detail: "something really really long",
      },
      category: "props",
    },
    description: "列配置",
  },
  showPagination: {
    description: "是否展示分页功能",
  },

  // events

  // slots
};
