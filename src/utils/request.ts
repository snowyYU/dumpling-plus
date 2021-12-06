import axios, { Method, AxiosResponse } from "axios";
// import axios, { AxiosResponse, Method } from 'axios'
import { ElMessage } from "element-plus";
// import { useStore } from '@/store'
import portal from "@/utils/gateway";
// import { ResWrapper } from '../apis/auth.d'
// declare module 'axios' {
//   export interface AxiosResponse<T = any> extends Promise<T> {}
// }
// create an axios instance
const service = axios.create({
  // baseURL: `${process.env.VUE_APP_BASE_API}`, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
});

const baseURL = process.env.VUE_APP_BASE_API;

const authList = [
  "/smc/user/queryUserIdentityInfo",
  "/sso/auth/logout",
  "/smc/door/queryResourcesTreeBySystem",
  "/smc/user/queryUserPage",
];

const baseUrl = process.env.NODE_ENV === "development" ? "/tmp-api" : "/wms";

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (!config.url) return config;
    if (
      authList.includes(config.url) ||
      process.env.NODE_ENV !== "development"
    ) {
      config.url = baseURL + config.url;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data || {};
    // 需要登出的状态码
    // 2104 身份失效
    // 2105 用户在别处登录
    const logoutStatus = ["2100", "2101", "2102", "2104", "2105"];
    // 未登录
    if (logoutStatus.includes(res.code)) {
      // 跳转到权限系统
      alert(res.msg);
      portal.goLogin();
    }
    if (res.code === "403") {
      // 没有权限
      ElMessage.error("抱歉，你没有权限访问本系统");
      setTimeout(() => {
        portal.logout();
      }, 2000);
    }
    if (res.code === "0") {
      // 其他权限异常
      if (
        response.data.msg.indexOf("失效") > -1 ||
        response.data.msg.indexOf("无效") > -1 ||
        response.data.msg.indexOf("过期") > -1
      ) {
        portal.logout();
      } else {
        ElMessage.error(response.data.msg);
      }
    }
    if (res.code !== "200") {
      ElMessage({
        type: "error",
        message: res.msg,
      });
      return Promise.reject(response);
    } else {
      return response.data;
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 10 * 1000,
    });
    return Promise.reject(error);
  }
);

export async function request1<T = any, R = AxiosResponse<T>>(
  uri: string,
  params: {
    method: Method;
    data?: any;
    params?: any;
    options?: { [key: string]: any };
  }
): Promise<R> {
  return service.request<T, R>({
    url: baseUrl + uri,
    method: params.method,
    data: params.data,
    ...(params.options || {}),
  });
}

export default service;
