import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MainWrapper from "./MainWrapper";
import { useEffect } from "react";
import { refreshTokenReq } from "../../features/auth/api/api";
import { useUserStore } from "../../stores/store";

const Layout = () => {
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await refreshTokenReq(); // 토큰 갱신
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
        logout(); // 로그아웃
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      }
    }, 1 * 60 * 1000); // 1분마다 토큰 갱신 시도

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, [logout]);

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
