<script lang="ts">
import { defineComponent, resolveComponent, PropType, h } from "vue";
// import { ElSelect } from "element-plus";

const emits = [
  "change",
  "visible-change",
  "remove-tag",
  "clear",
  "blur",
  "focus",
  "remoteSearch",
];

export default defineComponent({
  name: "DpSelect",
  props: {
    props: {
      type: Object as PropType<{ label: string; value: string; key?: string }>,
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
    const listeners: { [propName: string]: (param?: string) => void } = {};
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
      const { label = "label", value = "value", key = "" } = this.props || {};
      if (key) {
        return this.options?.map((item) => {
          return h(resolveComponent("el-option"), {
            ...item,
            label: item[label],
            value: item[value],
            key: item[key],
          });
        });
      } else {
        return this.options?.map((item) => {
          return h(resolveComponent("el-option"), {
            ...item,
            label: item[label],
            value: item[value],
          });
        });
      }
    };
    if (this.$attrs.remote) {
      listeners["remote-method"] = (query: any) => {
        this.$emit("remoteSearch", query);
      };
    }
    return h(
      resolveComponent("el-select"),
      { ...this.$attrs, ...listeners, ref: "selectRef" },
      { default: getChildren, ...this.$slots }
    );
  },
});
</script>

<style lang="scss" scoped></style>
