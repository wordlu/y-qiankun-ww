import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import pinia from '@/store/store';
import keepalive from '@/store/keepalive';

Vue.use(VueRouter);

import { getMicroApp } from 'vite-plugin-legacy-qiankun'
const microApp = getMicroApp("weiwai")

const router = new VueRouter({
  mode: 'history',
  base: microApp.__POWERED_BY_QIANKUN__ ? "weiwai" : '/',
  routes,
});

router.beforeEach((to, from, next) => {
  const store = keepalive(pinia);
  let keepAlive = store.getKeepalive || [];
  if (to.name && !keepAlive.includes(to.name)) {
    keepAlive.push(to.name)
    store.setKeepalive(keepAlive);
  }
  next()
})
export default router;
