import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { createApp, render } from "@lugia/lugiax-router";
import "@lugia/lugia-web/dist/css/global.css";
import Main from "./App";
import PageLoading from "./components/pageloading";
import { authenticateSwitch } from "./authenticate";
import { getAccessToken, getAuthRoutes } from "@utils/localStorage";
import { history, go } from "@utils/cusRouter";
import Permission from "@ysstech-data/data-web/dist/permissions-hoc/class";
import permissionsModel from './models/permissions';
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

const App = createApp(
  {
    "/": {
      component: Main,
      verify({ url }) {
        if(!url.includes("/systemManage/")){
          return false;
        }
        const isLoginPage = url === "/login";
        if (isLoginPage) {
          return true;
        }

        // 判断是否登录
        const access_token = getAccessToken();
        if (!(access_token || isLoginPage)) {
          window.localStorage.setItem("originUrl", url);
          go({ url: "/login" });
          return false;
        }

        return true;
      },
    },
  },
  history,
  {
    loading: PageLoading,
    async onBeforeGo({ url }) { },
  }
);

const permissionHandler = (e) => {
  const permission = Permission.getInstance();
  const {
    detail: { permissions },
  } = e;
  permissionsModel.mutations.getPermissions({ permissions })
  permission.setPermissions(permissions);
};

const handlePermissios = () => {
  try {
    let permissions = localStorage.getItem('permissions');
    permissions = permissions ? JSON.parse(permissions) : permissions
    if (permissions) {
      const permission = Permission.getInstance();
      permissionsModel.mutations.getPermissions({ permissions })
      permission.setPermissions(permissions);
    }
  } catch (error) {
    console.error(error)
  }
}
export class Root extends React.Component {
  componentDidMount() {
    document.addEventListener("permissions", permissionHandler);
    handlePermissios()
  }
  componentWillUnmount() {
    document.addEventListener("permissions", permissionHandler);

  }
  render() {
    return <App />;
  }
}

let reactLifecycles = {}
export let bootstrap = () => { }
export let mount = () => { }
export let unmount = () => { }

// single-spa模式
if (window.singleSpaNavigate) {
  reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: Root,
    suppressComponentDidCatchWarning: true,
    domElementGetter: () => document.getElementById("singleApp"), // 指定要挂载到哪个dom元素上面
  });
  bootstrap = [reactLifecycles.bootstrap];
  mount = [reactLifecycles.mount];
  unmount = [reactLifecycles.unmount];
}

function renderApp(microAppContainer) {
  const root = microAppContainer ? microAppContainer?.querySelector('#root') : document.getElementById('root');
  ReactDOM.render(<Root />, root);
}

// qiankun
if (window.__POWERED_BY_QIANKUN__) {
  bootstrap = async () => { }

  mount = async (props) => {
    const { container } = props;
    renderApp(container);
  }

  unmount = async (props) => {
    const { container } = props;
    const root = container ? container.querySelector('#root') : document.getElementById('root');
    ReactDOM.unmountComponentAtNode(root);
  }
}

if (!window.singleSpaNavigate && !window.__POWERED_BY_QIANKUN__) {
  renderApp()
}
