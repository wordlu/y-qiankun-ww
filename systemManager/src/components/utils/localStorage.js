import Cookies from 'js-cookie';

const ACCESS_TOKEN = 'access_token';   
const USER_INFO = 'user_info';  
const AUTH_ROUTES = 'auth_routes';
const USER_MENU = 'user_menu';

/**
 * 设置用户登录后得到的token
 * @param access_token
 */
export function setAccessToken(key) {
  if (localStorage) {
    localStorage.setItem(ACCESS_TOKEN, key);
  } else {
    Cookies.set(ACCESS_TOKEN, key);
  }
}
export function getAccessToken() {
  if (localStorage) {
   return localStorage.getItem(ACCESS_TOKEN);
  } else {
    return Cookies.get(ACCESS_TOKEN);
  }
}



/**
 * 设置用户登录后得到的用户信息
 * @param user_info
 */
export function setUserInfo(key) {
  if (localStorage) {
    localStorage.setItem(USER_INFO, JSON.stringify(key));
  } else {
    Cookies.set(USER_INFO, JSON.stringify(key));
  }
}
export function getUserInfo() {
  if (localStorage) {
    return JSON.parse(localStorage.getItem(USER_INFO));
  } else {
    return JSON.parse(Cookies.get(USER_INFO));
  }
}


/**
 * 设置用户的权限
 * @param user_info
 */
export function setAuthRoutes(key) {
  if (localStorage) {
    localStorage.setItem(AUTH_ROUTES, JSON.stringify(key));
  } else {
    Cookies.set(AUTH_ROUTES, JSON.stringify(key));
  }
}
export function getAuthRoutes() {
  if (localStorage) {
    return JSON.parse(localStorage.getItem(AUTH_ROUTES));
  } else {
    return JSON.parse(Cookies.get(AUTH_ROUTES));
  }
}

/**
 * 设置用户可以配置的菜单
 * @param user_menu
 */
export function setUserMenu(key) {
  if (localStorage) {
    localStorage.setItem(USER_MENU, key);
  } else {
    Cookies.set(USER_MENU, key);
  }
}
export function getUserMenu() {
  if (localStorage) {
   return localStorage.getItem(USER_MENU);
  } else {
    return Cookies.get(USER_MENU);
  }
}
