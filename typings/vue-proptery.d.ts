import { ConcreteComponent, VNode, VNodeArrayChildren, VNodeProps } from "vue";
import { ElMessage, ElLoading, ElPopconfirm } from "element-plus";
import NP from "number-precision";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $message: ElMessage;
    $confirm: ElPopconfirm;
    $loading: ElLoading;
    $NP: NP;
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

declare module "vue-router" {
  interface RouteMeta {
    // roles?: string[]
    title?: string;
    icon?: string;
    hidden?: boolean;
    breadcrumb?: boolean;
    iframeLink?: string;
  }
}
