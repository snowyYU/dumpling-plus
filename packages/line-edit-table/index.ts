import { App } from "vue";
import LineEditTable from "./src/index.vue";

/* istanbul ignore next */
LineEditTable.install = function (app: App<Element>) {
  app.component(LineEditTable.name, LineEditTable);
};

export default LineEditTable;
