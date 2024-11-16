import { axiosInstance } from "../../../apis/axiosInstance";
import { useUserStore } from "../../../stores/store";
import { LoginFormValues } from "../../../types/type";

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
