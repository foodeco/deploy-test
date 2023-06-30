import axios from 'axios';
import { getToken, refreshToken } from './Token/token';

const { VITE_CAFE24_URL } = import.meta.env;
const key = new RegExp(`accessToken=([^;]*)`);

const ajax = axios.create({
  baseURL: VITE_CAFE24_URL,
  params: {
    since_product_no: 20,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${key.test(document.cookie) ? RegExp.$1 : ''}`,
  },
});

ajax.interceptors.request.use(
  async (config) => {
    const key = new RegExp(`accessToken=([^;]*)`);
    console.log('config', config);
    config.headers['Authorization'] = `Bearer ${
      key.test(document.cookie) ? RegExp.$1 : ''
    }`;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log('show 404 error page');
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const key = new RegExp(`accessToken=([^;]*)`);

      console.log(key.test(document.cookie));
      if (!key.test(document.cookie) && !localStorage.getItem('refreshToken')) {
        await getToken();
      } else {
        await refreshToken();
      }
      error.config.headers = {
        Authorization: `Bearer ${key.test(document.cookie) ? RegExp.$1 : ''}`,
      };
    }
  }
);

export default ajax;
