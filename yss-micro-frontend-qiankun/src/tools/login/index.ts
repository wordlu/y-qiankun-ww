import { LOGIN_SERVER_PATH } from '@/const';
import store from '@/store';
import { ACCESS_TOKEN } from '@ysstech-data/public-business';

/**
 * 获取token
 * @returns
 */
export const getAccessToken = () => {
  try {
    const accessToken = store?.getters?.['loginModule/getState'](ACCESS_TOKEN);
    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 登录模块的store state 向子应用注入
 * @param target 需要注入状态的对象
 * @param needInjectKeysMap 状态的keysMap
 * @returns
 */
export const loginModuleStoreStateInjectToMicroApp = (target, needInjectKeysMap) => {
  try {
    if (!target || !needInjectKeysMap) return;
    const keys = Object?.keys(needInjectKeysMap);
    if (!keys || !keys?.length) return;
    // 获取loginModule的state
    const state = store?.getters?.['loginModule/getState'](keys);
    // 依次注入状态
    keys?.forEach((key) => {
      const targetKey = needInjectKeysMap?.[key];
      if (targetKey) target[targetKey] = state?.[key];
    });
  } catch (error) {
    console.error(error);
    return;
  }
};

/**
 * 是否登录接口
 * @param path 接口path
 * @returns
 */
export const isLoginServer = (path) => path === LOGIN_SERVER_PATH;
