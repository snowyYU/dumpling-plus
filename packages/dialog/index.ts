import { App } from "vue";
import Dialog from "./src/index.vue";

/* istanbul ignore next */
Dialog.install = function (app: App<Element>) {
  app.component(Dialog.name, Dialog);
};

export default Dialog;
