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

export default {
  title: "Table 基础列表",
  component: DpTable,
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
// Base.args = { columns: "#ff0", label: "Button" };

Base.storyName = "基础列表";
Base.parameters = {
  backgrounds: {
    values: [
      { name: "red", value: "#f00" },
      { name: "green", value: "#0f0" },
      { name: "blue", value: "#00f" },
    ],
  },
};
