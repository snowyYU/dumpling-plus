import SearchForm from "./index";
import { ref } from "vue";

export default {
  title: "Example/SearchForm 条件过滤表单",
  component: SearchForm,
  // 参数配置
  argTypes: {
    layoutConfig: {
      type: { name: "object", required: false },
      description: "布局配置，包括【Row 属性：、Col 属性：】",
    },
    formProps: {
      type: { name: "object", required: false },
      description: "el-form 配置",
    },
    schema: {},
    model: {},
    firstLineMaxItem: {},
    enterKeyTriggerSearch: {},
    showBtnArr: {},
    blueBtnText: {},
    initToggleStatus: {},
  },
};

const Template = (args: object) => ({
  // 组件已经被全局引入
  components: { SearchForm },
  setup() {
    const schema: any[] = [
      {
        key: "title",
        type: "input",
        label: "标题",
      },
      {
        key: "allocationCode",
        type: "input",
        label: "货位编码",
        formItemProps: {
          rules: [
            { required: true, message: "请输入货位编码", trigger: "blur" },
          ],
        },
        fieldProps: {
          disabled: false,
        },
      },
      {
        key: "allocationState",
        type: "switch",
        label: "启用",
        fieldProps: {
          activeValue: "1",
          inactiveValue: "0",
        },
      },
    ];
    const model: object = {
      title: "",
      allocationCode: "",
      allocationState: "",
    };
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

export const 基础 = Template.bind({});
// 放在args中的数据可通过控制台面板修改数据
(基础 as any).args = {};
