import styled from "@emotion/styled";

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  return <WrapperStyled>{children}</WrapperStyled>;
};

export default MainWrapper;

const WrapperStyled = styled.main`
  margin-top: 60px;
  min-height: 100vh;
`;
