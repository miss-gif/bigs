import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { refreshTokenReq } from "../../features/auth/api/api";
import { useUserStore } from "../../stores/store";
import Footer from "./Footer";
import Header from "./Header";
import MainWrapper from "./MainWrapper";

const Layout = () => {
  const logout = useUserStore((state) => state.logout);

  const scheduleTokenRefresh = (logout: () => void) => {
    let timeoutId: number | null = null; // 타이머 ID

    const refresh = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return; // 엑세스 토큰이 없으면 리프레시 시도하지 않음
      }

      try {
        console.log("리프레시 시도 중...");
        await refreshTokenReq(); // 리프레시 시도
        console.log("토큰 갱신 성공");
      } catch (error) {
        console.error("토큰 갱신 실패. 로그아웃 처리.");
        logout(); // 리프레시 실패 시 로그아웃 처리
      }
    };

    const calculateNextRefresh = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return 0; // 엑세스 토큰이 없으면 리프레시 시도하지 않음
      }

      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1])); // 토큰 디코딩
        const expiresIn = payload.exp * 1000 - Date.now(); // 만료 시간까지 남은 시간(ms)
        return Math.max(expiresIn - 60 * 1000, 0); // 만료 1분 전 리프레시 시도
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
        return 0; // 실패 시 리프레시 시도하지 않음
      }
    };

    const setupRefresh = () => {
      const nextRefreshIn = calculateNextRefresh();
      if (nextRefreshIn <= 0) return; // 만약 리프레시 시도할 시간이 없으면 종료

      // console.log("다음 리프레시까지 남은 시간(ms):", nextRefreshIn);

      timeoutId = setTimeout(async () => {
        await refresh(); // 리프레시 시도
        setupRefresh(); // 갱신 후 재설정
      }, nextRefreshIn);
    };

    // 초기 설정 실행
    setupRefresh();

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId); // 타이머 ID를 이용해 타이머 종료
      }
    };
  };

  useEffect(() => {
    const clearRefresh = scheduleTokenRefresh(logout);

    return () => clearRefresh(); // 언마운트 시 타이머 정리
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
