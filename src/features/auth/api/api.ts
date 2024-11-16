import { axiosInstance } from "../../../apis/axiosInstance";
import { useUserStore } from "../../../stores/store";
import { LoginFormValues, SignupFormValues } from "../../../types/type";

// 로그인
export const signin = async (data: LoginFormValues) => {
  try {
    const response = await axiosInstance.post("/auth/signin", data);
    const { accessToken, refreshToken } = response.data;
    // Zustand 상태 업데이트
    const setTokens = useUserStore.getState().setTokens;
    setTokens(accessToken, refreshToken);
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

// 회원가입
export const signup = async (formData: SignupFormValues) => {
  try {
    const response = await axiosInstance.post("/auth/signup", formData);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

// 리프레시 토큰 요청 함수
export const refreshTokenReq = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    console.log("토큰 갱신 성공:", response.data);

    const { accessToken, refreshToken } = response.data;

    // 상태 및 로컬스토리지에 토큰 저장
    const setTokens = useUserStore.getState().setTokens;
    setTokens(accessToken, refreshToken); // Zustand 상태 업데이트 + 로컬스토리지 저장

    return accessToken;
  } catch (error) {
    console.error("리프레시 토큰 요청 실패", error);
    throw error;
  }
};
