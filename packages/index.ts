import { App } from "vue";
import SchemaForm from "./schema-form/index";
import SearchForm from "./search-form/index";
import Upload from "./upload/index";
import Dialog from "./dialog/index";
import Table from "./table/index";
import PaginationTable from "./pagination-table/index";
import LineEditTable from "./line-edit-table/index";

const components = [
  SchemaForm,
  SearchForm,
  Upload,
  Dialog,
  Table,
  PaginationTable,
  LineEditTable,
];

const install = function (
  app: App<Element>,
  options: { [propName: string]: unknown } = {}
): void {
  components.forEach((component) => {
    if (component.name === "DpUpload") {
      Object.keys(options).forEach((key) => {
        component.props[key] = {
          type:
            typeof options[key] === "function"
              ? Function
              : [String, Number, Boolean, Array, Object],
          default: ["string", "number", "boolean", "function"].includes(
            typeof options[key]
          )
            ? options[key]
            : () => options[key],
        };
      });
    }
    app.component(component.name, component);
  });
};

export default {
  install,
  SchemaForm,
  SearchForm,
  Upload,
  Dialog,
  Table,
  PaginationTable,
  LineEditTable,
};
