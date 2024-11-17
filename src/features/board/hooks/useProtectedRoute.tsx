import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useProtectedRoute() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);
}

export default useProtectedRoute;
