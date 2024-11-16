import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores/store";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
    alert("로그아웃 되었습니다.");
  };
  return { handleLogout };
};
