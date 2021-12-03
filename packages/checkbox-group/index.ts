import { App } from "vue";
import CheckboxGroup from "./src/index.vue";

/* istanbul ignore next */
CheckboxGroup.install = function (app: App<Element>) {
  app.component(CheckboxGroup.name, CheckboxGroup);
};

export default CheckboxGroup;
