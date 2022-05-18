import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
// import router from "./router";
// import { store } from "./store";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import zhCn from "element-plus/es/locale/lang/zh-cn";
// import Dumpling from "dumpling-plus";
// import "normalize.css";

// import "@/styles/index.scss";

createApp(App)
  // .use(store)
  // .use(router)
  // .use(ElementPlus, {
  //   locale: zhCn,
  // })
  // .use(Dumpling, { downloadResponseById: "downloadResponseById" })
  .mount("#app");
