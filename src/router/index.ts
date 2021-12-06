import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "@/layout/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: "/complex/searchForm",
  },
  {
    path: "/complex",
    component: Layout,
    redirect: "noredirect",
    meta: {
      title: "复杂组件",
      // icon: '#icon404'
    },
    children: [
      {
        path: "/complex/searchForm",
        component: () =>
          import(
            /* webpackChunkName: "complex-search-form" */ "@/views/complex/search-form/index.vue"
          ),
        name: "searchForm",
        meta: {
          title: "搜索表单",
          noCache: true,
        },
      },
      {
        path: "/complex/baseTable",
        component: () =>
          import(
            /* webpackChunkName: "complex-base-table" */ "@/views/complex/base-table/index.vue"
          ),
        name: "baseTable",
        meta: {
          title: "基础配置表格",
          noCache: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
