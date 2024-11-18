import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../../../stores/store";
import { LoginFormValues } from "../../../types/type";
import { signin } from "../api/api";

export const useLogin = () => {
  const setTokens = useUserStore((state) => state.setTokens);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const { accessToken, refreshToken } = await signin(data);
      setTokens(accessToken, refreshToken);
      toast.success("로그인 성공");
      navigate("/");
    } catch (error) {
      toast.error("로그인 실패");
      throw error;
    }
  };

  return { handleLogin };
};
