import { axiosInstance } from "../../../api/axiosInstance";

// 로그인
export const signin = async (formData: object) => {
  try {
    const response = await axiosInstance.post("/auth/signin", formData);
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};
