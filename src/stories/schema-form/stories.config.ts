/**
 * schema字段参数：
 * visible: 是否展示
 * layoutProps: 布局col透传props
 * formItemProps: form-item透传props
 * fieldProps: 控件透传props
 * key: 表单项item唯一值
 * type: 类型
 *        module-custom: 自定义，配合slot:`${item.key}-module-custom`
 *        form-area-title: 配合formAreaTitleType
 *        rawtext: 原始文本，直接展示item.key对应的值
 *        input: 输入控件
 *        autocomplete: 输入控件，可进行数据筛选
 *        input-number: 限定数字输入
 *        textarea: 文本框
 *        select: 下拉框
 *        cascader: 级联选择器
 *        radio: 单选
 *        checkbox: 多选
 *        switch: 开关
 *        time-select: 时间选择
 *        time-picker: 时间选择器
 *        date-picker: 日期选择器
 *        upload: 上传
 *        custom: 自定义，渲染插槽slot:`${item.key}-custom`
 * customLabel: 自定义标签文本，配合slots#`${item.key}-custom-label`
 * customError: 自定义表单域验证错误时的提示信息，配合slots#`${item.key}-custom-error`
 * label: 标签
 * formAreaTitleType: 当type:form-area-title时，展示的标题
 * height: 当type:form-area-title时，标题元素的高度
 * ref: 当type:cascader||upload时，可定义控件ref以便获取该控件元素
 */

export const argTypes = {
  // props
  "model": {
    type: { name: "object", required: true },
    description: "数据对象",
    table: {
      type: {
        summary: "object",
      },
      category: 'props',
    },
  },
  formProps: {
    description: "表单透传props",
  },
  schema: {
    description: "表单项配置参数",
  },

  // emits

  // events
  "custom-update": {
    description: "当控件数据更新时触发，参数为key, value",
  },
  "update:model": {
    description: "当控件数据更新时触发",
  },
  "input": {
    description: "当输入框获得焦点时触发",
  },
  "blur": {
    description: "当输入框失去焦点时触发",
  },
  "change": {
    description: "当控件数据发生变化时触发",
  },
  "select": {
    description: "当type:autocomplete选中数据发生变化时触发",
  },
  "visible-change": {
    description: "下拉框出现/隐藏时触发",
  },
  "upload-update": {
    description: "当type:upload文件列表更新时触发",
  },
  "file-success": {
    description: "当type:upload文件列表上传成功时触发",
  },
  "remove-success": {
    description: "当type:upload文件列表移除文件时触发",
  },

  validate: {
    table: {
      category: 'events',
    },
    description: "对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise",
  },
  validateField: {
    table: {
      category: 'events',
    },
    description: "传入表单项的 prop 属性或者 prop 组成的数组，对部分表单字段进行校验的方法",
  },
  resetFields: {
    table: {
      category: 'events',
    },
    description: "对整个表单进行重置，将所有字段值重置为初始值并移除校验结果",
  },
  clearValidate: {
    table: {
      category: 'events',
    },
    description: "移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果",
  },
}