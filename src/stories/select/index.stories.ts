import DpSelect from "~/select";
import { ref } from "vue";



export default {
  title: "select",
  component: DpSelect,
  argTypes: {},
}

const Template = (args: object) => ({
  components: { DpSelect },
  setup() {
    return {
      ...args,
    }
  },
  template: `
    <DpSelect></DpSelect>
  `,
})

// 
export const base: any = Template.bind({});
base.args = {}
base.storyName = "基础";