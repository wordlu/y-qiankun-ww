import axios from 'axios';
import type { RouteRecord } from 'vue-router';
import { UserState } from "../types";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecord[]>('/api/user/menu');
}


// downloadFile = (url) => {//下载方法
//     console.log(url)
//     const iframe = document.createElement("iframe");
//     iframe.style.display = "none"; // 防止影响页面
//     iframe.style.height = 0; // 防止影响页面
//     iframe.src = url;
//     document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
//     // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
//     setTimeout(() => {
//       iframe.remove();
//     }, 5 * 60 * 1000);
//   }

export function qqq(data?:any) {
  // return axios.post(`${bb}/indexView/exportExcel`, data)
  return saveFileBlob(`loc/specialStrategy/specialExport`, data)
}

