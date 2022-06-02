export const baseFormSchema = [
  // 隐藏
  {
    visible: false,
    key: "hidden",
    type: "rawtext",
    label: "hidden",
    layoutProps: {},
    formItemProps: "",
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  // 自定义项
  {
    key: "module-custom",
    type: "module-custom",
    label: "module-custom",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  // form-area-title
  {
    key: "form-area-title",
    type: "form-area-title",
    label: "type:form-area-title，formAreaTitleType: 'newBlue'|'',表单分组",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "newBlue",
    height: "50",
    ref: "",
  },

  // 原始文本
  {
    key: "rawtext",
    type: "rawtext",
    label: "rawtext",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "input",
    type: "input",
    label: "input",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "autocomplete",
    type: "autocomplete",
    label: "autocomplete",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "input-number",
    type: "input-number",
    label: "input-number",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "textarea",
    type: "textarea",
    label: "textarea",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "select",
    type: "select",
    label: "select",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
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
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "cascader",
    type: "cascader",
    label: "cascader",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
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
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "radio",
    type: "radio",
    label: "radio",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
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
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "checkbox",
    type: "checkbox",
    label: "checkbox",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
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
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "switch",
    type: "switch",
    label: "switch",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "time-select",
    type: "time-select",
    label: "time-select",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "time-picker",
    type: "time-picker",
    label: "time-picker",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "date-picker",
    type: "date-picker",
    label: "date-picker",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "upload",
    type: "upload",
    label: "upload",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "custom",
    type: "custom",
    label: "custom",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "customLabel",
    type: "custom",
    label: "customLabel",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
    },
    fieldProps: {},
    customLabel: "customLabel",
    customError: "customError",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
];

export const baseFormData = {
  hidden: "隐藏项",
  rawtext: "原始文本",
};

export const validateFormSchema = [
  {
    key: "name",
    type: "input",
    label: "姓名",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
      required: true,
      rules: [{ required: true, message: "请确保已输入姓名", trigger: "blur" }],
    },
    fieldProps: {},
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "site",
    type: "input",
    label: "地址",
    layoutProps: {},
    formItemProps: {
      "label-width": "200px",
      required: true,
      rules: [
        { required: true, message: "请确保已输入完整地址", trigger: "blur" },
      ],
    },
    fieldProps: {},
    customLabel: true,
    customError: true,
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
];
export const validateFormData = {
  name: "",
  site: "",
};

export const datePickerFormSchema = [
  {
    key: "year",
    type: "date-picker",
    label: "year",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "year",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "month",
    type: "date-picker",
    label: "month",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "month",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "date",
    type: "date-picker",
    label: "date",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "date",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "dates",
    type: "date-picker",
    label: "dates",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "dates",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "datetime",
    type: "date-picker",
    label: "datetime",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "datetime",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "datetimerange",
    type: "date-picker",
    label: "datetimerange",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "datetimerange",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "daterange",
    type: "date-picker",
    label: "daterange",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "daterange",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
  {
    key: "monthrange",
    type: "date-picker",
    label: "monthrange",
    layoutProps: {},
    formItemProps: {
      "label-width": "100px",
    },
    fieldProps: {
      type: "monthrange",
    },
    customLabel: "",
    customError: "",
    formAreaTitleType: "",
    height: "",
    ref: "",
  },
];
export const datePickerFormDate = {
  year: "",
  month: "",
};
