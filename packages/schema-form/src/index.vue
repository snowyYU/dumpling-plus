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
import DpUpload from "../../upload/src/index.vue";
import FormOtherMaterial from "../../schema-form/src/form-other-material.vue";
import {
  defaultFormProps,
  defaultFormItemProps,
  defaultLayoutProps,
} from "./config";
import { Schema } from "./index.d";

export default defineComponent({
  name: "DpSchemaForm",
  components: {
    DpUpload,
  },
  props: {
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
  },
  computed: {
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
          formItemProps: {
            ...defaultFormItemProps,
            ...(item.formItemProps || {}),
          },
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
    "upload-update",
    "file-success",
    "remove-success",
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

    //********************* 附件上传 START **************************/
    updateFileList(fileList: any, key: string) {
      const fields = {
        ...this.model,
        [key]: fileList,
      };
      this.$emit("update:model", fields);
      this.$emit("upload-update", key, fileList);
    },
    uploadSuccess(file: any, key: string) {
      this.$emit("file-success", key, file);
    },
    removeFile(fileList: any, key: string) {
      const fields = {
        ...this.model,
        [key]: fileList,
      };
      this.$emit("update:model", fields);
      this.$emit("remove-success", key, fileList);
    },
    //********************* 附件上传 END **************************/
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
      } else if (item.type === "upload") {
        // 文件上传
        return h(resolveComponent("dp-upload"), {
          ref: item.ref,
          fileList: this.model[item.key],
          ...item.fieldProps,
          onUpdateFileList: (fileList: any) =>
            this.updateFileList(fileList, item.key),
          onUploadFileSucess: (file: any) => this.uploadSuccess(file, item.key),
          onRemoveFile: (fileList: any) => this.removeFile(fileList, item.key),
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
          return null;
        }

        return h(
          resolveComponent("el-col"),
          { ...(item.layoutProps || {}) },
          {
            default: () => {
              if (
                item.type === "module-custom" &&
                this.$slots[`${item.key}-module-custom`]
              ) {
                return (this.$slots[`${item.key}-module-custom`] as Slot)(item);
              } else if (item.type === "form-area-title") {
                return h(FormOtherMaterial, {
                  style: { marginBottom: "22px" },
                  type: item.formAreaTitleType,
                  title: item.label,
                  height: item.height,
                });
              } else {
                const rawSlots: RawSlots = {
                  default: () => getFormField(item),
                };

                if (
                  item.customLabel &&
                  this.$slots[`${item.key}-custom-label`]
                ) {
                  rawSlots.label = () => {
                    return (this.$slots[`${item.key}-custom-label`] as Slot)(
                      item
                    );
                  };
                }

                if (
                  item.customError &&
                  this.$slots[`${item.key}-custom-error`]
                ) {
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
              }
            },
          }
        );
      });
    };

    return h(
      resolveComponent("el-form"),
      {
        ref: "formRef",
        model: this.model,
        ...this.mergeFormProps,
      },
      {
        default: () =>
          h(
            resolveComponent("el-row"),
            {},
            {
              default: getChildren,
            }
          ),
      }
    );
  },
});
</script>

<style lang="scss" scoped>
:deep() {
  .el-form-item--small {
    min-height: 33px;
  }
}
</style>
