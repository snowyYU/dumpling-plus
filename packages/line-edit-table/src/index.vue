<script lang="ts">
import {
  defineComponent,
  resolveComponent,
  resolveDirective,
  withDirectives,
  PropType,
  Component,
  h,
  Slot,
  Directive,
} from "vue";
import { ElForm } from "element-plus";
import type { FormValidateCallback } from "element-plus";
// import { Callback } from "element-plus/lib/components/form/src/form.vue";
import { Column } from "./index.d";
import { defaultTableProps } from "./config";
import DpSelect from "../../select/src/index.vue";

export enum Mode {
  "edit" = "edit",
  "detail" = "detail",
}

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
  name: "DpLineEditTable",
  props: {
    // 列表项目配置
    columns: {
      type: Array as PropType<Array<Column>>,
      default: () => [],
    },
    // 列表数据
    data: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String as PropType<Mode>,
      default: Mode.edit,
    },
    // 序号列显示状态
    isIndex: {
      type: Boolean,
      default: false,
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
    // 序号列参数
    indexProps: {
      type: Object,
      default: () => ({}),
    },
    // 操作列显示状态
    showOperation: {
      type: Boolean,
      default: true,
    },
    // 操作列参数
    operationProps: {
      type: Object,
      default: () => ({}),
    },
    // 列表加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 新增按钮显示状态
    showPlusButton: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    mergeTableProps() {
      return {
        ...defaultTableProps,
        ...this.$attrs,
      };
    },
    mergeColumns() {
      const mergeColumns = this.columns.map((column) => {
        const columnItem = {
          ...column,
        };

        if (!column.type) {
          columnItem.type = "text";
        }

        if (!column.fieldProps) {
          columnItem.fieldProps = {};
        }

        if (
          ["select", "cascader", "date-picker"].includes(
            columnItem.type as string
          ) &&
          typeof (columnItem.fieldProps as any).clearable === "undefined"
        ) {
          (columnItem.fieldProps as any).clearable = true;
        }

        if (columnItem.type === "date-picker") {
          ["format", "valueFormat"].forEach((key) => {
            if (!(columnItem.fieldProps as any)[key]) {
              const type = (columnItem.fieldProps as any).type || "date";
              switch (type) {
                case "year":
                  (columnItem.fieldProps as any)[key] = "YYYY";
                  break;
                case "month":
                  (columnItem.fieldProps as any)[key] = "YYYY-MM";
                  break;
                case "date":
                  (columnItem.fieldProps as any)[key] = "YYYY-MM-DD";
                  break;
                case "dates":
                  (columnItem.fieldProps as any)[key] = "YYYY-MM-DD";
                  break;
                case "datetime":
                  (columnItem.fieldProps as any)[key] = "YYYY-MM-DD HH:mm:ss";
                  break;
                case "datetimerange":
                  (columnItem.fieldProps as any)[key] = "YYYY-MM-DD HH:mm:ss";
                  break;
                case "daterange":
                  (columnItem.fieldProps as any)[key] = "YYYY-MM-DD";
                  break;
                case "monthrange":
                  (columnItem.fieldProps as any)[key] = "YYYY-MM";
                  break;
              }
            }
          });
        }

        return columnItem;
      });

      return mergeColumns;
    },
    columnMap() {
      const columnMap: any = {};
      this.columns.forEach((column, index) => {
        columnMap[column.prop as string] = index;
      });
      return columnMap;
    },
  },
  emits: [
    ...emits,
    "delete-click",
    "plus-click",
    "field-change",
    "update:data",
    "input",
    "input-click",
    "blur",
    "change",
    "visible-change",
  ],
  methods: {
    /**
     * 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
     */
    validate(cb?: any) {
      const res = (this.$refs.formRef as InstanceType<typeof ElForm>)?.validate(
        cb
      );
      if (!cb) return res;
    },

    /**
     * 对部分表单字段进行校验的方法
     */
    validateField(props: string | Array<string>, cb?: FormValidateCallback) {
      (this.$refs.formRef as InstanceType<typeof ElForm>)?.validateField(
        props,
        cb
      );
    },

    /**
     * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     */
    clearValidate(props?: string | string[]) {
      (this.$refs.formRef as InstanceType<typeof ElForm>)?.clearValidate(props);
    },

    /**
     * 获取占位文字
     */
    getPlaceholder(item: Column) {
      let prefix = "请输入";
      const type = item.type || "text";
      if (["select", "cascader", "date-picker"].includes(type)) {
        prefix = "请选择";
      }
      return prefix + item.label;
    },

    /**
     * updateModelValue 事件
     * @param {string} key
     * @param {unknown} value
     */
    handleUpdateModelValue(key: string, value: unknown, scope: any) {
      // const row = {
      //   ...scope.row,
      //   [key]: value,
      // };
      // const newData = [...this.data];
      // newData.splice(scope.$index, 1, row);
      // this.$emit("update:data", newData);
      this.$emit("field-change", key, value, scope);
    },

    /**
     * 输入事件
     * @param {string} key
     * @param {string | number} value
     */
    handleInput(key: string, value: string | number, scope: any) {
      this.$emit("input", key, value, scope);
    },

    /**
     * 失焦事件
     * @param {string} key
     */
    handleBlur(key: string, scope: any) {
      this.$emit("blur", key, scope);
    },
    /**
     * 点击事件
     * @param {string} key
     */
    handleClick(key: string, scope: any) {
      this.$emit("input-click", key, scope);
    },

    /**
     * 切换事件
     * @param {string} key
     * @param {unknown} value
     */
    handleChange(key: string, value: unknown, scope: any) {
      this.$emit("change", key, value, scope);
    },

    /**
     * 下拉框出现/隐藏时触发
     * @param {string} key
     * @param {boolean} value
     */
    handleVisibleChange(key: string, value: boolean, scope: any) {
      this.$emit("visible-change", key, value, scope);
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

    let tableChildren: any = [];

    if (this.isIndex) {
      tableChildren.push(
        h(resolveComponent("el-table-column"), {
          label: "序号",
          type: "index",
          width: "50",
          align: "center",
          ...this.indexProps,
        })
      );
    }

    if (this.isMultiSelect) {
      tableChildren.push(
        h(resolveComponent("el-table-column"), {
          fixed: "left",
          type: "selection",
          width: "55",
          align: "center",
          selectable: this.selectable,
        })
      );
    }

    const formTable = this.mergeColumns
      .filter((column) => column.visible !== false)
      .map((column) => {
        // 渲染单个 column
        const finallyColumn = (column: Column) => {
          return h(
            resolveComponent("el-table-column"),
            { ...column, key: column.prop },
            {
              default: (scope: any) => {
                const formItemProps: any = {
                  prop: `formData.${scope.$index}.${column.prop}`,
                };

                if (this.mode !== Mode.detail) {
                  formItemProps.style = { marginTop: "22px" };
                } else {
                  formItemProps.style = { marginBottom: 0 };
                }

                if (column.type !== "text") {
                  if (column.rules) {
                    if (!column.rules.some((item: any) => item.required)) {
                      if (
                        ["select", "cascader", "date-picker"].includes(
                          column.type as string
                        )
                      ) {
                        formItemProps.rules = [
                          {
                            required: true,
                            message: `请选择${column.label}`,
                            trigger: "change",
                          },
                          ...column.rules,
                        ];
                      } else {
                        formItemProps.rules = [
                          {
                            required: true,
                            message: `请输入${column.label}`,
                            trigger: "blur",
                          },
                          ...column.rules,
                        ];
                      }
                    } else {
                      formItemProps.rules = column.rules;
                    }
                  } else {
                    // if (
                    //   ["select", "cascader", "date-picker"].includes(
                    //     column.type as string
                    //   )
                    // ) {
                    //   formItemProps.rules = [
                    //     {
                    //       required: true,
                    //       message: `请选择${column.label}`,
                    //       trigger: "change",
                    //     },
                    //   ];
                    // } else {
                    //   formItemProps.rules = [
                    //     {
                    //       required: true,
                    //       message: `请输入${column.label}`,
                    //       trigger: "blur",
                    //     },
                    //   ];
                    // }
                  }
                }

                let customRulesName = `${column.prop}_rules`;
                if (column.customRulesName) {
                  customRulesName = column.customRulesName;
                }

                if (scope.row[customRulesName]) {
                  formItemProps.rules = scope.row[customRulesName];
                }

                return h(resolveComponent("el-form-item"), formItemProps, {
                  default: () => {
                    if (this.mode === Mode.detail || column.type === "text") {
                      if (this.$slots[`${column.prop}`]) {
                        return (this.$slots[`${column.prop}`] as Slot)(scope);
                      }
                      return scope.row[column.prop as string];
                    } else if (column.type === "input") {
                      // 输入框
                      let customDisabledName = `${column.prop}_disabled`;
                      if (column.customDisabledName) {
                        customDisabledName = column.customDisabledName;
                      }

                      let fieldProps = { ...column.fieldProps };

                      if (
                        typeof scope.row[customDisabledName] !== "undefined"
                      ) {
                        fieldProps.disabled = scope.row[customDisabledName];
                      }

                      return h(resolveComponent("el-input"), {
                        modelValue: scope.row[column.prop as string],
                        placeholder: this.getPlaceholder(column),
                        ...fieldProps,
                        "onUpdate:modelValue": (value: unknown) =>
                          this.handleUpdateModelValue(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onInput: (value: string | number) =>
                          this.handleInput(column.prop as string, value, scope),
                        onClick: () =>
                          this.handleClick(column.prop as string, scope),
                        onBlur: () =>
                          this.handleBlur(column.prop as string, scope),
                      });
                    } else if (column.type === "input-number") {
                      // 数字输入框
                      return h(resolveComponent("el-input-number"), {
                        style: { width: "100%" },
                        modelValue: scope.row[column.prop as string],
                        placeholder: this.getPlaceholder(column),
                        min: 0,
                        controlsPosition: "right",
                        ...column.fieldProps,
                        "onUpdate:modelValue": (value: unknown) =>
                          this.handleUpdateModelValue(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onChange: (value: string | number) =>
                          this.handleChange(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onBlur: () =>
                          this.handleBlur(column.prop as string, scope),
                      });
                    } else if (column.type === "select") {
                      // 下拉框
                      let customOptionsName = `${column.prop}_options`;
                      if (column.customOptionsName) {
                        customOptionsName = column.customOptionsName;
                      }

                      let fieldProps = { ...column.fieldProps };

                      if (scope.row[customOptionsName]) {
                        fieldProps.options = scope.row[customOptionsName];
                      }

                      return h(DpSelect, {
                        style: { width: "100%" },
                        modelValue: scope.row[column.prop as string],
                        placeholder: this.getPlaceholder(column),
                        ...fieldProps,
                        "onUpdate:modelValue": (value: unknown) =>
                          this.handleUpdateModelValue(
                            column.prop as string,
                            value,
                            scope
                          ),
                        remoteSearch: (query: unknown) =>
                          this.handleChange(
                            `${column.prop as string}_remoteSearch`,
                            query,
                            scope
                          ),
                        onChange: (value: unknown) =>
                          this.handleChange(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onVisibleChange: (value: boolean) =>
                          this.handleVisibleChange(
                            column.prop as string,
                            value,
                            scope
                          ),
                      });
                    } else if (column.type === "time-picker") {
                      // 日期时间选择器
                      return h(resolveComponent("el-time-picker"), {
                        modelValue: scope.row[column.prop as string],
                        ...column.fieldProps,
                        "onUpdate:modelValue": (value: unknown) =>
                          this.handleUpdateModelValue(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onChange: (value: unknown) =>
                          this.handleChange(
                            column.prop as string,
                            value,
                            scope
                          ),
                      });
                    } else if (column.type === "time-select") {
                      // 日期时间选择器
                      return h(resolveComponent("el-time-select"), {
                        modelValue: scope.row[column.prop as string],
                        ...column.fieldProps,
                        "onUpdate:modelValue": (value: unknown) =>
                          this.handleUpdateModelValue(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onChange: (value: unknown) =>
                          this.handleChange(
                            column.prop as string,
                            value,
                            scope
                          ),
                      });
                    } else if (column.type === "date-picker") {
                      // 日期时间选择器
                      return h(resolveComponent("el-date-picker"), {
                        modelValue: scope.row[column.prop as string],
                        ...column.fieldProps,
                        "onUpdate:modelValue": (value: unknown) =>
                          this.handleUpdateModelValue(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onChange: (value: unknown) =>
                          this.handleChange(
                            column.prop as string,
                            value,
                            scope
                          ),
                      });
                    } else if (column.type === "switch") {
                      // 开关
                      let customDisabledName = `${column.prop}_disabled`;
                      if (column.customDisabledName) {
                        customDisabledName = column.customDisabledName;
                      }

                      let fieldProps = { ...column.fieldProps };

                      if (
                        typeof scope.row[customDisabledName] !== "undefined"
                      ) {
                        fieldProps.disabled = scope.row[customDisabledName];
                      }

                      return h(resolveComponent("el-switch"), {
                        modelValue: scope.row[column.prop as string],
                        ...fieldProps,
                        "onUpdate:modelValue": (value: unknown) =>
                          this.handleUpdateModelValue(
                            column.prop as string,
                            value,
                            scope
                          ),
                        onChange: (value: unknown) =>
                          this.handleChange(
                            column.prop as string,
                            value,
                            scope
                          ),
                      });
                    }
                  },
                });
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
                default: () => {
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
        return renderElTableColumn(column);
      });

    tableChildren = tableChildren.concat(formTable);
    if (this.mode !== Mode.detail && this.showOperation) {
      tableChildren.push(
        h(
          resolveComponent("el-table-column"),
          {
            label: "操作",
            width: 100,
            fixed: "right",
            ...this.operationProps,
          },
          {
            default: (scope: any) => {
              if (this.$slots.operation) {
                return this.$slots.operation(scope);
              } else {
                return h(
                  resolveComponent("el-button"),
                  {
                    // type: "text",
                    text: true,
                    style: { color: "#FF4D4D" },
                    onClick: () => this.$emit("delete-click", scope),
                  },
                  { default: () => "删除" }
                );
              }
            },
          }
        )
      );
    }
    const loading = resolveDirective("loading") as Directive;
    const tableElement = withDirectives(
      h(
        resolveComponent("el-table"),
        {
          data: this.data,
          ...this.mergeTableProps,
          ...listeners,
          // onSelectionChange:$event
          ref: "tableRef",
        },
        {
          default: () => {
            return tableChildren;
          },
        }
      ),
      [[loading, this.loading]]
    );

    const children: any = [
      h(
        resolveComponent("el-form"),
        {
          model: { formData: this.data },
          showMessage: this.mode !== Mode.detail,
          ref: "formRef",
        },
        {
          default: () => {
            return tableElement;
          },
        }
      ),
    ];

    if (this.mode !== Mode.detail && this.showPlusButton) {
      if (this.$slots.button) {
        children.push(this.$slots.button());
      } else {
        children.push(
          h(
            "div",
            { class: "add-btn", onClick: () => this.$emit("plus-click") },
            "新增行"
          )
        );
      }
    }

    return h("div", { class: "line-edit-table" }, children);
  },
});
</script>

<style lang="scss" scoped>
.line-edit-table {
  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    margin-top: 16px;
    color: #4a81fe;
    font-weight: 400;
    font-size: 14px;
    background-color: #ffffff;
    border: 1px dashed #4a81fe;
    cursor: pointer;
  }
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
      padding: 0;
    }
    .el-form-item {
      margin-top: 6px;
    }
    .el-table--medium .el-table__cell {
      padding: 0;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      //表格hover样式
      background: #f4f5f7;
    }

    .el-table__row .cell {
      // color: #242833;
      font-weight: 400;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 20px;
    }

    .el-table__body tr.current-row > td {
      background: #dee9ff;
    }

    .el-table-column--selection {
      text-overflow: unset;
    }

    .el-button--text {
      padding: 0;
    }
  }
}
</style>
