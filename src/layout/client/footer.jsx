import styled from "styled-components";
import FooterBannerImg from "../../assets/images/footerbanner.png";
import SocialMediaUpdates from "../../components/SocialMediaUpdates";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterWrapper>
      <SocialMediaUpdates />
      <FooterContainer>
        <FooterItem>
          <FooterText href="/bettlebots_privacypolicy.pdf" target="_blank">
            Privacy Policy
          </FooterText>
          <FooterBanner src={FooterBannerImg} alt="Footer Banner" />
          <FooterText href="/bettle_termsofuse_v1.pdf" target="_blank">
            Terms of Use
          </FooterText>
        </FooterItem>
        <FooterItem>
          <DisclaimerWrapper>
            BettleBots is a fictional, game-based simulation. $BETTLE is a
            utility token used for in-game interaction. No real-world wagering
            or payouts. Entertainment use only.
          </DisclaimerWrapper>
        </FooterItem>
        <FooterItem>hello@bettlebots.com</FooterItem>
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

const FooterText = styled.a`
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  color: white;
`;

const FooterBanner = styled.img`
  max-width: 100%;
  height: auto;
  width: 100px;
`;

const DisclaimerWrapper = styled.div`
  max-width: 550px;
  text-align: center;
  padding: 0px 20px;
  box-sizing: border-box;
`;

export default Footer;
