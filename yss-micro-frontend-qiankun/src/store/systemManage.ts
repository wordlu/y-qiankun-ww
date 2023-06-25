const systemManageModule = {
  namespaced: true,
  state: () => ({
    /** 系统管理样式缓存 */
    systemManageMicroAppStyles: [],
  }),
  mutations: {
    setSystemManageMicroAppStyles(state, payload) {
      if (!payload) return;
      state.systemManageMicroAppStyles = payload || [];
    },
  },
};

export default systemManageModule;
