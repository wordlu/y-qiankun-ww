import lugiax from "@lugia/lugiax";
import { go } from "@utils/cusRouter";
import { toLogin } from "@services/login";
import { message } from "@lugia/lugia-web";
import { getUserInfo } from "@services/login";
import Authenticate from "../authenticate.json";
import {
  setAccessToken,
  setUserInfo,
  setAuthRoutes,
} from "@utils/localStorage";
// import doRequest from '../components/utils/requestFunction';
import Permission from "@ysstech-data/data-web/dist/permissions-hoc/class";
const NODE_ENV = process.env.NODE_ENV;
const model = "login";
const state = {
  loginInfo: {
    username: null,
    password: null,
  },
  autoSignIn: true,
};

function getFilterRouteData(accessIds, routeData) {
  const filterData = [];
  routeData &&
    routeData.forEach((item) => {
      const { children, id } = item;
      let singleFilterData;

      const hasPermission = accessIds.indexOf(id) !== -1;
      if (hasPermission) {
        item["value"] = item.path;
        item["text"] = item.name;
        item["icon"] = item.icon;
        singleFilterData = item;
      }

      const childrenMap = children && getFilterRouteData(accessIds, children);
      if (childrenMap && childrenMap.length > 0) {
        singleFilterData = item;
        singleFilterData.children = childrenMap;
      }

      singleFilterData && filterData.push(singleFilterData);
    });
  return filterData;
}

export default lugiax.register({
  model,
  state,
  mutations: {
    sync: {
      onChangeUserName(state, inParam) {
        const { newValue } = inParam;
        return state.setIn(["loginInfo", "username"], newValue);
      },
      onChangePassWord(state, inParam) {
        const { newValue } = inParam;
        return state.setIn(["loginInfo", "password"], newValue);
      },
      showMessage(state, inParam) {
        const { type, text } = inParam;
        message[type](text, 2);
      },
      goRegister(state, inParam) {
        go({ url: "/register/register" });
      },
      onChangeAutoSignIn(state, inParam) {
        return state.set("autoSignIn", inParam);
      },
    },
    async: {
      async doLogin(state, inParam, { mutations }) {
        const loginInfo = state.get("loginInfo").toJS();
        const query = {
          ...loginInfo,
          // client_id: 'client',
          // client_secret: '123456',
          grant_type: "password",
        };

        const resp = await toLogin(query);

        const { access_token } = resp;
        if (access_token) {
          let username = loginInfo.username;
          setAccessToken(access_token);
          setUserInfo({ username });
          const originUrl = window.localStorage.getItem("originUrl") || "/";

          // 获取用户权限
          const { authenticateSwitch } = Authenticate;
          let filterRouteData = [];

          if (authenticateSwitch) {
            const { data } = await getUserInfo();
            filterRouteData = getFilterRouteData(data.menuIdArray, data.menus);
            const permission = Permission.getInstance(NODE_ENV);
            permission.setPermissions({ visible: data.permissions });
          }
          setAuthRoutes(filterRouteData);

          // 登录后跳转的路由
          if (originUrl === "/") {
            go({ url: "/" });
          } else {
            go({ url: originUrl });
          }

          window.localStorage.removeItem("originUrl");
        } else {
          mutations.showMessage({ type: "error", text: resp.msg });
        }
      },
    },
  },
});
