// 表单项数组
export interface baseSchemaType {
  key: string; // key对应绑定的数据对象
  type: string; // 控件类型
  label: string; //
}
export const baseSchema = [
  {
    visible: false,
    key: "visible",
    type: "visible",
    label: "隐藏",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "input",
    type: "input",
    label: "input",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {
      placeholder: "",
    },
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "autocomplete",
    type: "autocomplete",
    label: "autocomplete",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "input-number",
    type: "input-number",
    label: "input-number",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "textarea",
    type: "textarea",
    label: "textarea",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "select",
    type: "select",
    label: "select",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {
      options: [
        {
          label: "选项1",
          value: "1",
        },
        {
          label: "选项2",
          value: "2",
        },
      ],
    },
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "cascader",
    type: "cascader",
    label: "cascader",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {
      options: [
        {
          value: "gd",
          label: "广东",
          children: [
            {
              value: "gz",
              label: "广州",
            },
            {
              value: "fs",
              label: "佛山",
            },
          ],
        },
        {
          value: "hn",
          label: "湖南",
          children: [
            {
              value: "cs",
              label: "长沙",
            },
            {
              value: "xt",
              label: "湘潭",
            },
          ],
        },
      ],
    },
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "radio",
    type: "radio",
    label: "radio",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {
      props: {
        label: "myLabel",
        value: "myValue",
      },
      options: [
        {
          myLabel: "单选1",
          myValue: "1",
        },
        {
          myLabel: "单选2",
          myValue: "2",
        },
      ],
    },
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "checkbox",
    type: "checkbox",
    label: "checkbox",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {
      props: {
        label: "myLabel",
        value: "myValue",
      },
      options: [
        {
          myLabel: "多选1",
          myValue: "1",
        },
        {
          myLabel: "多选2",
          myValue: "2",
        },
      ],
    },
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "switch",
    type: "switch",
    label: "switch",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "time-select",
    type: "time-select",
    label: "time-select",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "time-picker",
    type: "time-picker",
    label: "time-picker",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "date-picker",
    type: "date-picker",
    label: "date-picker",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "custom",
    type: "custom",
    label: "custom",
    layoutProps: {},
    formItemProps: {},
    fieldProps: {},
    customLabel: "",
    customError: "",
    ref: "",
  },
  {
    key: "datetimerange",
    type: "date-picker",
    label: "datetimerange",
    fieldProps: {
      type: "datetimerange",
      "value-format": "yyyy-MM-dd HH:mm:ss",
      clearable: true,
    },
    formItemProps: {
      style: "width:calc(100% - 16px)",
    },
  },
];
// 表单响应数据对象
export const baseModel = {
  title: "",
  allocationCode: "",
  allocationState: "",
};
