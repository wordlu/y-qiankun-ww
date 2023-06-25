import axios from 'axios';

export interface LoginData {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
}

export interface LoginRes {
  Token: string;
}

export function login(params: LoginData) {
  return axios.post<LoginRes>('http://192.168.103.35:30000/api/oauth2/oauth/token', params, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export function logout() {
  return axios.post<LoginRes>('http://192.168.103.35:30000/logoutPath', null, { headers: { 'Authorization': "Bearer " + document.cookie.replace('token=', '') } });
}
