<script lang="ts">
import { defineComponent, resolveComponent, h, RawProps } from "vue";
import { ElLoading } from "element-plus";
import { defaultConfig } from "./config";

const emits = ["open", "opened", "close", "closed"];

export default defineComponent({
  name: "DpDialog",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isShowHeader: {
      type: Boolean,
      default: true,
    },
    isShowFooter: {
      type: Boolean,
      default: true,
    },
    isShowCancel: {
      type: Boolean,
      default: true,
    },
    isShowConfirm: {
      type: Boolean,
      default: true,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
      default: "取 消",
    },
    confirmText: {
      type: String,
      default: "确 定",
    },
  },
  data() {
    return {
      loadingInstance: null as any,
    };
  },
  watch: {
    loading: {
      handler(newVal) {
        if (newVal) {
          this.loadingInstance = ElLoading.service({
            body: true,
            lock: true,
          });
        } else {
          if (this.loadingInstance) {
            this.loadingInstance.close();
            this.loadingInstance = null;
          }
        }
      },
      immediate: true,
    },
  },
  emits: [...emits, "confirm", "cancel"],
  beforeUnmount() {
    if (this.loadingInstance) {
      this.loadingInstance = null;
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleConfirm() {
      this.$emit("confirm");
    },
  },
  render() {
    // 事件监听器
    const listeners: { [propName: string]: () => void } = {};
    emits.forEach((key) => {
      listeners[
        `on${key.replace(/(^[a-z])|(-[a-z])/g, (item) =>
          item.replace("-", "").toUpperCase()
        )}`
      ] = (...args) => {
        this.$emit(key, ...args);
      };
    });

    const dialogProps: RawProps = {
      ...defaultConfig,
      ...this.$attrs,
      ...listeners,
      ref: "dialogRef",
    };

    if (!this.$attrs.fullscreen) {
      dialogProps.customClass = "limit_height";
    }

    const getDialogFooter = () => {
      if (!this.isShowFooter) {
        return "";
      }
      if (this.$slots.footerBtns) {
        return this.$slots.footerBtns();
      }

      const group = [];

      if (this.isShowCancel) {
        group.push(
          h(
            resolveComponent("el-button"),
            {
              // size: "small",
              onClick: this.handleCancel,
            },
            { default: () => this.cancelText }
          )
        );
      }

      if (this.isShowConfirm) {
        group.push(
          h(
            resolveComponent("el-button"),
            {
              type: "primary",
              // size: "small",
              loading: this.confirmLoading,
              onClick: this.handleConfirm,
            },
            { default: () => this.confirmText }
          )
        );
      }

      return group;
    };

    // const getDialogHeader = () => {
    //   if (!this.isShowHeader) return "";
    //   return h("span", { class: "el-dialog__title" }, this.$attrs.title);
    // };

    let dialogSlots: any = {};

    if (this.isShowFooter) {
      dialogSlots = {
        footer: () => {
          return h("span", { class: "dialog-footer" }, getDialogFooter());
        },
        ...this.$slots,
      };
    } else {
      Object.keys(this.$slots || {}).forEach((key) => {
        if (key !== "footer") {
          dialogSlots[key] = this.$slots[key];
        }
      });
    }

    return h(resolveComponent("el-dialog"), dialogProps, dialogSlots);
  },
});
</script>

<style lang="scss">
.limit_height {
  // :deep() {
  .el-dialog__header {
    padding: 9px 16px 9px;
    & > .el-dialog__title {
      font-weight: bold;
      line-height: 30px;
    }
  }
  .el-dialog__body {
    max-height: 60vh;
    padding: 16px 16px 0 16px;
    padding-top: 16px;
    overflow: auto;
  }
  .el-dialog__footer {
    padding: 10px 20px;
    border: 1px solid #e1e3e6;
  }
  // }
}
</style>
