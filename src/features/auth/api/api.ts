import { axiosInstance } from "../../../apis/axiosInstance";
import { useUserStore } from "../../../stores/store";
import { LoginFormValues, SignupFormValues } from "../../../types/type";

// 로그인
export const signin = async (data: LoginFormValues) => {
  const response = await axiosInstance.post("/auth/signin", data);
  return response.data;
};

// 회원가입
export const signup = async (formData: SignupFormValues) => {
  const response = await axiosInstance.post("/auth/signup", formData);
  return response.data;
};

// 상태 업데이트 및 로컬스토리지 저장 함수 분리
const updateTokens = (accessToken: string, refreshToken: string) => {
  const setTokens = useUserStore.getState().setTokens;
  setTokens(accessToken, refreshToken);
};

// 리프레시 토큰 요청 함수
export const refreshTokenReq = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    const { accessToken, refreshToken } = response.data;
    updateTokens(accessToken, refreshToken);

    return accessToken;
  } catch (error) {
    console.error("리프레시 토큰 요청 실패", error);
    throw error;
  }
};
