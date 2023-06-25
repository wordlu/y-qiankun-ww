const tabsModule = {
  namespaced: true,
  state: () => ({
    iframes: [],
    loadedMicroApps: {}, // 已手动加载的微应用
  }),
  mutations: {
    setIframes(state, val) {
      state.iframes = val;
    },
    setLoadedMicroApps(state, val) {
      state.loadedMicroApps = val;
    },
  },
  actions: {
    setIframes(context, value) {
      context.commit('setIframes', value);
    },
    setLoadedMicroApps(context, value) {
      context.commit('setLoadedMicroApps', value);
    },
  },
  getters: {},
};

export default tabsModule;
