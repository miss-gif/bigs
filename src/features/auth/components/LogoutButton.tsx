import styled from "@emotion/styled";
import { useUserStore } from "../../../stores/store";

const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
  };

  return <StyledLink onClick={handleLogout}>로그아웃</StyledLink>;
};

export default LogoutButton;

const StyledLink = styled.button`
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
