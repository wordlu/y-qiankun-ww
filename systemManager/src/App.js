import React, { useEffect } from "react";
import { go, createRoute, Redirect } from "@lugia/lugiax-router";
import routingConfig from "./config/router/cusRouting.config";
import PublicValue from "./config/theme/theme.config";
import { load } from "@lugia/lugia-web/dist/css/theme-common-dict";
import { Theme } from "@lugia/lugia-web";
import Permission from "@ysstech-data/data-web/dist/permissions-hoc/class";
import Header from "./components/header";
const NODE_ENV = process.env.NODE_ENV;
const getRouters = (routingConfig, routes) => {
  const rout = routes || {};
  routingConfig.forEach((item) => {
    const { component, value, render } = item;
    if (component) {
      rout[value] = {
        exact: true,
        component,
      };
    } else if (render) {
      rout[value] = {
        exact: true,
        render,
      };
    } else {
      const { children } = item;
      rout[value] = {
        exact: true,
        render: async () => {
          return () => (
            <Redirect
              to={{
                pathname: getIndexRouter(children),
              }}
            />
          );
        },
      };

      if (children) {
        return getRouters(children, rout);
      }
    }
  });
  return rout;
};

function getIndexRouter(routingConfig) {
  if (!routingConfig || routingConfig.length === 0) {
    return "/404";
  }
  return routingConfig[0].value;
}

export const firstRouter = {
  "/": {
    exact: true,
    render: async () => {},
    verify() {
      return true;
    },
  },
  ...getRouters(routingConfig),
  "/login": {
    exact: true,
    render: async () => import("./pages/login"),
  },
  "/404": {
    render: async () => import("./pages/abnormal/404"),
  },
  "/403": {
    render: async () => import("./pages/abnormal/403"),
  },
  "/500": {
    render: async () => import("./pages/abnormal/500"),
  },
  NotFound: {
    isHidden: true,
    render: async () => {
      return () => (
        <Redirect
          to={{
            pathname: "/404",
          }}
        />
      );
    },
  },
};

function isShowHeader () {
  const useageQiankun = window.__POWERED_BY_QIANKUN__;
  return NODE_ENV === 'development' && !useageQiankun;
}

export default () => {
  const { publicValue, theme: { widgetDefaultTheme = {} } = {} } = PublicValue;
  if (publicValue && publicValue.length > 0) {
    publicValue.forEach(({ moduleName, value }) => {
      switch (moduleName) {
        case "@lugia/lugia-web":
          load(value);
          break;
      }
    });
  }
  return (
    <React.Fragment>
      {isShowHeader() && <Header />}
      <Theme config={widgetDefaultTheme}>{createRoute(firstRouter)}</Theme>
    </React.Fragment>
  );
};
