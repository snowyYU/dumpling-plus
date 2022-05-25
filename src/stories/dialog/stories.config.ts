export const argTypes = {
  // element props
  "model-value/v-model": {
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: false,
      },
    },
    description: "是否显示 Dialog",
  },
  title: {
    table: {
      type: {
        summary: "string",
      },
    },
    // control: false,
    description: "头部标题",
  },
  width: {
    table: {
      type: {
        summary: "string | number",
      },
      defaultValue: {
        summary: "50%",
      },
    },
    control: {
      type: "text",
    },
    description: "Dialog 的宽度	",
  },
  fullscreen: {
    type: { name: "boolean", required: false },
    description: "是否为全屏 Dialog",
  },
  top: {
    table: {
      type: {
        summary: "string",
        // detail: 'Something really really long',
      },
      defaultValue: {
        summary: "15vh",
        // detail: 'Something'
      },
    },
    control: {
      type: "text",
    },
    description: "是否为全屏 Dialog",
  },
  // props
  isShowFooter: {
    type: { name: "boolean", required: false },
    description:
      "是否展示自定义底部按钮：为true时slot#footer将失效或由slot#footerBtns取代",
  },
  isShowCancel: {
    type: { name: "boolean", required: false },
    description: "是否展示取消按钮",
  },
  isShowConfirm: {
    type: { name: "boolean", required: false },
    description: "是否展示确认按钮",
  },
  loading: {
    type: { name: "boolean", required: false },
    description: "接口服务loading",
  },
  confirmLoading: {
    type: { name: "boolean", required: false },
    description: "确认按钮loading，为true时不可点击",
  },
  cancelText: {
    type: { name: "string", required: false },
    description: "取消按钮文案",
  },
  confirmText: {
    type: { name: "string", required: false },
    description: "确认按钮文案",
  },
  // emit events
  confirm: {
    type: { name: "function", required: false },
    description: "isShowConfirm为true状态下取消按钮的回调事件",
  },
  cancel: {
    type: { name: "function", required: false },
    description: "isShowCancel为true状态下取消按钮的回调事件",
  },
  // slots
  footerBtns: {
    type: { name: "object", required: false },
    description: "底部按钮 slot，isShowFooter为false时不展示",
  },
  key: {
    type: { name: "object", required: false },
    description: "底部按钮 slot，isShowFooter为false时不展示",
  },
}

export const parameters = {
  backgrounds: {},
  docs: {},
}