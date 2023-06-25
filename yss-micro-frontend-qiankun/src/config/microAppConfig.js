import store from '@/store';
import { loadMicroApp } from 'qiankun';
import { getMicroAppEntry } from '@/utils';
export const microAppList = [
  {
    name: 'system-manage-user',
    entry: getMicroAppEntry(30010, 'systemManage'),
    container: '#microAppContainer',
    props: {
      // 全局 store 数据
      parentStore: store,
    },
    activeRule: '/systemManage/',
  },
  {
    name: 'weiwai',
    entry: getMicroAppEntry(30012, 'weiwai'), // 与委外子应用端口一致
    container: '#weiwai',
    props: {
      // 全局 store 数据
      parentStore: store,
    },
    activeRule: '/weiwai/',
  },
];
/**
 * @description 查找当前页签是否是微应用下的页面
 */
export function isMicroApp(path) {
  return !!microAppList.some((item) => {
    return path.startsWith(item.activeRule);
  });
}
/**
 * @description 查找当前页签是否是微应用下的页面，并返回对应微应用配置项
 */
export function findMicroAppByPath(path) {
  return microAppList.find((item) => {
    let activeRule = item.activeRule;
    return path.startsWith(activeRule);
  });
}
/**
 * @description 创建微应用
 */
export const createMicroApp = (path) => {
  return new Promise((resolve, reject) => {
    const loadedMicroApps = { ...store.state.microAppsModule.loadedMicroApps }; // 已手动挂载的微应用对象
    if (!isMicroApp(path)) {
      // 非微应用直接跳转
      resolve();
      return;
    }

    // 微应用跳转处理
    /**
     * @description 1.判断是否已手动加载，是则直接跳转，否则先手动挂载，再跳转
     */
    const microAppResult = findMicroAppByPath(path); // 是否是微应用的跳转
    if (Object.prototype.hasOwnProperty.call(loadedMicroApps, microAppResult.name)) {
      resolve();
      return;
    }
    try {
      loadedMicroApps[microAppResult.name] = loadMicroApp(microAppResult); // 加载微应用
      store.dispatch('microAppsModule/setLoadedMicroApps', loadedMicroApps);
      // console.log('挂载后的已挂载的微应用==>', store.state.microAppsModule.loadedMicroApps);
      resolve();
    } catch (err) {
      reject(err);
      console.log(err);
    }
  });
};
/**
 * @description 销毁微应用
 */
export const closeMicroApp = (el, tabs) => {
  const microApp = findMicroAppByPath(el.path);
  const loadedMicroApps = { ...store.state.microAppsModule.loadedMicroApps }; // 已手动挂载的微应用对象
  try {
    if (microApp) {
      let currentMircoApp = loadedMicroApps[microApp.name];
      let currentMicroAppHasLeftTab = tabs.some((item) => {
        // 判断当前微应用是否还存在其他已经打开的页面，如果没有，直接销毁该微应用；如果有，通知微应用清除当前标签页keepAlive缓存
        return item.path.match(microApp.activeRule);
      });
      if (!currentMicroAppHasLeftTab) {
        // 直接销毁该微应用
        currentMircoApp.unmount();
        delete loadedMicroApps[microApp.name];
        store.dispatch('microAppsModule/setLoadedMicroApps', loadedMicroApps);
      } else {
        // 当点击关闭页签时需要通知微应用销毁当前页面keep-alive
        currentMircoApp.update &&
          currentMircoApp.update({
            props: { type: 'closeTab', pathList: [el.path.split('/').pop()] },
          });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description 批量关闭页签销毁微应用
 */
export const closeMultipleMicroApp = (arr, tabs) => {
  const loadedMicroApps = { ...store.state.microAppsModule.loadedMicroApps }; // 已手动挂载的微应用对象
  // 储存关闭的path
  let closeArrPath = {};
  // 关闭的
  const closeTabs = arr.map(({ path }) => path);
  const closeMicroApp = [];
  closeTabs.forEach((path) => {
    const micro = findMicroAppByPath(path);
    const pathName = path.split('/').pop();
    if (closeArrPath[micro.name]) {
      closeArrPath[micro.name].push(pathName);
    } else {
      closeArrPath[micro.name] = [pathName];
    }
    if (micro && closeMicroApp.indexOf(micro) < 0) {
      closeMicroApp.push(micro);
    }
  });
  // 需要的
  const needTabs = tabs.map(({ path }) => path);
  const needMicroApp = [];
  needTabs.map((path) => {
    const micro = findMicroAppByPath(path);
    if (micro && needMicroApp.indexOf(micro) < 0) {
      needMicroApp.push(micro);
    }
  });
  // 处理子应用
  closeMicroApp.forEach((item) => {
    try {
      const currentMircoApp = loadedMicroApps[item.name];
      if (needMicroApp.indexOf(item) < 0) {
        // console.log(item.name, currentMircoApp)
        // 直接销毁该微应用
        currentMircoApp.unmount();
        delete loadedMicroApps[item.name];
      } else {
        // console.log(closeArrPath[item.name])
        // 当点击关闭页签时需要通知微应用销毁当前页面keep-alive
        currentMircoApp.update &&
          currentMircoApp.update({
            props: { type: 'closeTab', pathList: closeArrPath[item.name] },
          });
      }
    } catch (error) {
      console.log(error);
    }
  });
  store.dispatch('microAppsModule/setLoadedMicroApps', loadedMicroApps);
};
