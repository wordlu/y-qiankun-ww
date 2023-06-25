import request from '@utils/requestFunction';

const auth = '/yapi/api/oauth2';
const manage = '/yapi/api/manager';
// ---------------------- 登录 ----------------- //

// 登录
export async function toLogin(params) {

  let formData = 'username=' + params.username + '&password=' + params.password + '&grant_type=' + params.grant_type;
  // let formData = new FormData();
  // for (const key in params) {
  //   if (params.hasOwnProperty(key)) {
  //     formData.append(key, params[key]);
  //   }
  // }
  return request(`${auth}/oauth/token`, {
    // return request(`/yapi/oauth/token`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Y2xpZW50OjEyMzQ1Ng=='
    }),
    body: formData
  });
}

// 获取当前用户信息
export async function getUserInfo(params) {
  return request(`${manage}/user/info`, {
    method: 'GET'
  });
}
