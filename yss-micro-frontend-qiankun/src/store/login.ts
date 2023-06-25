import { login, getUserInfo } from '@/services/login';
import localStorage, { ACCESS_TOKEN } from '@ysstech-data/public-business';

const loginModule = {
  namespaced: true,
  state: () => ({
    /** 用户信息 */
    user_info: null,
    /** 参数信息 */
    auth_routes: null,
    /** accessToken */
    access_token: '',
    /** 按钮权限 */
    permissions: null,
    /** 未登录时，登录成功之后回跳的路由 */
    loginBackPath: '/',
  }),
  mutations: {
    setState(state, payload) {
      try {
        if (!payload || !Object?.keys(payload)?.length) return;

        Object?.keys(payload)?.forEach((key) => {
          const value = payload?.[key] ?? '';
          state[key] = value;
          localStorage.setItem(key, value);
        });
      } catch (error) {
        console.log(error);
      }
    },
    // 退出登陆，主数据现阶段退出登录的接口，只是清除前端的登陆相关信息
    logout(state) {
      const defaultValues = {
        user_info: null,
        auth_routes: null,
        access_token: '',
        permissions: null,
        loginBackPath: '/',
      };

      // store 里的state重置
      Object?.keys(defaultValues)?.forEach((key) => {
        state[key] = defaultValues?.[key];
      });

      // 清除所有缓存
      localStorage.clear();
    },
  },
  actions: {
    // 登录逻辑
    async handleLogin({ state, commit }, payload) {
      try {
        // 登录
        const { access_token } = (await login(payload)) ?? {};
        if (!access_token) return;
        // 保存accessToken
        commit('setState', { access_token });
        const { menus: auth_routes, sysUser: user_info, permissions } = (await getUserInfo()) ?? {};
        // 若没有拿到用户信息，则清空token相关的缓存信息
        if (!user_info) {
          commit('logout');
          return;
        }
        // 保存菜单信息和用户信息
        commit('setState', { auth_routes, user_info, permissions: { visible: permissions } });
        return true;
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    // 是否登录
    isLogin(state) {
      const { access_token } = state;
      const value = access_token || localStorage?.getItem(ACCESS_TOKEN);
      return !!value;
    },
    // 获取state, 组件内部访问state时，尽量不要直接访问，建议通过这个getters来访问，做了本地缓存功能，当内存中的store释放时，从本地取值
    getState(state) {
      return (target) => {
        // string
        if (typeof target === 'string') return state?.[target] || localStorage?.getItem(target);

        if (!Array.isArray(target)) target = Object?.keys(state);
        // array
        if (target?.length)
          return target?.reduce((acc, key) => {
            acc[key] = state?.[key] || localStorage?.getItem(key);
            return acc;
          }, {});

        // other
        return {};
      };
    },
  },
};

export default loginModule;
