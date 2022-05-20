/*
 * @Author: jasper
 * @Date: 2022-05-16 16:31:04
 * @LastEditors: jasper
 * @LastEditTime: 2022-05-17 15:44:41
 * @FilePath: /dumpling-plus/packages/table/table.stories.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import DpTable from "~/table";
import { Meta, Story } from "@storybook/vue3";

import { baseColumn } from "./example/baseConfig";
import argTypes from './argTypes'

export default {
  title: "Table 表格",
  component: DpTable,
  args: { columns: baseColumn },
  argTypes: argTypes
};

//👇 We create a “template” of how args map to rendering
const Template: Story = (args: any) => ({
  components: { DpTable },
  setup() {
    return { args };
  },

  template: '<DpTable v-bind="args" />',
});
//👇 Each story then reuses that template
export const Base = Template.bind({});
Base.args = {
  data: [
    {
      name: 'zjl',
      sex: '男',
      age: '41',
    },
    {
      name: '张三',
      sex: '男',
      age: '36',
    },
    {
      name: 'zjl',
      sex: '男',
      age: '41',
    },
  ],
  showOperation: true,
  operationWidth: '300px',
  operationFixed: 'right',
  operationBtns: [
    'detail',
    '47457'
  ],
};
Base.storyName = "基础";
Base.parameters = {};
