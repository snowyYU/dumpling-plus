import { logout } from "@/apis/auth";

const portal = {
  goLogin(): void {
    // 返回单点登陆
    if (process.env.NODE_ENV === "development") {
      // 如果是本地开发
      // 区卫的登录地址
      // window.location.href = `http://healthdev.com:19000/login/#/login?callbackUrl=${window.location.href}`
      // 公卫的登录地址sso-view
      window.location.href = `http://healthdev.com:19000/sso-view/#/login?callbackUrl=${window.location.href}`;
    } else {
      // 如果是线上环境
      // window.location.href = `${getSchemeHostPortByURL}/login/#/login?callbackUrl=${window.location.href}`
      // 区卫的登录地址
      // window.location.href = `/login/#/login?callbackUrl=${window.location.href}`
      // 公卫的登录地址
      // window.location.href = `/uniresearch/#/user/login?callbackUrl=${window.location.href}`
      window.location.href = `/sso-view/#/login?callbackUrl=${window.location.href}`;
    }
  },
  goLoginWithoutCallback(): void {
    // 返回单点登陆
    if (process.env.NODE_ENV === "development") {
      // 如果是本地开发
      // 区卫的登录地址
      // window.location.href = `http://healthdev.com:19000/login`
      // 公卫的登录地址sso-view
      window.location.href = "http://healthdev.com:19000/sso-view/";
    } else {
      // 如果是线上环境
      // window.location.href = `${getSchemeHostPortByURL}/login/#/login?callbackUrl=${window.location.href}`
      // 区卫的登录地址
      window.location.href = "/sso-view/";
      // 公卫的登录地址sso-view
      // window.location.href = `/uniresearch/#/user/login`
    }
  },
  logout(needCallBack?: boolean): void {
    // 退出登陆
    console.log(needCallBack);
    logout().then(() => {
      setTimeout(() => {
        if (needCallBack) {
          portal.goLogin();
        } else {
          portal.goLoginWithoutCallback();
        }
      }, 1500);
    });
  },
};

export default portal;
