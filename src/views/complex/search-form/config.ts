export const searchFormSchema = [
  {
    key: "labelType",
    type: "select",
    label: "",
    layoutProps: {
      span: 3,
    },
    fieldProps: {
      clearable: false,
      options: [
        { label: "统计期", value: "1" },
        { label: "操作日期", value: "2" },
      ],
    },
  },
  {
    key: "periodId",
    type: "select",
    label: "",
    visible: true,
    layoutProps: {
      span: 6,
    },
    fieldProps: {
      clearable: false,
      options: [],
    },
  },
  {
    key: "dateRange",
    type: "date-picker",
    label: "",
    visible: false,
    layoutProps: {
      span: 9,
    },
    fieldProps: {
      type: "daterange",
    },
  },
  {
    key: "supplierId",
    type: "select",
    label: "供应商",
    visible: true,
    layoutProps: {
      span: 5,
    },
    fieldProps: {
      options: [],
      props: {
        label: "supplierName",
        value: "id",
      },
    },
  },
  {
    key: "materialCode",
    type: "input",
    label: "物资编码",
    visible: true,
    layoutProps: {
      span: 5,
    },
    fieldProps: {},
  },
  {
    key: "materialName",
    type: "input",
    label: "物资名称",
    visible: true,
    layoutProps: {
      span: 6,
    },
    fieldProps: {},
  },
  {
    key: "ticketNo",
    type: "input",
    label: "单据号",
    visible: true,
    layoutProps: {
      span: 6,
    },
    fieldProps: {},
  },
  {
    key: "billNo",
    type: "input",
    label: "发票号",
    visible: true,
    layoutProps: {
      span: 6,
    },
    fieldProps: {},
  },
  {
    key: "auditState",
    type: "select",
    label: "状态",
    visible: true,
    layoutProps: {
      span: 6,
    },
    fieldProps: {
      props: { label: "dictValue", value: "dictCode" },
      options: [],
    },
  },
];
export const searchFormData = {
  labelType: "1",
  periodId: "",
  dateRange: [],
  supplierId: "",
  materialCode: "",
  materialName: "",
  ticketNo: "",
  billNo: "",
  auditState: "",
};
