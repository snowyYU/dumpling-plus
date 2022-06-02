/*
 * @Author: jasper
 * @Date: 2022-02-18 14:23:55
 * @LastEditors: jasper
 * @LastEditTime: 2022-06-02 15:13:08
 * @FilePath: /dumpling-plus/typings/vue-proptery.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import { ConcreteComponent, VNode, VNodeArrayChildren, VNodeProps } from "vue";
import { ElMessage, ElLoading, ElPopconfirm } from "element-plus";
import NP from "number-precision";
// declare module "@vue/runtime-core" {
declare module "vue" {
  export interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $confirm: typeof ElPopconfirm;
    $loading: typeof ElLoading;
    $NP: typeof NP;
  }

  type RawChildren =
    | string
    | number
    | boolean
    | VNode
    | VNodeArrayChildren
    | (() => any);

  type MatchPattern = string | RegExp | string[] | RegExp[];

  type RawProps = VNodeProps & {
    __v_isVNode?: never;
    [Symbol.iterator]?: never;
  } & Record<string, any>;

  type RawSlots = {
    [name: string]: unknown;
    $stable?: boolean;
    /* Excluded from this release type: _ctx */
    /* Excluded from this release type: _ */
  };

  function h<P>(
    type: ConcreteComponent<P> | string,
    props?: (RawProps & P) | (unknown extends P ? null : never),
    children?: RawChildren | RawSlots
  ): VNode;
}

// declare module "vue-router" {
//   interface RouteMeta {
//     // roles?: string[]
//     title?: string;
//     icon?: string;
//     hidden?: boolean;
//     breadcrumb?: boolean;
//     iframeLink?: string;
//   }
// }
