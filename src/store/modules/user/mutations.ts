/*
 * @Description: app Mutations
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-28 11:45:02
 */
import { MutationTree } from "vuex";
import { UserState } from "./state";
import { UserMutationTypes } from "./mutation-types";

export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_NAME](state: S, name: string): void;
  [UserMutationTypes.SET_AVATAR](state: S, avatar: string): void;
  [UserMutationTypes.SET_INTRODUCTION](state: S, introduction: string): void;
  [UserMutationTypes.SET_ROLES](state: S, roles: string[]): void;
  [UserMutationTypes.SET_EMAIL](state: S, email: string): void;
  [UserMutationTypes.SET_USER_NAME](state: S, userName: string): void;
  [UserMutationTypes.SET_FULL_NAME](state: S, fullName: string): void;
  [UserMutationTypes.SET_DICTS](state: S, dicts: any): void;
  [UserMutationTypes.SET_CURRENT_WAREHOUSE_INFO](
    state: S,
    currentWarehouseInfo: any
  ): void;
  [UserMutationTypes.SET_WAREHOUSE_LIST](state: S, warehouseList: any): void;
  [UserMutationTypes.SET_WAREHOUSE_PERIOD_LIST](
    state: S,
    warehousePeriodList: any
  ): void;
};

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_NAME](state: UserState, name: string) {
    state.name = name;
  },

  [UserMutationTypes.SET_AVATAR](state: UserState, avatar: string) {
    state.avatar = avatar;
  },

  [UserMutationTypes.SET_INTRODUCTION](state: UserState, introduction: string) {
    state.introduction = introduction;
  },

  [UserMutationTypes.SET_ROLES](state: UserState, roles: string[]) {
    state.roles = roles;
  },

  [UserMutationTypes.SET_EMAIL](state: UserState, email: string) {
    state.email = email;
  },
  // ******************
  [UserMutationTypes.SET_USER_NAME](state: UserState, userName: string) {
    state.userName = userName;
  },
  [UserMutationTypes.SET_FULL_NAME](state: UserState, fullName: string) {
    state.fullName = fullName;
  },
  [UserMutationTypes.SET_DICTS](state: UserState, dicts: any) {
    state.dicts = dicts;
  },
  [UserMutationTypes.SET_CURRENT_WAREHOUSE_INFO](
    state: UserState,
    currentWarehouseInfo: any
  ) {
    state.currentWarehouseInfo = currentWarehouseInfo;
  },
  [UserMutationTypes.SET_WAREHOUSE_LIST](state: UserState, warehouseList: any) {
    state.warehouseList = warehouseList;
  },
  [UserMutationTypes.SET_WAREHOUSE_PERIOD_LIST](
    state: UserState,
    warehousePeriodList: any
  ) {
    state.warehousePeriodList = warehousePeriodList;
  },
};
