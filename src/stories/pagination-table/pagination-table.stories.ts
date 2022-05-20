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
import PaginationTable from "~/pagination-table";
import { Meta, Story } from "@storybook/vue3";

import { argTypes } from './stories.config';
import { baseColumn } from "./example/baseConfig";

export default {
  title: "PaginationTable 分页列表",
  component: PaginationTable,
  args: { columns: baseColumn },
  argTypes: argTypes,
  decorators: [
    () => ({ template: '<div style="height:100%;"><story/></div>' }),
  ],
};

const Template: Story = (args: any) => ({
  components: { PaginationTable },
  setup() {
    return { args };
  },
  template: '<PaginationTable v-bind="args" />',
});

// 
export const Base = Template.bind({});
Base.args = {};
Base.storyName = "基础";
