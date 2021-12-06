/*
 * @Description: setting moudle
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-05 15:39:26
 */
import { Store as VuexStore, CommitOptions, Module } from "vuex";

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from "@/store";
import { state } from "./state";
import { mutations, Mutations } from "./mutations";
import type { UserState } from "./state";

export { UserState };

export type UserStore<S = UserState> = Omit<
  VuexStore<S>,
  "getters" | "commit"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};
export const store: Module<UserState, RootState> = {
  state,
  getters: {
    getDictList: (state) => (type: string) => {
      const dicts = state.dicts;
      if (dicts[type]) {
        return dicts[type];
      }
      return [];
    },
  },
  mutations,
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
};
