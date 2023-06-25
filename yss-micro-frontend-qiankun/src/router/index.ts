import Vue from 'vue';
import VueRouter from 'vue-router';

/* Layout */
import Layout from '@/layout/index.vue';

import SystemManageMicroApp from '@/views/SystemManageView.vue';

import store from '@/store';
import { LOGIN_PAGE_PATH } from '@/const';
Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法(fix:vue导航重复,避免冗余导航到当前位置)
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/weiwai/homepage',
    children: [
      {
        path: '/home',
        component: () => import('@/views/HomeView.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
        },
      },
      {
        path: '/basicFrameWork',
        component: () => import('@/views/MicroView.vue'),
        name: 'BasicFrameWork',
        meta: {
          title: '基础框架',
        },
      },
      {
        path: '/businessFundManage',
        component: () => import('@/views/MicroView.vue'),
        name: 'BusinessFundManage',
        meta: {
          title: '资金管理系统',
        },
      },
      // 数据建模
      {
        path: '/dataMiddleModelingV2/projectManagement',
        component: () => import('@/views/ProjectManagement.vue'),
        name: '1900465',
        meta: {
          title: '数据建模-项目管理页',
        },
      },
      {
        path: '/dataMiddleModelingV2/versionDetail',
        component: () => import('@/views/VersionDetail.vue'),
        name: '1900473',
        meta: {
          title: '数据建模-项目管理-版本详情',
        },
      },
      {
        path: '/systemManage',
        component: SystemManageMicroApp,
        name: 'SystemManage',
        meta: {
          title: '系统管理',
        },
        children: [
          {
            path: '*',
            component: SystemManageMicroApp,
          },
        ],
      },
      {
        path: '/weiwai',
        component: () => import('@/views/MicroView.vue'),
        name: 'weiwai',
        redirect: '/weiwai/homepage',
        meta: {
          title: '委外',
        },
        children: [
          {
            path: '*',
            component: () => import('@/views/MicroView.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/components/login/index.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  // 跳转到登录页面或者已经登陆的情况，则直接跳转
  if (to?.path === LOGIN_PAGE_PATH || store?.getters?.['loginModule/isLogin']) {
    next();
    return;
  }

  // 未登录时，先把path保存下来，登录成功之后，跳转到此路由
  store?.commit('loginModule/setState', { loginBackPath: to?.path });
  // 未登录，则跳转到登录页
  next(LOGIN_PAGE_PATH);
});

export default router;
