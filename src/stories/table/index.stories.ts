import DpTable from "~/table";
import { ref } from "vue";



export default {
  title: "table 表格",
  component: DpTable,
  argTypes: {},
}

const Template = (args: object) => ({
  components: { DpTable },
  setup() {
    return {
      ...args,
    }
  },
  template: `
    <dp-table></dp-table>
  `,
})

// 
export const base: any = Template.bind({});
base.args = {}
base.storyName = "基础";