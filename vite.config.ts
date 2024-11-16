import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://front-mission.bigs.or.kr", // 백엔드 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api 제거
        secure: false,
        ws: true,
      },
    },
  },
});
