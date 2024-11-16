import styled from "@emotion/styled";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const currentYear = getCurrentYear();

  return (
    <FooterStyled>
      <p>ⓒ {currentYear} miss-gif. All Rights Reserved.</p>
    </FooterStyled>
  );
};

export default Footer;

const FooterStyled = styled.footer`
  width: 100%;
  padding: 20px 0;
  background-color: #343a40;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  position: relative;
  bottom: 0;
  left: 0;
`;
