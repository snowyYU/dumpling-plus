import DpUpload from "~/upload";
import { ref } from "vue";



export default {
  title: "upload 上传",
  component: DpUpload,
  argTypes: {},
}

const Template = (args: object) => ({
  components: { DpUpload },
  setup() {
    return {
      ...args,
    }
  },
  template: `
    <dp-upload ></dp-upload>
  `,
})

// 
export const base: any = Template.bind({});
base.args = {}
base.storyName = "基础";