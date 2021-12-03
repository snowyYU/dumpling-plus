import { App } from "vue";

import Pagination from "./src/index.vue";

/* istanbul ignore next */
Pagination.install = function (app: App<Element>) {
  app.component(Pagination.name, Pagination);
};

export default Pagination;
