import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignupFormValues } from "../../../types/type";
import { signup } from "../api/api";

export const useSignup = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: SignupFormValues) => {
    try {
      await signup(data);
      toast.success("회원가입 성공");
      navigate("/login");
    } catch (error) {
      toast.error("회원가입 실패");
      throw error;
    }
  };

  return { handleSignup };
};
