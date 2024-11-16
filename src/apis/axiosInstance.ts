import axios from "axios";
import { refreshTokenReq } from "../features/auth/api/api";

export const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshTokenReq(); // 토큰 갱신

        // 실패한 요청에 새로운 토큰을 추가해서 재시도
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config); // 요청 재전송
      } catch (refreshError) {
        console.error("리프레시 토큰으로 토큰 갱신 실패:", refreshError);
        // 리프레시 토큰 갱신 실패 시 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        alert("로그아웃 처리");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
