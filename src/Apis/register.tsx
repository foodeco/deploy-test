import axios from 'axios';

const { VITE_KDT5_API, VITE_KDT5_USER } = import.meta.env;

const headers = {
  'Content-Type': 'application/json',
  apikey: VITE_KDT5_API,
  username: VITE_KDT5_USER,
};

const axiosInstance = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth',
  headers,
});

export const JoinForm = async (
  email: string,
  displayName: string,
  password: string,
  profileImgBase64: string
) => {
  const URL = '/signup';
  const res = await axiosInstance.post(URL, {
    email,
    displayName,
    password,
    profileImgBase64,
  });
  return res.data;
};

export const LoginForm = async (email: string, password: string) => {
  const LOGINURL = '/login';
  const res = await axiosInstance.post(LOGINURL, { email, password });
  return res.data;
};

export const LogoutForm = async () => {
  const LOGOUTURL = '/logout';
  const token = localStorage.getItem('token') as string;
  const res = await axiosInstance.post(
    LOGOUTURL,
    {},
    { headers: { ...headers, Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const TokenMe = async () => {
  const AUTHME = '/me';
  const token = localStorage.getItem('token') as string;
  const res = await axiosInstance.post(
    AUTHME,
    {},
    { headers: { ...headers, Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const InfoToken = async (
  displayName: string,
  profileImgBase64: string,
  oldPassword: string,
  newPassword: string
) => {
  const InfoMe = '/user';
  const token = localStorage.getItem('token') as string;
  const res = await axiosInstance.put(
    InfoMe,
    { displayName, profileImgBase64, oldPassword, newPassword },
    { headers: { ...headers, Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
