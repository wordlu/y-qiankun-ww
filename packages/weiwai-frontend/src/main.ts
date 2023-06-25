import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import ElementUI from 'element-ui';
import App from '@/App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './assets/style/global.less'; // import your global style
import '@/styles/commonStyle.less'
import router from './router';
// import './mock';
import pinia from '@/store/store';
import keepalive from '@/store/keepalive';
import KeepAlive from './BaseKeepAlive'
Vue.component('BaseKeepAlive', KeepAlive)

import { createLifecyle, getMicroApp } from 'vite-plugin-legacy-qiankun'

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(PiniaVuePlugin)
pinia.use(piniaPluginPersistedstate)
const render = () => {
  new Vue({
    el: '#app',
    pinia,
    router,
    render: (h: any) => h(App)
  })
}

const microApp = getMicroApp("weiwai")
if (microApp.__POWERED_BY_QIANKUN__) {
  createLifecyle("weiwai", {
    mount(props) {
      render();
    },
    bootstrap() {
    },
    unmount() {
    },
    update(props) {
      console.log(props)
      const {props:qiankunProps} = props;
      const store = keepalive(pinia);
      if(qiankunProps && qiankunProps.type === 'closeTab'){
        store.clearKeepalive(qiankunProps.pathList);
      }
    }
  })
} else {
  render();
}

