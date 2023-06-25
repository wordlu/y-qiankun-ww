import {
  registerMicroApps,
  start,
  runAfterFirstMounted,
  initGlobalState,
  addErrorHandler,
} from 'qiankun';
import { Message } from '@yss-base-ui/vue2-plus';
import { loginModuleStoreStateInjectToMicroApp } from './tools/login';
import { getMicroAppEntry } from './utils';
// 初始化 state，定义一级属性
const state = {
  currentMicroAppName: '',
  userInfo: {},
  menus: {},
};

// 全局共享 store 数据
const store = {
  test: 'test',
};

// 子应用注入用户信息和菜单信息
loginModuleStoreStateInjectToMicroApp(state, { auth_routes: 'menus', user_info: 'userInfo' });

// 初始化通信方法
const actions = initGlobalState(state);

// 通信监听
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('onGlobalStateChange:', state, prev);
}, true);

actions.setGlobalState(state);

// 配置微应用
const apps = [
  // {
  //   name: 'basic-frame-work',
  //   entry: getMicroAppEntry(9001, 'basic'),
  //   container: '#microAppContainer',
  //   props: {
  //     // 全局 store 数据
  //     parentStore: store,
  //   },
  //   activeRule: '/basicFrameWork',
  // },
  // {
  //   name: 'business-fund-manage',
  //   entry: getMicroAppEntry(9002, 'business'),
  //   container: '#microAppContainer',
  //   props: {
  //     // 全局 store 数据
  //     parentStore: store,
  //   },
  //   activeRule: '/businessFundManage',
  // },
  // wodelu注释
  {
    name: 'system-manage-user',
    entry: getMicroAppEntry(9999, 'systemManage'),
    container: '#microAppContainer',
    props: {
      // 全局 store 数据
      parentStore: store,
    },
    activeRule: '/systemManage/',
  },
  {
    name: 'weiwai',
    /* 子应用端口配置:(如30011)
      // vite.config.ts
      base: '//localhost:30011/',
      publicDir: 'public',
      server: {
        ...
        port: 30011,
        origin: '//localhost:30011',
      }
    */
    entry: getMicroAppEntry(30012, 'weiwai'), // 与委外子应用端口一致
    container: '#microAppContainer',
    props: {
      // 全局 store 数据
      parentStore: store,
    },
    activeRule: '/weiwai/',
  },
];

// 主应用声明周期
const LifeCycle: any = {
  beforeLoad: [
    (app: { name: any }) => {
      console.log(
        `%cmainapp-[%c ${app.name} %c] before load`,
        'color: green;',
        'color: green;font-weight: bold;',
        'color: green;',
      );
    },
  ],
  beforeMount: [
    (app: { name: any }) => {
      console.log(
        `%cmainapp-[%c ${app.name} %c] before mount`,
        'color: green;',
        'color: green;font-weight: bold;',
        'color: green;',
      );
    },
  ],
  afterUnmount: [
    (app: { name: any }) => {
      console.log(
        `%cmainapp-[%c ${app.name} %c] after unmount`,
        'color: green;',
        'color: green;font-weight: bold;',
        'color: green;',
      );
    },
  ],
};

// 注册微应用
registerMicroApps(apps, LifeCycle);

// 可选启动配置
const startConfig = {
  // 开启预加载，默认
  prefetch: true,
};

// 启动微应用
start(startConfig);

// 初始化首个应用后需要做什么
const firstMountedAfterInit = function () {
  console.log('runAfterFirstMounted');
};

// 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
runAfterFirstMounted(() => firstMountedAfterInit());

// 获异常处理器
addErrorHandler((error) => {
  const msg = error.message;
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    // 加载失败时提示
    // Message.error(`子应用 [${error.appOrParcelName}] 加载失败，请稍后重试`);
    Message.error(`加载失败，请稍后重试`);
  }
  console.log('error:', error);
});
