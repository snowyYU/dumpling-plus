<script lang="ts">
import {
  defineComponent,
  resolveComponent,
  resolveDirective,
  withDirectives,
  PropType,
  h,
  Slot,
  Directive,
} from "vue";
import { ElTable } from "element-plus";
import { Column } from "./index.d";
import { defaultTableProps } from "./config";

const emits = [
  "select",
  "select-all",
  "selection-change",
  "cell-mouse-enter",
  "cell-mouse-leave",
  "cell-click",
  "cell-dblclick",
  "cell-contextmenu",
  "row-click",
  "row-contextmenu",
  "row-dblclick",
  "header-click",
  "header-contextmenu",
  "sort-change",
  "filter-change",
  "current-change",
  "header-dragend",
  "expand-change",
];

export default defineComponent({
  name: "DpTable",
  props: {
    // 列表项目配置
    columns: {
      type: Array as PropType<Array<Column>>,
      default: () => [],
    },
    // 序号列
    isIndex: {
      type: Boolean,
      default: false,
    },
    // 序号列标题
    indexTitle: {
      type: String,
      default: "序号",
    },
    // 多选列
    isMultiSelect: {
      type: Boolean,
      default: false,
    },
    // 控制 checkbox 是否可选
    selectable: {
      type: Function,
      default() {
        return () => {
          return true;
        };
      },
    },
    // 操作列
    showOperation: {
      type: Boolean,
      default: false,
    },
    // 操作列宽度
    operationWidth: {
      type: String,
      default: "150",
    },
    // 控制操作列显示按钮
    operationBtns: {
      type: Array,
      default: () => ["detail", "edit", "delete"],
    },
    // 操作列是否固定
    operationFixed: {
      type: [String, Boolean],
      default: "right",
    },
    // 删除时是否使用确认框
    deleteConfirm: {
      type: [Array, Boolean],
      default: false,
    },
    // 列表加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 展开
    isExpand: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mergeTableProps() {
      return {
        ...defaultTableProps,
        ...this.$attrs,
      };
    },
    hasParentTable() {
      return this.$parent?.$options.name === "PaginationTable";
    },
  },
  emits: [...emits, "detail-click", "edit-click", "delete-click"],
  methods: {
    toggleRowSelection(row: any, selected: any) {
      (this.$refs.tableRef as InstanceType<typeof ElTable>).toggleRowSelection(
        row,
        selected
      );
    },

    handleOperation(scope: any, type: "detail" | "edit" | "delete") {
      switch (type) {
        case "detail":
          this.$emit(
            "detail-click",
            scope.$index,
            scope.row,
            scope.column,
            scope
          );

          break;
        case "edit":
          this.$emit(
            "edit-click",
            scope.$index,
            scope.row,
            scope.column,
            scope
          );

          break;
        case "delete":
          if (this.deleteConfirm) {
            // 删除确认框
            this.$confirm(
              (this.deleteConfirm as Array<any>)[0]
                ? (this.deleteConfirm as Array<any>)[0]
                : "确认删除吗",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.$emit(
                  "delete-click",
                  scope.$index,
                  scope.row,
                  scope.column,
                  scope
                );
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: (this.deleteConfirm as Array<any>)[1]
                    ? (this.deleteConfirm as Array<any>)[1]
                    : "已取消删除",
                });
              });
          } else {
            this.$emit(
              "delete-click",
              scope.$index,
              scope.row,
              scope.column,
              scope
            );
          }

          break;

        default:
          break;
      }
    },
  },
  render() {
    // 事件监听器
    const listeners: { [propName: string]: () => void } = {};
    emits.forEach((key) => {
      listeners[
        `on${key.replace(/(^[a-z])|(-[a-z])/g, (item) =>
          item.replace("-", "").toUpperCase()
        )}`
      ] = (...args) => {
        this.$emit(key, ...args);
      };
    });

    const getElementColumns = () => {
      const finallyElementColumns = [];

      if (this.isMultiSelect) {
        finallyElementColumns.push(
          h(resolveComponent("el-table-column"), {
            fixed: "left",
            type: "selection",
            width: "55",
            align: "center",
            selectable: this.selectable,
          })
        );
      }

      if (this.isIndex) {
        finallyElementColumns.push(
          h(resolveComponent("el-table-column"), {
            type: "index",
            width: "50",
            align: "center",
            label: this.indexTitle,
          })
        );
      }

      if (this.isExpand) {
        finallyElementColumns.push(
          h(
            resolveComponent("el-table-column"),
            {
              type: "expand",
            },
            {
              default: this.$slots.expand_slot,
            }
          )
        );
      }

      this.columns
        .filter((column) => column.visible !== false)
        .forEach((item: Column) => {
          // 渲染单个 column
          const finallyColumn = (item: Column) => {
            return h(
              resolveComponent("el-table-column"),
              { ...item },
              {
                // 表头
                header: ({ column, $index }: any) => {
                  // const dataSource = this.$attrs.data || [];
                  const slotProps: any = {
                    item,
                    column,
                    index: $index,
                  };
                  // if (
                  //   dataSource &&
                  //   Array.isArray(dataSource) &&
                  //   dataSource.length > 0 &&
                  //   dataSource[$index]
                  // ) {
                  //   slotProps.row = dataSource[$index];
                  // }
                  if (this.hasParentTable && this.$slots?.header) {
                    return (this.$slots?.header as Slot)(slotProps);
                  } else {
                    if (this.$slots[`${item.prop}_header`]) {
                      return (this.$slots[`${item.prop}_header`] as Slot)(
                        slotProps
                      );
                    } else {
                      return h("span", null, item.label);
                    }
                  }
                },
                // 内容
                default: ({ row, column, $index }: any) => {
                  if (this.hasParentTable && this.$slots?.default) {
                    return (this.$slots?.default as Slot)({
                      item,
                      row,
                      column,
                      index: $index,
                    });
                  } else {
                    if (item.prop && this.$slots[item.prop]) {
                      return (this.$slots[item.prop as string] as Slot)({
                        item,
                        row,
                        column,
                        index: $index,
                      });
                    } else {
                      if (item.useTooltip) {
                        return h(
                          resolveComponent("el-tooltip"),
                          {
                            effect: "dark",
                            content:
                              row[item.tooltipProp as string] ||
                              row[item.prop as string],
                          },
                          {
                            default: () =>
                              h(
                                "div",
                                { class: "text-multi-ellipsis--l3" },
                                row[item.prop as string]
                              ),
                          }
                        );
                      } else if (item.isEle) {
                        return h(
                          resolveComponent("el-tooltip"),
                          {
                            effect: "dark",
                            content:
                              row[item.tooltipProp as string] ||
                              row[item.prop as string],
                          },
                          {
                            default: () =>
                              withDirectives(
                                h("div", { class: "text-multi-ellipsis--l3" }),
                                [
                                  [
                                    resolveDirective("html") as Directive,
                                    row[item.prop as string],
                                  ],
                                ]
                              ),
                          }
                        );
                      } else {
                        return h("span", null, row[item.prop as string]);
                      }
                    }
                  }
                },
              }
            );
          };

          // 递归
          const renderElTableColumn = (item: Column): any => {
            if (item.dpColumn) {
              return h(
                resolveComponent("el-table-column"),
                { label: item.label },
                {
                  default() {
                    return item.dpColumn.map((column: Column) =>
                      renderElTableColumn(column)
                    );
                  },
                }
              );
            } else {
              return finallyColumn(item);
            }
          };

          // const renderElTableColumn = (item: Column | Column[]): any => {
          //   if (!Array.isArray(item) && item.prop) {
          //     return finallyColumn(item);
          //   } else if (Array.isArray(item)){

          //     return h(
          //       resolveComponent("el-table-column"),
          //       { label: item.label },
          //       renderElTableColumn(item.dpColumn)
          //     );
          //   }
          // };
          finallyElementColumns.push(renderElTableColumn(item));
        });

      if (this.showOperation) {
        const buttonNames = { detail: "详情", edit: "编辑", delete: "删除" };

        finallyElementColumns.push(
          h(
            resolveComponent("el-table-column"),
            {
              label: "操作",
              width: this.operationWidth,
              fixed: this.operationFixed,
            },
            {
              default: (props: any) => {
                if (this.$slots.operation) {
                  return (this.$slots?.operation as Slot)(props);
                } else {
                  return this.operationBtns.map((btn: any) => {
                    const buttonProps = {
                      type: "text",
                      onClick: this.handleOperation(props, btn),
                    };

                    if (btn === "delete") {
                      (
                        buttonProps as typeof buttonProps & { style?: any }
                      ).style = {
                        color: "#FF4D4D",
                      };
                    }

                    return h(resolveComponent("el-button"), buttonProps, {
                      default: () =>
                        buttonNames[btn as "detail" | "edit" | "delete"],
                    });
                  });
                }
              },
            }
          )
        );
      }

      return finallyElementColumns;
    };

    const getElementTable = () => {
      const loading = resolveDirective("loading") as Directive;
      return withDirectives(
        h(
          resolveComponent("el-table"),
          { ...this.mergeTableProps, ...listeners, ref: "tableRef" },
          { default: getElementColumns }
        ),
        [[loading, this.loading]]
      );
    };

    return h("div", { class: "table" }, getElementTable());
  },
});
</script>

<style lang="scss" scoped>
.table {
  :deep() {
    .el-table th {
      height: 40px;
      color: #242833;
      font-weight: 600;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      background: #f4f5f7;
    }

    .el-table__row td {
      // 表格列
      height: 40px;
      padding: 10px 0;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      //表格hover样式
      background: #f4f5f7;
    }

    .el-table__row .cell {
      color: #242833;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }

    .el-table__body tr.current-row > td {
      background: #dee9ff !important;
    }

    .el-table-column--selection {
      text-overflow: unset !important;
    }

    .el-button--text {
      padding: 0 !important;
    }
  }
}
</style>
