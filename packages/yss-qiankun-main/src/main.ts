import Vue from 'vue';
import App from '@/App.vue';
import router from './router';
// @ts-ignore
import { addGlobalUncaughtErrorHandler, registerMicroApps, start } from "qiankun";

Vue.config.productionTip = false;
registerMicroApps([
  {
    name: 'weiwai',
    entry: '//localhost:5173/',
    container: '#yourContainer2',
    activeRule: '/weiwai',
  },
]);
addGlobalUncaughtErrorHandler((err:any) => {
  console.error(err)
  const { message } = err
  // 加载失败时提示
  if (message && message.includes('died in status LOADING_SOURCE_CODE')) {
    console.error('微应用加载失败，请检查应用是否可运行')
  }
})

start();

new Vue({
  el: '#app',
  router,
  render: (h:any) => h(App)
})
