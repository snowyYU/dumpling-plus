import { App } from "vue";
import SchemaForm from "./src/index.vue";

/* istanbul ignore next */
SchemaForm.install = function (app: App<Element>) {
  app.component(SchemaForm.name, SchemaForm);
};

export default SchemaForm;
