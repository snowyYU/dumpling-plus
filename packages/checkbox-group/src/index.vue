<script lang="ts">
import { defineComponent, resolveComponent, PropType, h } from "vue";
// import { ElCheckboxGroup } from "element-plus";

const emits = ["blur", "focus", "change", "input", "clear", "select"];

export default defineComponent({
  name: "DpCheckboxGroup",
  props: {
    props: {
      type: Object as PropType<{ label: string; value: string }>,
      default: () => ({}),
    },
    options: {
      type: Array as PropType<Array<{ [propName: string]: string }>>,
      default: () => [],
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
        return h(
          resolveComponent("el-checkbox"),
          { ...item, label: item[value] },
          {
            default: () => item[label],
          }
        );
      });
    };

    return h(
      resolveComponent("el-checkbox-group"),
      { ...this.$attrs, ...listeners, ref: "checkboxGroupRef" },
      { default: getChildren }
    );
  },
});
</script>
