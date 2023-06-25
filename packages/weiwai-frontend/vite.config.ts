import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import svgLoader from 'vite-svg-loader'
// @ts-ignore
import { viteMockServe } from 'vite-plugin-mock'
import legacy from '@vitejs/plugin-legacy'
import { legacyQiankun } from 'vite-plugin-legacy-qiankun'

export default defineConfig({
  plugins: [
    createVuePlugin({
      include: /(\.md|\.vue)$/,
      jsx: true
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    legacyQiankun({ name: 'weiwai' }),
    viteMockServe({
      mockPath: 'mock'
    }),
    svgLoader({ svgoConfig: {} })
  ],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: resolve(__dirname, './')
      },
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, './src/assets')
      },
      {
        find: '@model',
        replacement: resolve(__dirname, '../weiwai-model/src')
      },
      {
        find: '@services',
        replacement: resolve(__dirname, '../weiwai-service/src/services')
      },
      {
        find: '@weiwai/weiwai-model',
        replacement: resolve(__dirname, '../weiwai-model/src')
      },
      {
        find: '@weiwai/weiwai-service',
        replacement: resolve(__dirname, '../weiwai-service/src')
      }
    ],
    extensions: ['.ts', '.js', '.jsx', '.tsx']
  },
  define: {
    'process.env': {}
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/assets/style/global.less')}";`
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 30012,
    origin: '//192.168.103.35:30012',
    host: '0.0.0.0',
    open: false,
    // https: true,
    proxy: {
      '/api/weiwai': {
        // 配置需要代理的路径
        // target: 'http://192.168.98.98:18080', // 目标地址 --> 张永康ip
        // target: 'http://192.168.103.35:18080', // 目标地址 --> 测试服务器
        // target: 'http://192.168.98.92:18080', // 目标地址 --> 陶艺伟ip
        target: 'http://192.168.103.35:30000/', // 目标地址 --> 网关
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace(/^\/api\/weiwai/, '')
      }
    }
  },
  base: '/weiwai/',
  publicDir: 'public'
})
