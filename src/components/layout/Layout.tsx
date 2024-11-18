import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../features/auth/hooks/useRefreshToken";
import { useUserStore } from "../../stores/store";
import Footer from "./Footer";
import Header from "./Header";
import MainWrapper from "./MainWrapper";

const Layout = () => {
  const logout = useUserStore((state) => state.logout);
  const { scheduleTokenRefresh } = useRefreshToken();

  useEffect(() => {
    const clearRefresh = scheduleTokenRefresh(logout);
    return () => clearRefresh(); // 언마운트 시 타이머 정리
  }, [logout, scheduleTokenRefresh]);

  return (
    <>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <Footer />
    </>
  );
};

export default Layout;
