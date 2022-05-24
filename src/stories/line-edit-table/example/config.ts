/**
 * prop { string } key，唯一绑定值，
 * type { string } 表格项类型：
 *    text: 文字类型，如有slot[prop]则用，如无则用data数据中行数据row[prop]
 *    input: 输入框控件
 *    input-number: 数字类型输入框控件
 *    select: 数据下拉框
 *    time-picker: 时间选择器
 *    time-select: 时间选择
 *    date-picker: 日期选择器
 *    switch: 开关
 *    
 * rules { array } 校验规则
 * customRulesName { string } 自定义规则名称：可自主传入某个规则名称，并添加key为规则名称的校验事件
 * fieldProps { object } 透传input组件props参数
 * customDisabledName { string } type为input或switch时，可自定义禁用标记，默认为`${prop}_disabled`，当data数据中行数据row[customDisabledName]不为undefined标记为true
 * customOptionsName { string } 自定义type:select下拉框options名称，默认为`${prop}_options`，并从data数据中行数据row[customOptionsName]获取配置数据
 * dpColumn { object } 多级表头
 * 
 */
export interface scopeType {
  $index: number
  cellIndex: number
  column: object
  expanded: boolean
  row: object
  store: object
  _self: object
}

export interface dataType {
  text: string
  input: string
  inputNumber: number
  select: string
  timePicker: string
  timeSelect: Date
  datePicker: string
  switch: boolean
}
export const columns = [
  {
    prop: 'text',
    label: 'text',
    type: 'text',
  },
  {
    prop: 'input',
    label: 'input',
    type: 'input',
    rules: [
      { required: true, message: "请输入一下内容", trigger: "blur" }
    ],
  },
  {
    prop: 'inputNumber',
    label: 'input-number',
    type: 'input-number',
  },
  {
    prop: 'select',
    label: 'select',
    type: 'select',
    fieldProps: {
      options: [
        {
          label: '周杰伦',
          value: 'zjl',
        },
        {
          label: '李小龙',
          value: 'lxl',
        },
      ]
    },
  },
  {
    prop: 'timePicker',
    label: 'time-picker',
    type: 'time-picker',
  },
  {
    prop: 'timeSelect',
    label: 'time-select',
    type: 'time-select',
  },
  {
    prop: 'datePicker',
    label: 'date-picker',
    type: 'date-picker',
  },
  {
    prop: 'switch',
    label: 'switch',
    type: 'switch',
  },

]
export const data = [
  {
    text: '单纯展示',
    input: '可输入',
    inputNumber: 101,

    select: 'lxl',

    timePicker: '',
    timeSelect: '',
    datePicker: '',
    switch: '',
  }
]

