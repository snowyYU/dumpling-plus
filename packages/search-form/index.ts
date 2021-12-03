import { App } from "vue";
import SearchForm from "./src/index.vue";

/* istanbul ignore next */
SearchForm.install = function (app: App<Element>) {
  app.component(SearchForm.name, SearchForm);
};

export default SearchForm;
