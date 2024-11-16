import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import BoardDetail from "./features/board/pages/BoardDetail";
import BoardEdit from "./features/board/pages/BoardEdit";
import BoardList from "./features/board/pages/BoardList";
import BoardWrite from "./features/board/pages/BoardWrite";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./routes/PrivateRoute";
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
        <Route path="signup" element={<Signup />} />
        {/* 게시판 */}
        <Route
          path="boards"
          element={
            <PrivateRoute>
              <BoardList />
            </PrivateRoute>
          }
        />
        <Route
          path="boards/:id"
          element={
            <PrivateRoute>
              <BoardDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="boards/write"
          element={
            <PrivateRoute>
              <BoardWrite />
            </PrivateRoute>
          }
        />
        <Route
          path="boards/edit/:id"
          element={
            <PrivateRoute>
              <BoardEdit />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
