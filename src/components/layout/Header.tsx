import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/store";
import LogoutButton from "../../features/auth/components/LogoutButton";

const Header = () => {
  const { accessToken } = useUserStore();

  return (
    <HeaderStyled>
      <Logo>
        <Link to="/">
          <img src="/public/assets/logo_black.png" alt="로고" />
        </Link>
      </Logo>
      <Nav>
        <ul>
          <li>
            <StyledLink to="/boards">게시판</StyledLink>
          </li>
          {accessToken ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <li>
              <StyledLink to="/login">로그인</StyledLink>
            </li>
          )}
        </ul>
      </Nav>
    </HeaderStyled>
  );
};

export default Header;

// 스타일링
const HeaderStyled = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  width: 140px;
  img {
    min-width: 140px;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100px;
  text-align: center;
  color: #343a40;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    color: #495057;
    background-color: #e9ecef;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
`;
