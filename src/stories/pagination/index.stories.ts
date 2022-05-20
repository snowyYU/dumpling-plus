import DpPagination from "~/pagination";
import { ref } from "vue";



export default {
  title: "pagination",
  component: DpPagination,
  argTypes: {},
}

const Template = (args: object) => ({
  components: { DpPagination },
  setup() {
    return {
      ...args,
    }
  },
  template: `
    <DpPagination></DpPagination>
  `,
})

// 
export const base: any = Template.bind({});
base.args = {}
base.storyName = "基础";