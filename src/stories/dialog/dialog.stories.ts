import DpDialog from "~/dialog";
import DpSearchForm from "~/search-form";
import { ref } from "vue";

export default {
  title: "Example/Dialog 弹窗",
  component: DpDialog,
  // 参数配置
  argTypes: {
    title: {
      type: { name: "string", required: false },
      description: "头部标题",
    },
    isShowFooter: {
      type: { name: "boolean", required: false },
      description:
        "是否展示自定义底部按钮，为true时slot#footer将失效或由slot#footerBtns取代",
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
  },
};

const Template = (args: object) => ({
  // 组件已经被全局引入
  components: { DpDialog },
  setup() {
    const dialogVisible = ref(false);

    function cancel() {
      dialogVisible.value = false;
    }
    function confirm() {
      cancel();
    }

    return {
      ...args,
      dialogVisible,
      cancel,
      confirm,
    };
  },
  template: `
  <button @click="dialogVisible = true">打开弹窗</button>
  <dp-dialog
    v-model="dialogVisible"
    :title="title"
    width="80%"
    :isShowFooter="isShowFooter"
    :isShowCancel="isShowCancel"
    :isShowConfirm="isShowConfirm"
    :confirmLoading="confirmLoading"
    :loading="loading"
    :cancelText="cancelText"
    :confirmText="confirmText"
    @cancel="cancel"
    @confirm="confirm"
  >
    <span>This is a message</span>
  </dp-dialog>`,
});

export const base: any = Template.bind({});
// 放在args中的数据可通过控制台面板修改数据
base.args = {
  title: "温馨提示",
  cancelText: "取消按钮",
  confirmText: "确定按钮",
  isShowFooter: true,
  isShowCancel: true,
  isShowConfirm: true,
  confirmLoading: false,
  loading: false,
};
base.storyName = "基础";

export const embedded_other_component: any = () => ({
  components: {
    DpDialog,
    DpSearchForm,
  },

  setup() {
    const dialogVisible = ref(false);

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
      dialogVisible,
      schema,
      model,
      onSubmit,
      onReset,
    };
  },

  template: `
    <button @click="dialogVisible = true">打开弹窗</button>
    <dp-dialog
      v-model="dialogVisible"
      width="80%"
      title="内嵌【SearchForm】组件"
      >
      <p>hello</p>
      <dp-search-form
        ref="searchForm"
        :model="model"
        :schema="schema"
        @onSubmit="onSubmit"
        @onReset="onReset"
      >
      </dp-search-form>
    </dp-dialog>
  `,
});
embedded_other_component.storyName = "slot其他组件";
