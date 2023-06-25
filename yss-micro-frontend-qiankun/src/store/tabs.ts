import { createMicroApp } from '@/config/microAppConfig';
const tabsModule = {
  namespaced: true,
  state: () => ({
    tabs: [],
  }),
  mutations: {
    setTabs(state, val) {
      state.tabs = val;
      localStorage.setItem('tabs', JSON.stringify(state.tabs));
    },
    addTabs(state, val) {
      const { id, label: title, path } = val;
      createMicroApp(path).then(() => {
        let existenceFlag = false;
        state.tabs.forEach((item) => {
          item.active = false;
          if (item.id === val.id) {
            item.active = true;
            existenceFlag = true;
          }
        });
        if (!existenceFlag) {
          state.tabs.push({
            id,
            title,
            path,
            closeAble: true,
            active: true,
          });
        }
        localStorage.setItem('tabs', JSON.stringify(state.tabs));
      });
    },
  },
  actions: {
    setTabs(context, value) {
      context.commit('setTabs', value);
    },
  },
  getters: {},
};

export default tabsModule;
