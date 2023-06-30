import axios from 'axios';
//import qs from 'qs';

const { VITE_ACCESS_TOKEN, VITE_REDIRECT_URI } = import.meta.env;

const ajax = axios.create({
  baseURL: '/cafe24/oauth/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${VITE_ACCESS_TOKEN}`,
  },
});

interface Token {
  access_token: string;
  expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  client_id: string;
  mall_id: string;
  user_id: string;
  scopes: string[];
  issued_at: string;
  shop_no: string;
}

let token: Token;

export async function getToken() {
  console.log('get');
  const params = new URLSearchParams(location.search);
  try {
    const { data } = await ajax.post('', {
      grant_type: 'authorization_code',
      redirect_uri: VITE_REDIRECT_URI,
      code: params.get('code'),
    });
    token = data;
    console.log('request', data);
    setCookie(
      token.access_token,
      token.expires_at,
      token.refresh_token
      //token.refresh_token_expires_at
    );
  } catch (err) {
    console.log(err);
  }
}

export async function refreshToken() {
  try {
    console.log('refresh');
    const { data } = await ajax.post('', {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken'),
    });
    token = data;
    setCookie(
      token.access_token,
      token.expires_at,
      token.refresh_token
      //token.refresh_token_expires_at
    );
    console.log('refresh', data);
  } catch (err) {
    console.log(err);
  }
}

function setCookie(
  accessToken: string,
  accessExpires: string,
  refreshToken: string
  //refreshExpires: string
) {
  document.cookie = `accessToken=${accessToken}; path=/; expires=${new Date(
    accessExpires
  ).toUTCString()}`;
  localStorage.setItem('refreshToken', refreshToken);
  // document.cookie = `refreshToken=${refreshToken}; path=/; expires=${new Date(
  //   refreshExpires
  // ).toUTCString()}`;
}
