/*
 * @Author: jasper
 * @Date: 2021-12-02 16:49:05
 * @LastEditors: jasper
 * @LastEditTime: 2022-07-25 16:22:57
 * @FilePath: /dumpling-plus/packages/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { App } from "vue";
import SchemaForm from "./schema-form/index";
import SearchForm from "./search-form/index";
import Upload from "./upload/index";
import Dialog from "./dialog/index";
import Table from "./table/index";
import Pagination from "./pagination/index";
import PaginationTable from "./pagination-table/index";
import LineEditTable from "./line-edit-table/index";
import CheckboxGroup from "./checkbox-group/index";
import RadioGroup from "./radio-group/index";
import Select from "./select/index";

const components = [
  SchemaForm,
  SearchForm,
  Upload,
  Dialog,
  Table,
  Pagination,
  PaginationTable,
  LineEditTable,
  CheckboxGroup,
  RadioGroup,
  Select,
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
  Pagination,
  PaginationTable,
  LineEditTable,
  CheckboxGroup,
  RadioGroup,
  Select,
};
