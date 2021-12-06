/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-28 11:26:33
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-28 13:34:08
 */

export interface UserState {
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
  email: string;
  routesFromApi: any[];
  userName: string;
  fullName: string;
  dicts: any;
  currentWarehouseInfo: string;
  warehouseList: any[];
  warehousePeriodList: any[];
}

export const state: UserState = {
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  email: "",
  routesFromApi: [],
  userName: "",
  fullName: "",
  dicts: {},
  currentWarehouseInfo: "",
  warehouseList: [],
  warehousePeriodList: [],
};
