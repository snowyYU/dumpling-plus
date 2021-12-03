import { App } from "vue";
import RadioGroup from "./src/index.vue";

/* istanbul ignore next */
RadioGroup.install = function (app: App<Element>) {
  app.component(RadioGroup.name, RadioGroup);
};

export default RadioGroup;
