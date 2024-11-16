import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/store";
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return accessToken ? children : null;
};

export default PrivateRoute;
