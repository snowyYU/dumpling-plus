/*
 * @Author: jasper
 * @Date: 2022-05-16 16:31:04
 * @LastEditors: jasper
 * @LastEditTime: 2022-05-19 19:48:08
 * @FilePath: /dumpling-plus/src/stories/schema-form/schema-form.stories.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { ref } from 'vue';
import DpSchemaForm from "~/schema-form";
import { Story } from "@storybook/vue3";

import { argTypes } from './stories.config';
import { 
  baseFormData, 
  baseFormSchema, 
  validateFormSchema, 
  validateFormData, 
  datePickerFormSchema,
  datePickerFormDate,
} from "./example/baseConfig";
import docsPage from './page.mdx';

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
  components: { DpSchemaForm },
  setup() {
    const formData = ref(args.model)
    const onCustomUpdate = (key: string, value: any, scope: any) => {
      formData.value[key] = value
    }
    return {
      args,
      ...args,
      formData,
      onCustomUpdate,
    };
  },
  template: `
    <DpSchemaForm
      :model="formData"
      :schema="schema"
      @custom-update="onCustomUpdate"
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
    </DpSchemaForm>
  `,
})
Base.args = {
  model: baseFormData,
  schema: baseFormSchema
};
Base.storyName = "基础配置表格";


//表单验证
export const validate: Story = (args: any) => ({
  components: { DpSchemaForm },
  setup() {
    const DpSchemaFormRef = ref()
    const formData = ref(args.model)
    const onCustomUpdate = (key: string, value: any, scope: any) => {
      formData.value[key] = value
    }
    const onValidate = () => {
      DpSchemaFormRef.value?.validate((isValid: boolean, invalidFields?: ValidateFieldsError) => {
        console.log(isValid, invalidFields)
      })
    }
    const onValidateField = () => {
      DpSchemaFormRef.value?.validateField(['name'], (isValid: boolean, invalidFields?: ValidateFieldsError) => {
        console.log(isValid, invalidFields)
      })
    }
    const onClearValidate = () => {
      DpSchemaFormRef.value?.clearValidate()
    }
    const onResetFields = () => {
      DpSchemaFormRef.value?.resetFields()
    }
    return {
      ...args,
      formData,
      DpSchemaFormRef,
      onValidate,
      onCustomUpdate,
      onValidateField,
      onClearValidate,
      onResetFields,
    }
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
})
validate.args = {
  model: validateFormData,
  schema: validateFormSchema,
};
validate.storyName = "表单验证";


// 日期选择器
export const datePicker: Story = (args: any) => ({
  components: { DpSchemaForm },
  setup() {
    const formData = ref(args.model)
    const onCustomUpdate = (key: string, value: any, scope: any) => {
      console.log( 'update', key, value )
      formData.value[key] = value
    }
    return {
      ...args,
      formData,
      onCustomUpdate,
    }
  },
  template: `
    <DpSchemaForm 
      :schema="schema"
      :model="formData"
      @custom-update="onCustomUpdate"
      >
    </DpSchemaForm>
  `
})
datePicker.args = {
  schema: datePickerFormSchema,
  model:datePickerFormDate,
}
datePicker.storyName = "日期选择器"