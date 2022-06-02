import { Meta, Story } from "@storybook/vue3";
import DpPagination from "~/pagination";
import { ref } from "vue";
import { argTypes } from "./stories.config";

export default {
  title: "DpPagination 分页",
  component: DpPagination,
  argTypes: argTypes,
};

const Template = (args: object) => ({
  components: { DpPagination },
  setup() {
    const currentPage = ref(1);
    const pageSize = ref(10);

    function onSizeChange(val: number) {
      pageSize.value = val;
    }
    function onCurrentChange(val: number) {
      currentPage.value = val;
    }
    function onPrevClick(val: number) {
      console.log("prev", val);
    }
    function onNextClick(val: number) {
      console.log("next", val);
    }

    return {
      ...args,
      currentPage,
      pageSize,
      onSizeChange,
      onCurrentChange,
      onPrevClick,
      onNextClick,
    };
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
});

//
export const Base: Story = Template.bind({});
Base.args = {
  showPageMsg: true,
  showJumper: true,
  total: 76,
};
Base.storyName = "基础";

// 插槽
export const Left: Story = (args: object) => ({
  components: { DpPagination },
  setup() {
    return {};
  },
  template: `
    <DpPagination>
      <template #left>【温馨提示】：这里可以添加slot</template>
    </DpPagination>
  `,
});
Left.args = {};
Left.storyName = "插槽";
