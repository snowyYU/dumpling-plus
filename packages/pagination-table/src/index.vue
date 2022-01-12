<script lang="ts">
import {
  defineComponent,
  h,
  RawSlots,
  // resolveComponent,
  // Slot,
} from "vue";
import DpTable from "../../table/src/index.vue";
import DpPagination from "../../pagination/src/index.vue";
import { camelCaseToKebabCase } from "@/utils/index";

const paginationPropNames = [
  "small",
  "background",
  "page-size",
  "default-page-size",
  "total",
  "page-count",
  "pager-count",
  "current-page",
  "default-current-page",
  "layout",
  "page-sizes",
  "popper-class",
  "prev-text",
  "next-text",
  "disabled",
  "hide-on-single-page",
  "show-page-msg",
  "show-jumper",
];

function filterValues<T>(
  a: { [propName: string]: unknown },
  b: Array<string>,
  c: number | undefined = 0
) {
  const formatB = b.map(camelCaseToKebabCase);
  const values: { [propName: string]: unknown } = {};
  Object.keys(a).forEach((key) => {
    const formatKey = camelCaseToKebabCase(key);
    if (c) {
      if (formatB.includes(formatKey)) {
        values[key] = a[key];
      }
    } else {
      values[formatKey] = a[formatKey];
    }
    // if (!!c === !!formatB.includes(formatKey)) {
    //   values[formatKey] = a[formatKey];
    // }
  });
  return values as unknown as T;
}

const tableEmits = [
  "select",
  "select-all",
  "selection-change",
  "cell-mouse-enter",
  "cell-mouse-leave",
  "cell-click",
  "cell-dblclick",
  "cell-contextmenu",
  "row-click",
  "row-contextmenu",
  "row-dblclick",
  "header-click",
  "header-contextmenu",
  "sort-change",
  "filter-change",
  "current-change",
  "header-dragend",
  "expand-change",
];

const paginationEmits = ["update:current-page", "update:page-size"];

export default defineComponent({
  name: "DpPaginationTable",
  props: {
    showPagination: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    hasParentTable() {
      return this.$parent?.$options.name === "IntegratedPage";
    },
    // 表格参数
    tableProps() {
      return filterValues(this.$attrs, paginationPropNames);
    },
    // 分页参数
    paginationProps() {
      return filterValues(this.$attrs, paginationPropNames, 1);
    },
  },
  emits: [...tableEmits, ...paginationEmits],
  methods: {
    /**
     * updateModelValue 事件
     */
    handleUpdateModelValue(key: string, ...args: Array<unknown>) {
      this.$emit(`update:${key}`, ...args);
    },
  },
  render() {
    // 事件监听器
    const tableListeners: { [propName: string]: () => void } = {};
    tableEmits.forEach((key) => {
      tableListeners[
        `on${key.replace(/(^[a-z])|(-[a-z])/g, (item) =>
          item.replace("-", "").toUpperCase()
        )}`
      ] = (...args) => {
        this.$emit(key, ...args);
      };
    });

    const children = [
      h(
        DpTable,
        {
          ref: "tableRef",
          class: "pagination-table__base-table",
          ...(this.tableProps as any),
          ...tableListeners,
        },
        this.$slots
      ),
    ];

    if (this.showPagination) {
      const paginationSlots: RawSlots = {};

      if (this.$slots["pagination-left"]) {
        paginationSlots.left = this.$slots["pagination-left"];
      }

      children.push(
        h(
          DpPagination,
          {
            ref: "paginationRef",
            class: "pagination",
            ...(this.paginationProps as any),
            "onUpdate:currentPage": (...args: any[]) =>
              this.handleUpdateModelValue("current-page", ...args),
            "onUpdate:pageSize": (...args: any[]) =>
              this.handleUpdateModelValue("page-size", ...args),
          },
          paginationSlots
        )
      );
    }

    return h("div", { class: "pagination-table" }, children);
  },
});
</script>

<style lang="scss" scoped>
.pagination-table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  // &__base-table {
  // height: calc(100% - 30px);
  // }
  .pagination {
    margin-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
