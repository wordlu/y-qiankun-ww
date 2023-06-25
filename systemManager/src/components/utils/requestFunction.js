import { notification } from '@lugia/lugia-web';
import { go } from '@utils/cusRouter';
import { getAccessToken } from '@utils/localStorage'
import { v4 as uuidv4 } from 'uuid';
import md5 from 'js-md5';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  205: '新增记录已存在。',
  207: '机器人在线，删除失败',
  206: '启用失败，请先进行参数值设置',
  208: '任务添加失败',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};
function checkStatus(response) {
  if (response.status) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    if(response.status === 401){
      window.localStorage.clear();
      go({ url: '/login', });
    }

    const errorText = codeMessage[response.status] || response.statusText;

    const error = new Error(errorText);
    error.response = response;
    throw error;
  } else {
    return response;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let token = getAccessToken();
  let authToken = {};
  const {body} = options
  const URL = url.replace(/\/yapi/g,'')

  if (token) {
    const uuid = uuidv4();
    const paramsJson = JSON.stringify(body) || '';
    const timeStamp = Date.now()
    const needMd5Content = paramsJson ? `${uuid}${timeStamp}${URL}${paramsJson}` : `${uuid}${timeStamp}${URL}`
    const md5Sign = md5(needMd5Content);
    token = token ? JSON.parse(token) : '';
    authToken = {
      headers: {
        'X-Ca-Nonce': uuid,
        'X-Ca-Timestamp': timeStamp,
        'X-Ca-Sign': md5Sign,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  const defaultOptions = {
    credentials: 'include',
    ...authToken,
  };
  const newOptions = { ...defaultOptions, ...options };
  let index = url.indexOf('/oauth/token'); // 是否是登录接口
  let ContentType = '';
  if (index >= 0) {
    ContentType = 'application/x-www-form-urlencoded; charset=utf-8';
  } else {
    ContentType = 'application/json; charset=utf-8';
  }

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {

      newOptions.headers = {
        'Content-Type': ContentType,
        ...newOptions.headers,
      };
      if (index < 0) {
        newOptions.body = JSON.stringify(newOptions.body);
        newOptions.headers = {
          'Content-Type': 'application/json; charset=utf-8',
          ...newOptions.headers,
        };
      } else {
        newOptions.headers.Authorization = 'Basic Y2xpZW50OjEyMzQ1Ng==';
      }
      // newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // 是 formdata
      newOptions.headers = {
        ...newOptions.headers,
        'Content-Type': ContentType
      };
      if(index > 0) {
        alert('Basic Y2xpZW50OjEyMzQ1Ng==');
        newOptions.headers.Authorization = 'Basic Y2xpZW50OjEyMzQ1Ng==';
      }
    }
  } else if (newOptions.method === 'GET') {
    delete newOptions.body;
  }
  if (!newOptions.headers) {
    newOptions.headers = {};
  }
  newOptions.headers.Accept = 'application/json';
  return new Promise((resolve, reject) => {
    return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      // console.log('response', response);
      if (response.error) {
        return response;
      }
      //  结果解析
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.json();
      }
      return response.json();
    })
    .then(response => {
      if (response.status === 500) {
        go({ url: '/500', });
      }
      if (response.status === 403) {
        go({ url: '/403', });
      }
      //  业务型异常解析
      if (response.status !== 500) {
        // return { response };
        resolve(response);
        return response;
      }
      //  全局错误提醒

      notification.error({
        message: `服务端数据异常,请稍后再试`,
        duration: 2,
      });
      const error = new Error(`服务端数据异常：${response.message}`);
      error.response = response;
      reject(response);
      throw error;
    })
    .catch(error => {
      console.log('error', error);
      // return { error };
      return error;
    });
  });

}
