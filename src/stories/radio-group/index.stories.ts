import DpRadioGroup from "~/radio-group";
import { ref } from "vue";



export default {
  title: "radio-group",
  component: DpRadioGroup,
  argTypes: {},
}

const Template = (args: object) => ({
  components: { DpRadioGroup },
  setup() {
    return {
      ...args,
    }
  },
  template: `
    <DpRadioGroup></DpRadioGroup>
  `,
})

// 
export const base: any = Template.bind({});
base.args = {}
base.storyName = "基础";