import axios from 'axios';

const { VITE_IMP_KEY, VITE_IMP_SECERET } = import.meta.env;

export const ajax = axios({
  url: '/users/getToken',
  // POST method
  method: 'post',
  // "Content-Type": "application/json"
  headers: { 'Content-Type': 'application/json' },
  data: {
    // REST API키
    imp_key: VITE_IMP_KEY,
    // REST API Secret
    imp_secret: VITE_IMP_SECERET,
  },
});
