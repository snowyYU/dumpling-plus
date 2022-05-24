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
import DpPaginationTable from "~/pagination-table";
import { Story } from "@storybook/vue3";
import { ref, computed } from "vue";

import { argTypes } from './stories.config';
import { baseColumn, baseData } from "./example/baseConfig";
import docsPage from './page.mdx';

export default {
  title: "DpPaginationTable 分页表格",
  component: DpPaginationTable,
  argTypes: argTypes,
  decorators: [
    () => ({ template: '<div style="height:100%;"><story/></div>' }),
  ],
  parameters: {
    docs: {
      page: docsPage,
    },
  },
};

// 
export const Base: Story = (args: any) => ({
  components: { DpPaginationTable },
  setup() {
    const currentPage = ref(1)
    const pageSize = ref(5)

    function onSizeChange(val: number) {
      pageSize.value = val
    }
    function onCurrentChange(val: number) {
      currentPage.value = val
    }

    const tableData = computed(()=>{
      return args.data.slice( (currentPage.value - 1) * pageSize.value ,currentPage.value * pageSize.value)
    })
    return { 
      ...args,

      currentPage,
      pageSize,
      onSizeChange,
      onCurrentChange,

      tableData,
    };
  },
  template: `
  <DpPaginationTable 
    :columns="columns"
    :data="tableData"

    :showPagination="showPagination"
    :total="total"
    :currentPage="currentPage"
    :pageSize="pageSize"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
    @update:current-page="onCurrentChange"
    @update:page-size="onSizeChange"
  >
  </DpPaginationTable>`,
})
Base.args = {
  showPagination: true,
  columns: baseColumn,
  data: baseData,
  // 分页
  total: baseData.length,
};
Base.storyName = "基础";