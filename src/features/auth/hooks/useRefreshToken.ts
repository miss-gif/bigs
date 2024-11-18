import { useCallback } from "react";
import { refreshTokenReq } from "../api/api";

const useRefreshToken = () => {
  const scheduleTokenRefresh = useCallback((logout: () => void) => {
    let timeoutId: number | null = null; // 타이머 ID

    const refresh = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return; // 엑세스 토큰이 없으면 리프레시 시도하지 않음
      }

      try {
        await refreshTokenReq(); // 리프레시 시도
      } catch (error) {
        console.error("토큰 갱신 실패. 로그아웃 처리.");
        logout(); // 로그아웃 처리
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };

    const calculateNextRefresh = () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return 0; // 엑세스 토큰이 없으면 리프레시 시도하지 않음
      }

      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1])); // 토큰 디코딩
        const expiresIn = payload.exp * 1000 - Date.now(); // 만료 시간(ms)
        const refreshIn = Math.max(expiresIn - 60 * 1000, 0); // 1분 전 리프레시
        return refreshIn;
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
        return 0; // 실패 시 리프레시 시도하지 않음
      }
    };

    const setupRefresh = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId); // 중복 타이머 방지
      }

      const nextRefreshIn = calculateNextRefresh();
      if (nextRefreshIn <= 0) {
        logout(); // 만료된 토큰이면 로그아웃 처리
        return;
      }

      timeoutId = setTimeout(async () => {
        await refresh(); // 리프레시 시도
        setupRefresh(); // 갱신 후 재설정
      }, nextRefreshIn);
    };

    setupRefresh(); // 초기 설정 실행

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId); // 언마운트 시 타이머 종료
        timeoutId = null;
      }
    };
  }, []);
  return { scheduleTokenRefresh };
};

export default useRefreshToken;
