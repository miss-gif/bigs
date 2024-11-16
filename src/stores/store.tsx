import { create } from "zustand";

// 로그인 상태 관리 store
interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>(
  (set: (partial: Partial<UserState>) => void) => ({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    setTokens: (accessToken, refreshToken) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      set({ accessToken, refreshToken });
    },
    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      set({ accessToken: null, refreshToken: null });
    },
  })
);
