const { defineConfig } = require('@vue/cli-service');
const ESLintPlugin = require('eslint-webpack-plugin');

const getwayApi = 'http://www.a.com';
const businessApi = 'http://www.b.com';

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '委外资产数据管理平台';
      return args;
    });
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      // 打包文件大小配置 performance 性能提示值
      config.performance = {
        maxEntrypointSize: 4000000,
        maxAssetSize: 2000000,
      };
    }
    // config.module.rules = [...config.module.rules, 'less'];
    config.plugins.push(
      new ESLintPlugin({
        fix: true,
      }),
    );
  },
  css: {
    loaderOptions: {
      // 解决scss :export为空的情况
      // https://webpack.js.org/loaders/css-loader/
      css: {
        modules: {
          mode: 'icss',
        },
      },
      sass: {
        // additionalData: `@import "@/assets/scss/var.scss";`,
        // 文件中再引入var.scss会抛错
        // 该写法解决Syntax Error: SassError: This file is already being loaded.
        additionalData: (content, loaderContext) => {
          const { resourcePath } = loaderContext;
          if (resourcePath.endsWith('var.scss')) return content;
          return `@import "@/assets/scss/var.scss"; ${content}`;
        },
      },
    },
  },
  devServer: {
    port: '9999',
    // more config: https://github.com/http-party/node-http-proxy#options
    proxy: {
      // 登录代理
      '/yapi/api/oauth2': {
        target: 'http://192.168.103.35:30000/',
        changeOrigin: true,
        pathRewrite: {
          '^/yapi/api/oauth2': '/api/oauth2',
        },
      },
      // 登录信息代理
      '/yapi/api/manager/user/info': {
        target: 'http://192.168.103.35:30000/',
        changeOrigin: true,
        pathRewrite: {
          '^/yapi/api/manager/user/info': '/api/manager/user/info',
        },
      },
      // 系统管理代理
      '/yapi/api/manager': {
        target: 'http://192.168.103.35:30000/',
        changeOrigin: true,
        pathRewrite: {
          '^/yapi/api/manager': '/api/manager',
        },
      },
      '/getway': {
        target: getwayApi,
        ws: true,
        changeOrigin: true,
      },
      '/api': {
        target: businessApi,
      },
    },
    client: {
      overlay: false,
    },
  },
});

// fix 解决 vue2.5 版本(vue-template-compiler), build 完 node 进程未退出问题
// https://github.com/vuejs/vue-loader/issues/1908
delete global.MessageChannel;
