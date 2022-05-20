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
import DpSchemaForm from "~/schema-form";
import { Meta, Story } from "@storybook/vue3";

import { argTypes } from './stories.config';
import { formSchema, formData } from "./example/baseConfig";

export default {
  title: "DpSchemaForm 配置表单",
  component: DpSchemaForm,
  args: { "v-model:model": formData, schema: formSchema },
  argTypes: argTypes,
  decorators: [
    () => ({ template: '<div style="height:100%;"><story/></div>' }),
  ],
};

//👇 We create a “template” of how args map to rendering
const Template: Story = (args: any) => ({
  components: { DpSchemaForm },
  setup() {
    return { args };
  },

  template: '<DpSchemaForm v-bind="args" ></DpSchemaForm>',
});
//👇 Each story then reuses that template
export const Base = Template.bind({});
// Base.args = { columns: "#ff0", label: "Button" };

Base.storyName = "基础配置表格";
