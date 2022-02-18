<script lang="ts">
import { defineComponent, resolveComponent, PropType, h, ref } from "vue";
import { ElSelect } from "element-plus";

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
      type: Array as PropType<Array<Record<string, any>>>,
      default: () => [],
    },
  },
  emits,
  setup(props, { attrs, slots, emit, expose }) {
    const selectRef = ref<InstanceType<typeof ElSelect>>();
    // 事件监听器
    const listeners: { [propName: string]: (param?: string) => void } = {};
    emits.forEach((key) => {
      listeners[
        `on${key.replace(/(^[a-z])|(-[a-z])/g, (item) =>
          item.replace("-", "").toUpperCase()
        )}`
      ] = (...args) => {
        emit(key, ...args);
      };
    });

    const getChildren = () => {
      const { label = "label", value = "value" } = props.props || {};
      return props.options?.map((item) => {
        const elOptionProps: Record<string, any> = {
          ...item,
          label: item[label],
          value: item[value],
          key: item[value],
        };
        return h(resolveComponent("el-option"), elOptionProps);
      });
    };

    if (attrs.remote) {
      listeners["remote-method"] = (query: any) => {
        emit("remoteSearch", query);
      };
    }

    const getSelectRef = () => selectRef.value;

    expose({ getSelectRef });

    return () =>
      h(
        resolveComponent("el-select"),
        { ...attrs, ...listeners, ref: selectRef },
        { default: getChildren, ...slots }
      );
  },
});
</script>

<style lang="scss" scoped></style>
