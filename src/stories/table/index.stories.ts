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
import { argTypes } from './stories.config'
import docsPage from './page.mdx'

export default {
  title: "DpTable 表格",
  component: DpTable,
  argTypes: argTypes,
  parameters: {
    docs: {
      page: docsPage,
    },
  },
};

// 基础
export const Base: Story = (args: any) => ({
  components: { DpTable },
  setup() {
    return { 
      ...args
    };
  },

  template: `
    <DpTable 
      :columns="columns"
      :data="data"
      :showOperation="showOperation"
      :operationWidth="operationWidth"
      :operationFixed="operationFixed"
      :operationBtns="operationBtns"
      >
    </DpTable>
  `,
});
Base.args = {
  columns: baseColumn,
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
    'edit',
    'delete'
  ],
};
Base.storyName = "基础";


// 头部
export const header: Story = (args: object) => ({
  components: { DpTable },
  setup() {
    const columns = [
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'sex',
        label: '性别',
      },
      {
        prop: 'age',
        label: '年龄',
      },
    ]
    const data = [
      {
        name: '张三',
        sex: '男',
        age: '42',
      },
    ]
    return { 
      ...args,
      columns,
      data,
    };
  },

  template: `
    <DpTable 
      :columns="columns"
      :data="data"
      >
      <template #name_header>slot自定义表格头</template>
      <template #age_header>年<br/>龄</template>
    </DpTable>
  `,
})
header.args = {}
header.storyName = '表格头文案'

// 内容
export const content: Story = (args: object) => ({
  components: { DpTable },
  setup() {
    const columns = [
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'sex',
        label: '性别',
        useTooltip: true,
      },
      {
        prop: 'location',
        label: '位置',
        useTooltip: true,
        tooltipProp: 'detailLocation',
      },
      {
        prop: 'age',
        label: '年龄',
      },
      {
        prop: 'element',
        label: '节点',
        // isEle: true,
      },
    ]
    const data = [
      {
        name: '张三',
        sex: '男',
        location: '广东省广州市',
        detailLocation: '广东省广州市海珠区官洲街道生物岛科盛广场',
        age: `42`,
        element: '<div>0</div>',
      },
    ]
    return { 
      ...args,
      columns,
      data,
    };
  },

  template: `
    <DpTable 
      :columns="columns"
      :data="data"
      >
      <template #name="scope">
        【{{ scope.row.name }}】
      </template>
    </DpTable>
  `,
})
content.args = {}
content.storyName = '表格内容文案'


// 展开行
export const expand: Story = (args: object) => ({
  components: { DpTable },
  setup() {
    return {
      ...args,
    }
  },
  template: `
    <DpTable 
      :isExpand="isExpand"
      :columns="columns"
      :data="data"
      >
      <template #expand_slot="scoped">
        {{ scoped.row.detail }}
      </template>
    </DpTable>
  `,
})
expand.args = {
  isExpand: true,
  columns: [
    {
      prop: 'name',
      label: '姓名',
    },
    {
      prop: 'sex',
      label: '性别',
      useTooltip: true,
    },
  ],
  data: [
    {
      name: 'zjl',
      sex: '男',
      detail: '张三（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、音乐人、演员、导演、编剧，毕业于淡江中学。',
    },
  ],
}
expand.storyName = '展开行'