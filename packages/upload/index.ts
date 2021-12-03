import { App } from "vue";
import Upload from "./src/index.vue";

/* istanbul ignore next */
Upload.install = function (app: App<Element>) {
  app.component(Upload.name, Upload);
};

export default Upload;
