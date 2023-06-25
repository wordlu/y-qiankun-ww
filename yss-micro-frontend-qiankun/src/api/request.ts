import axios from 'axios';

const post = (url, data) => axios.post(url, data);
const get = (url, data) => axios.get(url, data);

const request = {
  post,
  get,
};

export default request;
