import SearchForm from "~/search-form";
import { ref } from "vue";
import { 
  argTypes, 
  baseSchemaType,
  baseSchema,
  baseModel,
 } from "./config";

export default {
  title: "Example/SearchForm 条件过滤表单",
  component: SearchForm,
  // 参数配置
  argTypes: argTypes,
};

const Template = (args: object) => ({
  // 组件已经被全局引入
  components: { SearchForm },
  setup() {
    const schema: baseSchemaType[] = baseSchema
    const model: typeof baseModel = baseModel
    function onSubmit() {
      console.log();
    }
    function onReset() {
      console.log();
    }

    return {
      ...args,
      schema,
      model,
      onSubmit,
      onReset,
    };
  },
  template: `
    <SearchForm
      ref="searchForm"
      :model="model"
      :schema="schema"
      @onSubmit="onSubmit"
      @onReset="onReset"
    >
    </SearchForm>
  `,
});

export const base: any = Template.bind({});
// 放在args中的数据可通过控制台面板修改数据
base.args = {}
base.storyName = '基础'
