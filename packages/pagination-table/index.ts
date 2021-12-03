import { App } from "vue";
import PaginationTable from "./src/index.vue";

/* istanbul ignore next */
PaginationTable.install = function (app: App<Element>) {
  app.component(PaginationTable.name, PaginationTable);
};

export default PaginationTable;
