<script lang="ts">
import {
  defineComponent,
  resolveComponent,
  PropType,
  h,
  RawSlots,
  Slot,
} from "vue";
import { ElForm } from "element-plus";
// import { Callback } from "element-plus/lib/components/form/src/form.vue";
import { ValidateFieldCallback } from "element-plus/lib/tokens";
import DpSelect from "../../select/src/index.vue";
import DpRadioGroup from "../../radio-group/src/index.vue";
import DpCheckboxGroup from "../../checkbox-group/src/index.vue";
import {
  defaultLayoutConfig,
  defaultFormProps,
  defaultLayoutProps,
} from "./config";
import { Schema } from "./index.d";

export default defineComponent({
  name: "DpSearchForm",
  props: {
    layoutConfig: {
      type: Object,
      default: () => ({}),
    },
    formProps: {
      type: Object,
      default: () => ({}),
    },
    schema: {
      type: Array as PropType<Array<Schema>>,
      default: () => [],
    },
    model: {
      type: Object as PropType<{ [propName: string]: unknown }>,
      default: () => ({}),
    },
    // 第一行最多显示项数
    firstLineMaxItem: {
      type: Number,
      default: 3,
    },
    enterKeyTriggerSearch: {
      type: Boolean,
      default: true,
    },
    showBtnArr: {
      type: Array,
      default: () => ["search", "reset", "toggle"],
    },
    blueBtnText: {
      type: String,
      default: "查询",
    },
  },
  data() {
    return {
      toggle: true,
    };
  },
  computed: {
    mergeLayoutConfig() {
      return {
        ...defaultLayoutConfig,
        ...this.layoutConfig,
      };
    },
    mergeFormProps() {
      return {
        ...defaultFormProps,
        ...this.formProps,
      };
    },
    mergeSchema() {
      const mergeSchema = this.schema.map((item) => {
        const schemaItem = {
          ...item,
          layoutProps: { ...defaultLayoutProps, ...(item.layoutProps || {}) },
        };

        if (!schemaItem.fieldProps) {
          schemaItem.fieldProps = {};
        }

        if (
          ["select", "cascader"].includes(schemaItem.type) &&
          typeof (schemaItem.fieldProps as any).clearable === "undefined"
        ) {
          (schemaItem.fieldProps as any).clearable = true;
        }

        if (
          [
            "input",
            "input-number",
            "autocomplete",
            "textarea",
            "select",
            "cascader",
          ].includes(schemaItem.type)
        ) {
          if (!(schemaItem.fieldProps as any).placeholder) {
            (schemaItem.fieldProps as any).placeholder =
              this.getPlaceholder(schemaItem);
          }
        }

        if (schemaItem.type === "date-picker") {
          const type = (schemaItem.fieldProps as any).type || "date";
          if (
            !(schemaItem.fieldProps as any).placeholder &&
            type.indexOf("range") === -1
          ) {
            (schemaItem.fieldProps as any).placeholder =
              this.getPlaceholder(schemaItem);
          }

          ["format", "valueFormat"].forEach((key) => {
            if (!(schemaItem.fieldProps as any)[key]) {
              switch (type) {
                case "year":
                  (schemaItem.fieldProps as any)[key] = "YYYY";
                  break;
                case "month":
                  (schemaItem.fieldProps as any)[key] = "YYYY-MM";
                  break;
                case "date":
                  (schemaItem.fieldProps as any)[key] = "YYYY-MM-DD";
                  break;
                case "dates":
                  (schemaItem.fieldProps as any)[key] = "YYYY-MM-DD";
                  break;
                case "datetime":
                  (schemaItem.fieldProps as any)[key] = "YYYY-MM-DD HH:mm:ss";
                  break;
                case "datetimerange":
                  (schemaItem.fieldProps as any)[key] = "YYYY-MM-DD HH:mm:ss";
                  break;
                case "daterange":
                  (schemaItem.fieldProps as any)[key] = "YYYY-MM-DD";
                  break;
                case "monthrange":
                  (schemaItem.fieldProps as any)[key] = "YYYY-MM";
                  break;
              }
            }
          });
        }

        return schemaItem;
      });

      if (!this.toggle) {
        const filterSchema: any = [];
        mergeSchema.some((item) => {
          if (typeof item.visible === "undefined" || item.visible) {
            filterSchema.push(item);
          }

          return filterSchema.length === this.firstLineMaxItem;
        });
        return filterSchema;
      }

      return mergeSchema;
    },
  },
  emits: [
    "update:model",
    "input",
    "blur",
    "change",
    "select",
    "visible-change",
    "search",
    "reset",
    "hide-over-flow",
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
    validateField(props: string | string[], cb: ValidateFieldCallback) {
      (this.$refs.formRef as InstanceType<typeof ElForm>)?.validateField(
        props,
        cb
      );
    },

    /**
     * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
     */
    resetFields() {
      (this.$refs.formRef as InstanceType<typeof ElForm>)?.resetFields();
      // const fields = {
      //   ...this.model,
      // };
      // this.$emit("update:model", fields);
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
    getPlaceholder(item: Schema) {
      let prefix = "请输入";
      if (["select", "cascader", "date-picker"].includes(item.type)) {
        prefix = "请选择";
      }
      return prefix + item.label;
    },

    /**
     * updateModelValue 事件
     * @param {string} key
     * @param {unknown} value
     */
    handleUpdateModelValue(key: string, value: unknown) {
      // console.log(key, value);
      const fields = {
        ...this.model,
        [key]: value,
      };
      this.$emit("update:model", fields);
    },

    /**
     * 输入事件
     * @param {string} key
     * @param {string | number} value
     */
    handleInput(key: string, value: string | number) {
      this.$emit("input", key, value);
    },

    /**
     * 失焦事件
     * @param {string} key
     */
    handleBlur(key: string) {
      this.$emit("blur", key);
    },

    /**
     * 切换事件
     * @param {string} key
     * @param {unknown} value
     */
    handleChange(key: string, value: unknown) {
      this.$emit("change", key, value);
    },

    /**
     * 选中事件
     * @param {string} key
     * @param {unknown} value
     */
    handleSelect(key: string, value: unknown) {
      this.$emit("select", key, value);
    },

    /**
     * 下拉框出现/隐藏时触发
     * @param {string} key
     * @param {boolean} value
     */
    handleVisibleChange(key: string, value: boolean) {
      this.$emit("visible-change", key, value);
    },

    /**
     * 表单按钮点击事件
     * @param {string} type
     */
    handleFormButtonClick(type: string) {
      switch (type) {
        case "search":
          // 搜索
          this.validate((valid: any) => {
            if (valid) {
              this.$emit("search");
            }
          });
          break;
        case "reset":
          // 重置
          this.resetFields();
          this.$emit("reset");
          break;
        case "toggle":
          // 展开/收起
          this.toggle = !this.toggle;
          this.$emit("hide-over-flow", this.toggle);
          break;
      }
    },
  },
  render() {
    const getFormField = (item: Schema) => {
      if (item.type === "input") {
        // 输入框
        return h(resolveComponent("el-input"), {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onInput: (value: string | number) =>
            this.handleInput(item.key, value),
          onBlur: () => this.handleBlur(item.key),
        });
      } else if (item.type === "autocomplete") {
        // 输入建议
        return h(resolveComponent("el-autocomplete"), {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: string | number) =>
            this.handleChange(item.key, value),
          onSelect: (value: string | number) =>
            this.handleSelect(item.key, value),
        });
      } else if (item.type === "input-number") {
        // 数字输入框
        return h(resolveComponent("el-input-number"), {
          style: { width: "100%" },
          modelValue: this.model[item.key],
          min: 0,
          controlsPosition: "right",
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: string | number) =>
            this.handleChange(item.key, value),
          onBlur: () => this.handleBlur(item.key),
        });
      } else if (item.type === "textarea") {
        // 文本域
        return h(resolveComponent("el-input"), {
          type: "textarea",
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onInput: (value: string | number) =>
            this.handleInput(item.key, value),
          onBlur: () => this.handleBlur(item.key),
        });
      } else if (item.type === "select") {
        // 下拉框
        return h(DpSelect, {
          style: { width: "100%" },
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
          onVisibleChange: (value: boolean) =>
            this.handleVisibleChange(item.key, value),
        });
      } else if (item.type === "cascader") {
        // 级联选择器
        return h(resolveComponent("el-cascader"), {
          ref: item.ref,
          style: { width: "100%" },
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
          onVisibleChange: (value: boolean) =>
            this.handleVisibleChange(item.key, value),
        });
      } else if (item.type === "radio") {
        // 单选框
        return h(DpRadioGroup, {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
        });
      } else if (item.type === "checkbox") {
        // 多选框
        return h(DpCheckboxGroup, {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
        });
      } else if (item.type === "switch") {
        // 开关
        return h(resolveComponent("el-switch"), {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
        });
      } else if (item.type === "time-select") {
        // 日期选择器
        return h(resolveComponent("el-time-select"), {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
        });
      } else if (item.type === "time-picker") {
        // 日期选择器
        return h(resolveComponent("el-time-picker"), {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
        });
      } else if (item.type === "date-picker") {
        // 日期时间选择器
        return h(resolveComponent("el-date-picker"), {
          modelValue: this.model[item.key],
          ...item.fieldProps,
          "onUpdate:modelValue": (value: unknown) =>
            this.handleUpdateModelValue(item.key, value),
          onChange: (value: unknown) => this.handleChange(item.key, value),
        });
      } else if (item.type === "custom") {
        // 自定义组件
        return this.$slots[`${item.key}-custom`]
          ? (this.$slots[`${item.key}-custom`] as Slot)(item)
          : [];
      }
    };

    const getChildren = () => {
      return this.mergeSchema.map((item: Schema) => {
        if (typeof item.visible !== "undefined" && !item.visible) {
          return [];
        }
        return h(
          resolveComponent("el-col"),
          { ...(item.layoutProps || {}) },
          {
            default: () => {
              const rawSlots: RawSlots = {
                default: () => getFormField(item),
              };

              if (item.customLabel && this.$slots[`${item.key}-custom-label`]) {
                rawSlots.label = () => {
                  return (this.$slots[`${item.key}-custom-label`] as Slot)(
                    item
                  );
                };
              }

              if (item.customError && this.$slots[`${item.key}-custom-error`]) {
                rawSlots.error = (props: { error: string }) => {
                  return (this.$slots[`${item.key}-custom-error`] as Slot)({
                    ...props,
                    ...item,
                  });
                };
              }

              return h(
                resolveComponent("el-form-item"),
                { prop: item.key, label: item.label, ...item.formItemProps },
                rawSlots
              );
            },
          }
        );
      });
    };

    const formProps: { [propName: string]: unknown } = {
      ref: "formRef",
      model: this.model,
      ...this.mergeFormProps,
    };

    if (this.enterKeyTriggerSearch) {
      formProps.onKeyup = (e: KeyboardEvent) => {
        if (e.keyCode !== 13) return;
        this.handleFormButtonClick("search");
      };
    }

    return h(resolveComponent("el-form"), formProps, {
      default: () => {
        return h(
          resolveComponent("el-row"),
          {
            gutter: this.mergeLayoutConfig.gutter,
            type: this.mergeLayoutConfig.type,
            justify: this.mergeLayoutConfig.justify,
            align: this.mergeLayoutConfig.align,
          },
          {
            default: () => {
              return [
                h(
                  resolveComponent("el-col"),
                  {
                    sm: this.mergeLayoutConfig.sm,
                    md: this.mergeLayoutConfig.md,
                    lg: this.mergeLayoutConfig.lg,
                    xl: this.mergeLayoutConfig.xl,
                  },
                  {
                    default: () => {
                      return h(
                        resolveComponent("el-row"),
                        {},
                        {
                          default: getChildren,
                        }
                      );
                    },
                  }
                ),
                h(
                  resolveComponent("el-col"),
                  {
                    class: "btn-group",
                    sm: this.mergeLayoutConfig.btnGsm,
                    md: this.mergeLayoutConfig.btnGmd,
                    lg: this.mergeLayoutConfig.btnGlg,
                    xl: this.mergeLayoutConfig.btnGxl,
                  },
                  {
                    default: () => {
                      const getFormButtonGroup = () => {
                        const group = [];

                        if (this.showBtnArr.includes("search")) {
                          group.push(
                            h(
                              resolveComponent("el-button"),
                              {
                                type: "primary",
                                size: "small",
                                onClick: () =>
                                  this.handleFormButtonClick("search"),
                              },
                              {
                                default: () =>
                                  this.blueBtnText === "查询"
                                    ? "查询"
                                    : this.blueBtnText,
                              }
                            )
                          );
                        }

                        if (this.showBtnArr.includes("reset")) {
                          group.push(
                            h(
                              resolveComponent("el-button"),
                              {
                                type: "default",
                                size: "small",
                                onClick: () =>
                                  this.handleFormButtonClick("reset"),
                              },
                              { default: () => "重置" }
                            )
                          );
                        }

                        if (this.showBtnArr.includes("toggle")) {
                          group.push(
                            h(
                              resolveComponent("el-button"),
                              {
                                type: "default",
                                size: "small",
                                onClick: () =>
                                  this.handleFormButtonClick("toggle"),
                              },
                              {
                                default: () => [
                                  this.toggle ? "收起" : "展开",
                                  h("i", {
                                    class: this.toggle
                                      ? "el-icon-arrow-up el-icon--up"
                                      : "el-icon-arrow-down el-icon--down",
                                  }),
                                ],
                              }
                            )
                          );
                        }

                        return group;
                      };

                      return getFormButtonGroup();
                    },
                  }
                ),
              ];
            },
          }
        );
      },
    });
  },
});
</script>

<style lang="scss" scoped>
:deep() {
  .el-form--inline {
    .el-form-item {
      display: flex;
      width: 100%;
      height: 33px;
      margin-bottom: 16px;
    }

    .el-form-item__label {
      font-weight: 400;
      line-height: 32px;
    }

    .el-form-item__content {
      flex: 1;
      line-height: 32px;
      .el-input,
      .el-input__inner {
        width: 100%;
        height: 32px;
        line-height: 32px;
      }

      .el-select,
      .el-cascader,
      .el-input-number {
        width: 100%;
      }
      .el-cascader {
        line-height: 32px;
      }
      .el-date-editor,
      .el-input,
      .el-input--prefix,
      .el-input--suffix,
      .el-date-editor--year {
        width: 100%;
        .el-input__prefix {
          .el-input__icon {
            line-height: 32px;
          }
        }
      }
    }
  }
}

.el-col.btn-group {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-end;
}

.clearm {
  margin: 0 !important;
}
</style>
