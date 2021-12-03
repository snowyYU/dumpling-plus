<script lang="ts">
import { defineComponent, resolveComponent, PropType, h } from "vue";
// import { ElRadioGroup } from "element-plus";

const emits = ["blur", "focus", "change", "input", "clear", "select"];

export default defineComponent({
  name: "DpRadioGroup",
  props: {
    props: {
      type: Object as PropType<{ label: string; value: string }>,
      default: () => ({}),
    },
    options: {
      type: Array as PropType<Array<{ [propName: string]: string }>>,
      default: () => [],
    },
    radioButton: {
      type: Boolean,
      default: false,
    },
  },
  emits,
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

    const getChildren = () => {
      const { label = "label", value = "value" } = this.props || {};
      return this.options?.map((item) => {
        const componentName = this.radioButton ? "el-radio-button" : "el-radio";
        return h(
          resolveComponent(componentName),
          { ...item, label: item[value] },
          {
            default: () => item[label],
          }
        );
      });
    };

    return h(
      resolveComponent("el-radio-group"),
      { ...this.$attrs, ...listeners, ref: "radioGroupRef" },
      { default: getChildren }
    );
  },
});
</script>
