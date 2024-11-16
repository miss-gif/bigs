import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";
import BoardDetail from "./features/board/pages/BoardDetail";
import BoardEdit from "./features/board/pages/BoardEdit";
import BoardList from "./features/board/pages/BoardList";
import BoardWrite from "./features/board/pages/BoardWrite";
import NotFoundPage from "./pages/NotFoundPage";
import { useUserStore } from "./stores/store";

const App = () => {
  const { accessToken } = useUserStore();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={accessToken ? "/boards" : "/login"} />}
      />
      <Route path="/" element={<Layout />}>
        {/* 인증 */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        {/* 게시판 */}
        <Route path="boards" element={<BoardList />} />
        <Route path="boards/:id" element={<BoardDetail />} />
        <Route path="boards/write" element={<BoardWrite />} />
        <Route path="boards/edit/:id" element={<BoardEdit />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
