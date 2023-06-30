import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from 'axios';
import "./index.scss";


const token = localStorage.getItem("token");

// 토큰을 저장하는 함수
const saveTokenToLocalStorage = (token:string) => {
  localStorage.setItem("token", token);
};

// 토큰을 제거하는 함수
const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

if (token) {
  saveTokenToLocalStorage(token);
} else {
  removeTokenFromLocalStorage();
}

// 토큰 갱신 인터셉터
axios.interceptors.response.use(
  response => {
    // 응답 처리
    return response;
  },
  error => {
    if (error.response.status === 401) {
      console.log("401 에러 발생: 토큰 제거하지 않음");
      alert("401 에러 발생");
      // 401 에러 발생 시 토큰을 제거하는 로직 추가
      removeTokenFromLocalStorage();
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
