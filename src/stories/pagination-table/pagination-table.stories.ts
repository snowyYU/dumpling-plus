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

import { baseColumn } from "./example/baseConfig";

export default {
  title: "PaginationTable 分页列表",
  component: PaginationTable,
  args: { columns: baseColumn },
  argTypes: {
    columns: {
      type: { name: "array", required: true },
      description: "列配置",
      table: {
        type: {
          summary: "array",
          detail: "something really really long",
        },
      },
    },
  },
  decorators: [
    () => ({ template: '<div style="height:100%;"><story/></div>' }),
  ],
};

//👇 We create a “template” of how args map to rendering
const Template: Story = (args: any) => ({
  components: { PaginationTable },
  setup() {
    return { args };
  },

  template: '<PaginationTable v-bind="args" />',
});
//👇 Each story then reuses that template
export const Base = Template.bind({});
// Base.args = { columns: "#ff0", label: "Button" };

Base.storyName = "基础分页列表";
