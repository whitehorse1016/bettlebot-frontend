import styled from "styled-components";
import CockLogo from "../../assets/images/cocklogo.png";
import SocialGroup from "../../components/SocialGroup";
import WalletButton from "../../components/WalletButton";
import { IoCopy } from "react-icons/io5";
import { TbCopyCheckFilled } from "react-icons/tb";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import AdminButton from "../../components/AdminButton";
import { useNavigate } from "react-router-dom";
import clipboardCopy from "clipboard-copy";
import { toast } from "react-toastify";

const Header = () => {
  const [flag, setFlag] = useState(false);
  const { publicAddress, userid, totalbalance } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCopy = (text) => {
    setFlag(true);

    clipboardCopy(text)
      .then(() => {
        toast.info("The public key has been successfully copied")
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/register");
  };
  const handleHome = () => {
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <SocialGroupWrapper>
          <SocialGroup background={"rgba(238, 238, 238, 0.16)"} gap={"20px"} />
        </SocialGroupWrapper>
        <Logo src={CockLogo} alt="Cock Logo" onClick={handleHome} />
        {userid ? (
          <WalletButtonWrapper>
            <WalletButton />
            <MobileBalanceWrapper>
              <AdminButton
                bgcolor="#980312"
                color="white"
                width="110px"
                text={`${totalbalance.toString().length > 3 ? totalbalance.toFixed(3) : totalbalance} SOL`}
                fweight="500"
              />
            </MobileBalanceWrapper>
            <CopyIconWrapper onClick={() => handleCopy(publicAddress)}>
              {flag === false ? (
                <IoCopy />
              ) : (
                <TbCopyCheckFilled />
              )}
            </CopyIconWrapper>
          </WalletButtonWrapper>
        ) : (
          <WalletButtonWrapper>
            <AdminButton
              bgcolor="#980312"
              color="white"
              width="110px"
              text="Login"
              fweight="500"
              onClick={handleLogin}
            />
            <AdminButton
              bgcolor="#980312"
              color="white"
              width="110px"
              text="Sign Up"
              fweight="500"
              onClick={handleSignUp}
            />
          </WalletButtonWrapper>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1460px;
  width: 100%;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  max-width: 100%;
  height: auto;
  cursor: pointer;
`;

const WalletButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const CopyIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  font-size: 24px;
  border-radius: 8px;
  background-color: #980312;
  cursor: pointer;
  svg {
    color: white;
  }
`;
const SocialGroupWrapper = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const MobileBalanceWrapper = styled.div`
  @media screen and (max-width: 520px) {
    display: none;
  }
`;
export default Header;
