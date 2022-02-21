<script lang="ts">
import {
  defineComponent,
  h,
  // RawProps,
  // resolveComponent,
  // Slot,
  ref,
  computed,
  // getCurrentInstance,
} from "vue";
import type { RawSlots } from "vue";
import DpTable from "@/packages/table/src/index.vue";
import DpPagination from "@/packages/pagination/src/index.vue";
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
  a: Record<string, any>,
  b: Array<string>,
  c: number | undefined = 0
) {
  const formatB = b.map(camelCaseToKebabCase);
  const values: Record<string, any> = {};
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
  return values as T;
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
  emits: [...tableEmits, ...paginationEmits],
  setup(props, { attrs, slots, emit, expose }) {
    // const internalInstance = getCurrentInstance();
    const tableRef = ref<InstanceType<typeof DpTable>>();
    const paginationRef = ref<InstanceType<typeof DpPagination>>();

    // const hasParentTable = computed(() => {
    //   return (
    //     internalInstance?.proxy?.$parent?.$options.name === "IntegratedPage"
    //   );
    // });

    // 表格参数
    const tableProps = computed(() => {
      return filterValues(attrs, paginationPropNames);
    });

    // 分页参数
    const paginationProps = computed(() => {
      return filterValues(attrs, paginationPropNames, 1);
    });

    // 事件监听器
    const tableListeners: { [propName: string]: () => void } = {};
    tableEmits.forEach((key) => {
      tableListeners[
        `on${key.replace(/(^[a-z])|(-[a-z])/g, (item) =>
          item.replace("-", "").toUpperCase()
        )}`
      ] = (...args) => {
        emit(key, ...args);
      };
    });

    /**
     * updateModelValue 事件
     */
    const handleUpdateModelValue = (key: string, ...args: Array<unknown>) => {
      emit(`update:${key}`, ...args);
    };

    const getChildren = () => {
      const children = [
        h(
          DpTable,
          {
            ref: tableRef,
            class: "pagination-table__base-table",
            ...(tableProps.value as any),
            ...tableListeners,
          },
          slots
        ),
      ];

      if (props.showPagination) {
        const paginationSlots: RawSlots = {};

        if (slots["pagination-left"]) {
          paginationSlots.left = slots["pagination-left"];
        }

        children.push(
          h(
            DpPagination,
            {
              ref: paginationRef,
              class: "pagination",
              ...(paginationProps.value as any),
              "onUpdate:currentPage": (...args: any[]) =>
                handleUpdateModelValue("current-page", ...args),
              "onUpdate:pageSize": (...args: any[]) =>
                handleUpdateModelValue("page-size", ...args),
            },
            paginationSlots
          )
        );
      }

      return children;
    };

    expose({
      getTableRef: () => tableRef.value,
      getPaginationRef: () => paginationRef.value,
    });

    return () => h("div", { class: "pagination-table" }, getChildren());
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
