import Vue from 'vue';
import Vuex from 'vuex';
import { writeNewStyle } from '@/tools/theme/index';
import variables from '@/assets/scss/var.scss';
import loginModule from './login';
import tabsModule from './tabs';
import systemManageModule from './systemManage';
import microAppsModule from './microApps';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    themeColor: JSON.parse(sessionStorage.getItem('themeColor')) || variables,
  },
  getters: {},
  mutations: {
    setTheme(state, theme) {
      if (!theme) return;
      // 判断如果传入的是对象，则直接替换整个主题
      if (typeof theme == 'object') {
        state.themeColor = theme;
      } else {
        state.themeColor[theme[0]] = theme[1];
      }
      sessionStorage.setItem('themeColor', JSON.stringify(state.themeColor));
    },
  },
  actions: {
    changeThemeStyle() {
      writeNewStyle();
    },
  },
  modules: {
    loginModule,
    tabsModule,
    systemManageModule,
    microAppsModule,
  },
});
