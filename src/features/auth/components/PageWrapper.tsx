import styled from "@emotion/styled";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const PageWrapper = ({ children, title }: PageWrapperProps) => {
  return (
    <WrapperStyled>
      <h2>{title}</h2>
      {children}
    </WrapperStyled>
  );
};

export default PageWrapper;

const WrapperStyled = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 0;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;
