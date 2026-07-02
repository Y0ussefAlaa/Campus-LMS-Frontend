import Cookies, { type CookieSetOptions } from "universal-cookie";

const cookie = new Cookies(null, { path: "/" });

class CookiesService {
  getCookie(name: string) {
    return cookie.get(name);
  }

  setCookie(
    name: string,
    value: string,
    options?: CookieSetOptions | undefined,
  ) {
    cookie.set(name, value, options);
  }

  removeCookie(name: string) {
    cookie.remove(name);
  }
}

export default new CookiesService();
