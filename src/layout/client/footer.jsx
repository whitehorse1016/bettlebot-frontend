import styled from "styled-components";
import FooterBannerImg from "../../assets/images/footerbanner.png";
import SocialMediaUpdates from "../../components/SocialMediaUpdates";
const Footer = () => {
  return (
    <FooterWrapper>
      <SocialMediaUpdates />
      <FooterContainer>
        <FooterItem>
          <FooterText>Privacy Policy</FooterText>
          <FooterBanner src={FooterBannerImg} alt="Footer Banner" />
          <FooterText>Terms of Use</FooterText>
        </FooterItem>
        <FooterItem>
          <FooterText>© BETTLEBOTS 2025</FooterText>
        </FooterItem>
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  background-color: black;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1600px;
  width: 100%;
  margin: auto;
  padding: 30px 0px;
  gap: 30px;
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  @media screen and (max-width: 670px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const FooterText = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

const FooterBanner = styled.img`
  max-width: 100%;
  height: auto;
  width: 100px;
`;

export default Footer;
