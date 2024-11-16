import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MainWrapper from "./MainWrapper";

const Layout = () => {
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
