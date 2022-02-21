<script lang="ts">
import { defineComponent, resolveComponent, h, RawChildren } from "vue";
import { defaultPaginationProps } from "./config";

const emits = [
  "size-change",
  "current-change",
  "prev-click",
  "next-click",
  "update:current-page",
  "update:page-size",
];

export default defineComponent({
  name: "DpPagination",
  props: {
    showPageMsg: {
      type: Boolean,
      default: false,
    },
    showJumper: {
      type: Boolean,
      default: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 30,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      jumpPage: "1",
    };
  },
  computed: {
    // 总页数
    pages() {
      if (
        typeof this.total === "number" &&
        typeof this.pageSize === "number" &&
        this.pageSize !== 0
      ) {
        return Math.ceil(this.total / this.pageSize);
      } else {
        return 0;
      }
    },
    mergePaginationProps() {
      return {
        ...defaultPaginationProps,
        ...this.$attrs,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        total: this.total,
      };
    },
  },
  emits,
  methods: {
    handleJump() {
      const jumpPage = +this.jumpPage;
      if (!jumpPage || jumpPage === this.currentPage) return;
      const jumpIdx = this.pages < jumpPage ? this.pages : jumpPage;
      this.jumpPage = (jumpIdx > 0 ? jumpIdx : 1) + "";
      this.$emit("update:current-page", jumpIdx);
    },

    handleEnter(e: KeyboardEvent) {
      if (e.keyCode === 13) {
        this.handleJump();
      }
    },

    handleBlur() {
      if (!+this.jumpPage) {
        this.jumpPage = "1";
      }
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

    const paginationContent = [];

    if (this.showPageMsg) {
      paginationContent.push(
        h("div", { class: "pagination-sizes" }, [
          h(
            "span",
            { class: "total" },
            `共 ${this.pages} 页，${this.total} 条`
          ),
          "每页",
          h(
            resolveComponent("el-select"),
            {
              modelValue: this.pageSize,
              // size: "small",
              "onUpdate:modelValue": (value: any) =>
                this.$emit("update:page-size", value),
            },
            {
              default: () => {
                return this.mergePaginationProps.pageSizes.map((item) => {
                  return h(resolveComponent("el-option"), {
                    key: item,
                    label: item,
                    value: item,
                  });
                });
              },
            }
          ),
          "条",
        ])
      );
    }

    const paginationProps = {
      ...this.mergePaginationProps,
      ...listeners,
    };

    let jumperContent: RawChildren = [];

    if (this.showJumper) {
      (paginationProps as typeof paginationProps & { class?: string }).class =
        "show-jumper";

      jumperContent = [
        "跳至",
        h(resolveComponent("el-input"), {
          modelValue: this.jumpPage,
          // size: "small",
          "onUpdate:modelValue": (value: string) => (this.jumpPage = value),
          onKeyup: this.handleEnter,
          onBlur: this.handleBlur,
        }),
        h("span", { style: { margin: "5px" } }, "页"),
      ];
    }

    paginationContent.push(
      h("div", { class: "jumper" }, [
        h(resolveComponent("el-pagination"), paginationProps),
        ...jumperContent,
      ])
    );

    return h("div", { class: "pagination-container" }, [
      h(
        "div",
        { class: "pagination-tools" },
        this.$slots.left ? this.$slots.left() : []
      ),
      h("div", { class: "pagination-content" }, paginationContent),
    ]);
  },
});
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  // justify-content: flex-end;
  align-items: center;
  margin-right: 5px;
  color: #3a3a3d;
  font-weight: 400;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;

  .pagination-tools {
    flex: 1;
  }

  .pagination-content {
    display: flex;
    // justify-content: flex-end;
    // width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  :deep() {
    .el-pagination {
      .show-jumper {
        margin-right: 20px;
      }

      .btn-prev,
      .btn-next {
        width: 32px;
        height: 32px;
        line-height: 32px;
        background-color: #fff;
        border: 1px solid #e1e3e6;
        border-radius: 4px;
      }

      &.is-background {
        .btn-prev:disabled {
          background: #f4f5f7 !important;
        }

        .btn-next:disabled {
          background: #f4f5f7 !important;
        }
      }

      button {
        width: 32px;
        background-color: #fff;
        border: 1px solid #e1e4eb;
      }

      .el-pager {
        li {
          width: 32px;
          height: 32px;
          margin: 0 4px;
          color: #242833;
          line-height: 32px;
          background-color: #fff;
          border: 1px solid rgba(225, 228, 235, 1);
        }

        .number {
          width: 32px;
          height: 32px;
          line-height: 32px;
          background-color: #fff;
          border: 1px solid #e1e3e6;
          border-radius: 4px;
        }
      }
    }

    .pagination-sizes {
      margin-right: 20px;
      padding: 2px 0;
      color: rgba(36, 40, 51, 1);
      font-weight: 400;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 22px;
      white-space: nowrap;
      .total {
        margin-right: 20px;
      }
      .el-select {
        width: 78px;
        margin: 0 5px;
        .el-input__inner {
          font-size: 14px;
        }
      }
    }
    .jumper {
      display: flex;
      align-items: center;
      color: rgba(36, 40, 51, 1);
      font-weight: 400;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      white-space: nowrap;
      .el-input {
        width: 48px;
        margin-left: 5px;
        .el-input__inner {
          &:focus {
            border-color: #4a81fe;
          }
        }
      }
      .btn-jump {
        width: 76px;
        height: 32px;
        margin-left: 11px;
        padding: 0;
        color: rgba(36, 40, 51, 1);
        font-weight: 400;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        &:hover {
          border-color: #4a81fe;
        }
      }
    }
  }
}
</style>
