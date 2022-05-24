
import { Meta, Story } from "@storybook/vue3";
import DpPagination from "~/pagination";
import { ref } from "vue";
import { argTypes } from "./stories.config";


export default {
  title: "DpPagination 分页",
  component: DpPagination,
  argTypes: argTypes,
}

const Template = (args: object) => ({
  components: { DpPagination },
  setup() {
    const currentPage = ref(1)
    const pageSize = ref(10)

    function onSizeChange(val: number) {
      pageSize.value = val
    }
    function onCurrentChange(val: number) {
      currentPage.value = val
    }
    function onPrevClick(val: number) {
    }
    function onNextClick(val: number) {
    }
    
    return {
      ...args,
      currentPage,
      pageSize,
      onSizeChange,
      onCurrentChange,
      onPrevClick,
      onNextClick,
    }
  },
  template: `
    <DpPagination
      :showPageMsg="showPageMsg"
      :showJumper="showJumper"
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      @prev-click="onPrevClick"
      @next-click="onNextClick"
      @update:current-page="onCurrentChange"
      @update:page-size="onSizeChange"
    >
    </DpPagination>
  `,
})

// 
export const base: Story = Template.bind({});
base.args = {
  showPageMsg: true,
  showJumper: true,
  total: 76,
}
base.storyName = "基础";


// 插槽
export const left: Story = (args: object) => ({
  components: { DpPagination },
  setup() {},
  template: `
    <DpPagination>
      <template #left>【温馨提示】：这里可以添加slot</template>
    </DpPagination>
  `
})
left.args = {}
left.storyName = "插槽";