import DpCheckboxGroup from "~/checkbox-group";
import { ref } from "vue";
import { Story } from "@storybook/vue3";
import { argTypes } from './stories.config'
import { props, options } from './example/config'
import docsPage from './page.mdx'

export default {
  title: 'DpCheckboxGroup 多选框组',
  component: DpCheckboxGroup,
  argTypes: argTypes,
  parameters: {
    docs: {
      page: docsPage,
    },
  },
}

export const base: Story = (args: any) => ({
  components: { DpCheckboxGroup },
  setup() {
    const checkList = ref([])
    return { 
      ...args,
      checkList,
    };
  },
  template: `
  <DpCheckboxGroup 
    v-model="checkList" 
    :props="props" 
    :options="options"
    >
  </DpCheckboxGroup>
  <p style="font-size: 14px">
    checkList：{{ checkList }}
  </p>
  `
})
base.args = {
  props: props,
  options: options,
}
base.storyName = '基础'