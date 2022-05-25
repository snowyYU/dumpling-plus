
import { ref } from "vue";
import SearchForm from "~/search-form";
import { Story } from "@storybook/vue3";
import { argTypes } from "./stories.config";
import { baseSchemaType, baseSchema, baseModel } from "./example/config";
import docsPage from './page.mdx';

export default {
  title: "DpSearchForm 条件过滤表单",
  component: SearchForm,
  // 参数配置
  argTypes: argTypes,
  parameters: {
    docs: {
      page: docsPage,
    },
  },
};

// 
export const base: Story = (args:  any) => ({
  components: { SearchForm },
  setup() {
    const schema: baseSchemaType[] = baseSchema;
    const formData = ref(args.model)

    function onSubmit() {
      console.log('查询');
    }
    function onReset() {
      console.log('重置');
    }
    const onUpdateModel = (value: any) =>{ 
      formData.value = value
    }

    return {
      ...args,
      schema,
      formData,
      onSubmit,
      onReset,
      onUpdateModel,
    };
  },
  template: `
    <SearchForm
      :model="formData"
      :schema="schema"
      :blueBtnText="blueBtnText"
      :firstLineMaxItem="firstLineMaxItem"
      @search="onSubmit"
      @reset="onReset"
      @update:model="onUpdateModel"
    >
      <template #custom-custom>
        <el-input placeholder="弹窗数据" v-model="formData.custom" style="width:100px"/><el-button @click="">确定</el-button>
      </template>
    </SearchForm>
  `
});
base.args = {
  model: baseModel,
  blueBtnText: '查询',
  firstLineMaxItem: 3,
};
base.storyName = "基础";
