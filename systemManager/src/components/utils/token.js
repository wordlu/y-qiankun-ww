import Cookies from 'js-cookie';

const AUTH_TOKEN = 'auth_token';

const CURRENT_DATE = 'currentDate';
const LAST_TIME = 'lastTime';
const MODAL_VISIBLE = 'modalVisble';
/**
 * 设置权限验证token
 * @param token
 */
export function setAuthToken(token) {
  if (sessionStorage) {
    sessionStorage.setItem(AUTH_TOKEN, token);
  } else {
    Cookies.set(AUTH_TOKEN, token);
  }
}
/**
 * 存储当前点击时间
 * @param time
 */
export function setLastTime(lastTime) {

  if (sessionStorage) {
    sessionStorage.setItem(LAST_TIME, lastTime);
  } else {
    Cookies.set(LAST_TIME, lastTime);
  }
}
/**
 * 存储Modal框状态
 * @param time
 */
export function setModalVisible(modalVisible) {

  if (sessionStorage) {
    sessionStorage.setItem(MODAL_VISIBLE, modalVisible);
  } else {
    Cookies.set(MODAL_VISIBLE, modalVisible);
  }
}
/**
 * 存储当前日期
 * @param date
 */
export function setCurrentDate(date) {
  if (sessionStorage) {
    sessionStorage.setItem(CURRENT_DATE, date);
  } else {
    Cookies.set(CURRENT_DATE, date);
  }
}
/**
 * 获得全选验证token
 */
export function getAuthToken() {
  if (sessionStorage) {
    return sessionStorage.getItem(AUTH_TOKEN);
  } 
    return Cookies.get(AUTH_TOKEN);
  
}
/**
 * 获得modal显示状态
 */
export function getModalVisible() {
  if (sessionStorage) {
    return sessionStorage.getItem(MODAL_VISIBLE);
  } 
    return Cookies.get(MODAL_VISIBLE);
  
}
/**
 * 获得当前日期
 */
export function getCurrentDate() {
  if (sessionStorage) {
    return sessionStorage.getItem(CURRENT_DATE);
  } 
    return Cookies.get(CURRENT_DATE);
  
}
/*
获取session中存储的内容
 */
export function getSessionValue(key) {
  if (sessionStorage) {
    return sessionStorage.getItem(key);
  } 
    return Cookies.get(key);
  
}
/**
 * 获得当前时间
 */
export function getLastTime() {
  if (sessionStorage) {
    return sessionStorage.getItem(LAST_TIME);
  } 
    return Cookies.get(LAST_TIME);
  
}
export function removeAuthToken() {
  if (sessionStorage) {
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(CURRENT_DATE);
    sessionStorage.removeItem(LAST_TIME);
    sessionStorage.removeItem(MODAL_VISIBLE);
  } else {
    Cookies.remove(AUTH_TOKEN);
    Cookies.remove(CURRENT_DATE);
    Cookies.remove(LAST_TIME);
  }
}

export function getUserInfo() {
  let result = null
  if (getAuthToken()) {
    const commonContent = getAuthToken().split(".")[1].replace(/\s/g, '+');
    result = JSON.parse(Buffer.from(commonContent, 'base64').toString());
  }
  return result
}
