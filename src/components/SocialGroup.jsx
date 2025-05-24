import styled from "styled-components";
import PumpIcon from "../assets/images/pump.png";
import DexIcon from "../assets/images/dex.png";
import TgIcon from "../assets/images/tg.png";
import XIcon from "../assets/images/twitter.png";

const socialData = [
  {
    icon: XIcon,
    title: "Twitter",
    href: "https://x.com",
  },
];

const SocialGroup = ({ gap, background, border }) => {
  return (
    <SocialWrapper gap={gap}>
      {socialData.map((item, key) => (
        <SocialIconContainer
          background={background}
          href={item.href}
          key={key}
          border={border}
        >
          <SocialIcon src={item.icon} alt={item.title} />
        </SocialIconContainer>
      ))}
    </SocialWrapper>
  );
};

const SocialWrapper = styled.div`
  display: flex;
  gap: ${(props) => props.gap};
`;
const SocialIconContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 40px;
  height: 40px;
  background: ${(props) => props.background};
  border-radius: 50px;
  border: ${(props) => (props.border ? props.border : "none")};
`;

const SocialIcon = styled.img`
  height: auto;
  max-width: 100%;
`;

export default SocialGroup;
