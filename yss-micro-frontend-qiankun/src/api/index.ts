import axios from 'axios';

import { message } from '@/components/message';
import { getAccessToken, isLoginServer } from '@/tools/login';
import { DEFAULT_BASE_TOKEN } from '@/const';

// 请求超时时间
axios.defaults.timeout = 30000;
//设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//请求拦截 请求头携带token
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const accessToken = getAccessToken();
    // 注入accessToken

    if (!isLoginServer(config?.url)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    // 处理请求200的操作，默认不需要操作，可直接返回 return 返回正确信息调用接口时可以直接promise then 取到正确信息
    return response.data;
  },
  (error) => {
    ////console.log(error)
    if (!error.response) {
      message.error({
        message: '加载失败，请检查网络',
        duration: 1000,
        offset: 200,
      });
      return Promise.resolve(error);
    }
    // 处理状态码操作
    switch (error.response.status) {
      case 404:
        message.error({
          message: '服务器被吃了⊙﹏⊙∥',
          duration: 1000,
          offset: 200,
        });
        break;
      case 403:
        ////console.log('参数错误')
        break;
      case 500:
        message.error({
          message: '服务器被吃了⊙﹏⊙∥',
          duration: 1000,
          offset: 200,
        });
        break;
      case 504:
        message.error({
          message: '服务器被吃了⊙﹏⊙∥,请刷新',
          duration: 1000,
          offset: 200,
        });
        break;
      default:
        return Promise.resolve(error?.response?.data);
    }
    return error;
  },
);
