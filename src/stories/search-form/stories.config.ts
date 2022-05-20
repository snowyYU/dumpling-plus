export const argTypes = {
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
};

// 表单项数组
export interface baseSchemaType {
  key: string; // key对应绑定的数据对象
  type: string; // 控件类型
  label: string; //
}
export const baseSchema = [
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
      rules: [{ required: true, message: "请输入货位编码", trigger: "blur" }],
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
// 表单响应数据对象
export const baseModel = {
  title: "",
  allocationCode: "",
  allocationState: "",
};
