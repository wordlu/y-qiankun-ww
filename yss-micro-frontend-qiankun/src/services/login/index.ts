import axios from 'axios';
import { message } from '@/components/message';
import { HEADERS, LOGIN_SERVER_PATH } from '@/const';

/**
 * 登录
 * @param {Object} data 登录表单信息
 * @returns
 */
export async function login(data): Promise<any> {
  try {
    const url = LOGIN_SERVER_PATH;
    data = { ...data, grant_type: 'password' };
    const res = await axios.post(url, data,);
    const { code, msg, ...surplus } = res as any;
    if (code && code === '1') {
      message.error({ message: msg });
      return;
    }
    return surplus;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 获取用户信息
 * @returns
 */
export async function getUserInfo(): Promise<any> {
  try {
    const url = '/yapi/api/manager/user/info';
    const res = await axios.get(url, { headers: HEADERS });
    const { code, data, message: msg } = res as any;
    if (code !== 200) {
      message.error({ message: msg });
      return;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}
