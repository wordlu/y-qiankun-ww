import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { getIndexStyle } from '@/tools/theme/index';
import vue2Plus from '@yss-base-ui/vue2-plus';
import '@yss-base-ui/vue2-plus/lib/vue2-plus.css';
import './assets/iconfont/iconfont.css';
import './assets/iconfont/iconfont.js';

// 初始化主题样式
getIndexStyle().then(() => {
  store.dispatch('changeThemeStyle');
});

Vue.config.productionTip = false;
Vue.use(vue2Plus);

// api
import './api/index';

// 执行mockjs文件
// import '../mock/index.js';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#yssMainApp');
