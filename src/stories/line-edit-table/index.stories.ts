import DpLineEditTable from "~/line-edit-table";
import { ref } from "vue";
import { argTypes } from "./stories.config";

export default {
  title: "line-edit-table 编辑表格",
  component: DpLineEditTable,
  argTypes: argTypes,
};

const Template = (args: object) => ({
  components: { DpLineEditTable },
  setup() {
    return {
      ...args,
    };
  },
  template: `
    <DpLineEditTable></DpLineEditTable>
  `,
});

//
export const base: any = Template.bind({});
base.args = {};
base.storyName = "基础";
