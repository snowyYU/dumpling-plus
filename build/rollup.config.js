// import vue from 'rollup-plugin-vue'
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";
// import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";
import scss from "rollup-plugin-scss";
import typescript from "rollup-plugin-typescript2";
import PostCSS from "rollup-plugin-postcss";
import pkg from "../package.json";
const deps = Object.keys(pkg.dependencies);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vue = require("rollup-plugin-vue");

export default [
  {
    input: path.resolve(__dirname, "../packages/index.ts"),
    output: [
      {
        name: "DumplingPlus",
        format: "umd",
        // format: "umd",
        file: pkg.main,
        globals: {
          vue: "Vue",
          lodash: "lodash",
        },
      },
    ],
    plugins: [
      // terser(),
      nodeResolve(),
      // commonjs(),
      // css(),
      // scss(),
      vue({
        target: "browser",
        // css: false,
        exposeFilename: false,
        preprocessStyles: true,
        // PostCSS-modules options for <style module> compilation
        // cssModulesOptions: {
        //   generateScopedName: "[local]___[hash:base64:5]",
        // },
      }),
      PostCSS(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: ["packages/**/*", "typings/shims-vue.d.ts"],
          exclude: ["node_modules", "packages/**/__tests__/*"],
        },
        abortOnError: false,
      }),
    ],
    // external: ["@vue"],
    external(id) {
      return /^vue/.test(id) || deps.some((k) => new RegExp("^" + k).test(id));
    },
  },
];
