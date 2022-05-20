import DpDialog from "~/dialog";
import DpSearchForm from "~/search-form";
import { ref } from "vue";
import { argTypes, parameters } from './stories.config'

export default {
  title: "Dialog 弹窗",
  component: DpDialog,
  // 参数配置
  argTypes: argTypes,
  // 
  parameters: parameters,
};

const Template = (args: object) => ({
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
    }
  },
  template: `
  <button @click="dialogVisible = true">打开弹窗</button>
  <dp-dialog
    v-model="dialogVisible"
    :title="title"
    width="80%"
    :fullscreen="fullscreen"
    :top="top"
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
  fullscreen: false,
  // top: '200px',
};
base.storyName = "基础";

// ==
export const hasFooterBtns: any = (args: object) => ({
  components: {
    DpDialog,
  },

  setup() {
    const dialogVisible = ref(false);
    return {
      ...args,
      dialogVisible,
    };
  },

  template: `
    <button @click="dialogVisible = true">打开弹窗</button>
    <dp-dialog
      v-model="dialogVisible"
      :isShowFooter="isShowFooter"
      width="80%"
      title="内嵌【SearchForm】组件"
      >
      <template #default>
        <div>默认slot</div>
      </template>
      <template #footerBtns>
        <p>底部footerBtns slot</p>
      </template>
    </dp-dialog>
  `,
});
hasFooterBtns.args = {
  isShowFooter: false,
};
hasFooterBtns.storyName = "slot#footerBtns";

// ==
export const embedded_other_component: any = (args: object) => ({
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
      ...args,
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
embedded_other_component.args = {};
embedded_other_component.storyName = "默认slot为其他组件";
