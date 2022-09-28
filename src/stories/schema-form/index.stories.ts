/*
 * @Author: jasper
 * @Date: 2022-05-16 16:31:04
 * @LastEditors: jasper
 * @LastEditTime: 2022-09-01 11:30:14
 * @FilePath: /dumpling-plus/src/stories/schema-form/index.stories.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { ref } from "vue";
import DpSchemaForm from "~/schema-form";
import { Story } from "@storybook/vue3";

import { Warning } from "@element-plus/icons-vue";
import { argTypes } from "./stories.config";
import {
  baseFormData,
  baseFormSchema,
  validateFormSchema,
  validateFormData,
  datePickerFormSchema,
  datePickerFormDate,
} from "./example/baseConfig";
import docsPage from "./page.mdx";

export default {
  title: "DpSchemaForm 配置表单",
  component: DpSchemaForm,
  argTypes: argTypes,
  parameters: {
    docs: {
      page: docsPage,
    },
  },
};

// 基础
export const Base: Story = (args: any) => ({
  components: { DpSchemaForm, Warning },
  setup() {
    const formData = ref(args.model);
    const onCustomUpdate = (key: string, value: any, scope: any) => {
      formData.value[key] = value;
    };
    const onUpdateModel = (value: any) => {
      console.log(value);
    };
    return {
      args,
      ...args,
      formData,
      onCustomUpdate,
      onUpdateModel,
    };
  },
  template: `
    <DpSchemaForm
      :model="formData"
      :schema="schema"
      @custom-update="onCustomUpdate"
      @update:model="onUpdateModel"
      >
      <template #module-custom-module-custom="scoped">
        hello,我是type:module-custom的表单项，完全由slot:\${item.key}-module-custom模板渲染
      </template>
      <template #custom-custom="scoped">
        自定义插槽内容，区别于type:module-custom
      </template>
      <template #customLabel-custom-label="scoped">
        customLabel自定义标签
      </template>
      <template #customError-custom-label="scoped">
        customError自定义错误
      </template>

      <template #input-extend="scoped">
        <el-tooltip
          class=""
          content="multiple lines<br />second line"
          raw-content
          placement="right"
          effect="light"
        >
          <el-icon style="marginLeft: 20px" :size='18' color="#606266" ><Warning/></el-icon>
        </el-tooltip>
      </template>
      
    </DpSchemaForm>
  `,
});
Base.args = {
  model: baseFormData,
  schema: baseFormSchema,
  // "form-props": { "label-positon": "top" },
  // "label-positon": "top"
};
Base.storyName = "基础配置表格";

//表单验证
export const Validate: Story = (args: any) => ({
  components: { DpSchemaForm },
  setup() {
    const DpSchemaFormRef = ref();
    const formData = ref(args.model);
    const onCustomUpdate = (key: string, value: any, scope: any) => {
      formData.value[key] = value;
    };
    const onValidate = () => {
      DpSchemaFormRef.value?.validate(
        (isValid: boolean, invalidFields?: ValidateFieldsError) => {
          console.log(isValid, invalidFields);
        }
      );
    };
    const onValidateField = () => {
      DpSchemaFormRef.value?.validateField(
        ["name"],
        (isValid: boolean, invalidFields?: ValidateFieldsError) => {
          console.log(isValid, invalidFields);
        }
      );
    };
    const onClearValidate = () => {
      DpSchemaFormRef.value?.clearValidate();
    };
    const onResetFields = () => {
      DpSchemaFormRef.value?.resetFields();
    };
    return {
      ...args,
      formData,
      DpSchemaFormRef,
      onValidate,
      onCustomUpdate,
      onValidateField,
      onClearValidate,
      onResetFields,
    };
  },
  template: `
    <DpSchemaForm
      ref="DpSchemaFormRef"
      :model="formData"
      :schema="schema"
      @custom-update="onCustomUpdate"
      >
      <template #site-custom-label>地址-自定义标签</template>
      <template #site-custom-error="item">自定义错误：{{item.error}}</template>
    </DpSchemaForm>
    <el-button @click="onValidate">表单验证</el-button>
    <el-button @click="onValidateField">表单部分验证</el-button>
    <el-button @click="onClearValidate">表单清空验证</el-button>
    <el-button @click="onResetFields">表单重置</el-button>
  `,
});
Validate.args = {
  model: validateFormData,
  schema: validateFormSchema,
};
Validate.storyName = "表单验证";

// 日期选择器
export const DatePicker: Story = (args: any) => ({
  components: { DpSchemaForm },
  setup() {
    const formData = ref(args.model);
    const onCustomUpdate = (key: string, value: any, scope: any) => {
      console.log("update", key, value);
      formData.value[key] = value;
    };
    return {
      ...args,
      formData,
      onCustomUpdate,
    };
  },
  template: `
    <DpSchemaForm 
      :schema="schema"
      :model="formData"
      @custom-update="onCustomUpdate"
      >
    </DpSchemaForm>
  `,
});
DatePicker.args = {
  schema: datePickerFormSchema,
  model: datePickerFormDate,
};
DatePicker.storyName = "日期选择器";
