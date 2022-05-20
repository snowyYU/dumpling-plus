import DpLineEditTable from "~/line-edit-table";
import { ref } from "vue";

export default {
  title: "line-edit-table",
  component: DpLineEditTable,
  argTypes: {},
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
