import { App } from "vue";
import Select from "./src/index.vue";

/* istanbul ignore next */
Select.install = function (app: App<Element>) {
  app.component(Select.name, Select);
};

export default Select;
