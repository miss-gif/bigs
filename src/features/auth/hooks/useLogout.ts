import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores/store";
import { toast } from "react-toastify";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success("로그아웃 성공");
    navigate("/");
  };
  return { handleLogout };
};
