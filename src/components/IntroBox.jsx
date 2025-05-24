import styled from "styled-components";
import IntroBannerImg from "../assets/images/cock.png";
import IntroBgImg from "../assets/images/introbg.png";
import Button from "./Button";
import { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { TbCopyCheckFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { shortenAddress } from "../utills";
import clipboardCopy from "clipboard-copy";

const IntroBox = () => {
  const navigate = useNavigate();
  const address = "3L2Y1D5ksP2d3CsVaA47c3yJhNhKZdq2ifLz5UAc8fsc";
  const [flag, setFlag] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleCopy = (text) => {
    setFlag(true);

    clipboardCopy(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handlePlaceBet = async () => {
    try {
      navigate("/play");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <IntroBorderWrapper>
      {windowSize.width < 850 && (
        <IntroBanner src={IntroBannerImg} alt="Introduce Banner" />
      )}
      <IntroWrapper>
        {windowSize.width < 900 && windowSize.width > 850 && (
          <IntroBanner src={IntroBannerImg} alt="Introduce Banner" />
        )}
        <IntroContainer>
          {/* {windowSize.width > 850 && (
            <AddressPart>
              <AddressText>{address}</AddressText>
              <CopyIconWrapper onClick={() => handleCopy(address)}>
                {flag === false ? <IoCopy /> : <TbCopyCheckFilled />}
              </CopyIconWrapper>
            </AddressPart>
          )} */}

          <Title>UNLEASH THE $BETTLE! </Title>
          <Text>
            The ultimate bot battle simulation is here. Choose your champions,
            make your predictions, and experience the power of $BETTLE in the
            arena. Whether you're a casual player or a competitive tactician,
            this is your chance to engage like never before. Set up your wallet,
            join the live streams, and take your position in the arena. Play
            smart, play bold — unleash the $BETTLE!
          </Text>
          {/* {windowSize.width < 850 && (
            <AddressPart>
              <AddressText>
                {windowSize.width > 600
                  ? address
                  : windowSize.width > 460
                  ? shortenAddress(address, 16, 16)
                  : shortenAddress(address, 10, 10)}
              </AddressText>
              <CopyIconWrapper onClick={() => handleCopy(address)}>
                {flag === false ? <IoCopy /> : <TbCopyCheckFilled />}
              </CopyIconWrapper>
            </AddressPart>
          )} */}
          <ButtonWrapper>
            <Button
              padding={"16px"}
              fsize={"18px"}
              border={""}
              maxwidth={
                windowSize.width < 1200 && windowSize.width > 850
                  ? "420px"
                  : "600px"
              }
              onClick={handlePlaceBet}
            >
              PLAY NOW!
            </Button>
          </ButtonWrapper>
        </IntroContainer>
        {windowSize.width > 900 && (
          <IntroBanner src={IntroBannerImg} alt="Introduce Banner" />
        )}
      </IntroWrapper>
    </IntroBorderWrapper>
  );
};

const IntroBorderWrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 194, 0, 1) 0%,
    rgba(152, 3, 18, 1) 100%
  );
  padding: 1px;
  border-radius: 16px;
  @media screen and (max-width: 850px) {
    text-align: center;
    padding-top: 20px;
  }
  @media screen and (max-width: 424px) {
    padding-top: 10px;
  }
`;

const IntroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 16px;
  background-image: url(${IntroBgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px;
  gap: 100px;
  border-radius: 16px;
  @media screen and (max-width: 1200px) {
    gap: 30px;
  }
  @media screen and (max-width: 900px) {
    justify-content: center;
    padding: 20px;
  }
  @media screen and (max-width: 424px) {
    padding: 10px;
  }
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media screen and (max-width: 1200px) {
    gap: 20px;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const AddressPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media screen and (max-width: 1200px) {
    font-size: 16px;
    justify-content: flex-start;
  }
  @media screen and (max-width: 850px) {
    font-size: 16px;
    justify-content: center;
  }
`;

const AddressText = styled.div`
  font-size: 23px;
  font-weight: 600;
  @media screen and (max-width: 1200px) {
    font-size: 16px;
  }
`;
const Title = styled.div`
  font-size: 52px;
  font-weight: 600;
  font-family: "Aquire";
  @media screen and (max-width: 1200px) {
    font-size: 32px;
  }
`;
const Text = styled.div`
  color: rgba(238, 238, 238, 1);
  max-width: 600px;
  width: 100%;
  line-height: 1.8;
  word-spacing: 2px;
  @media screen and (max-width: 1200px) {
    font-size: 12px;
    max-width: 500px;
  }
  @media screen and (max-width: 900px) {
    max-width: 100%;
    font-size: 16px;
  }
`;

const IntroBanner = styled.img`
  height: auto;
  max-width: 100%;
  @media screen and (max-width: 1200px) {
    height: 350px;
  }
  @media screen and (max-width: 424px) {
    height: 250px;
  }
`;

const CopyIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  font-size: 24px;
  border-radius: 8px;
  cursor: pointer;
  svg {
    color: white;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export default IntroBox;
