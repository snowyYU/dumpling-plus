import { App } from "vue";
import Table from "./src/index.vue";

/* istanbul ignore next */
Table.install = function (app: App<Element>) {
  app.component(Table.name, Table);
};

export default Table;
