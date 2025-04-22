import styled from "styled-components";
import StorySlider from "./Slider";
import StoryImg from "../../assets/images/storycock.png";
import StoryBg from "../../assets/images/storybg.png";
import { useEffect, useState } from "react";
import { getCockData } from "../../services/cock.service";
import StoryCardBG from "../../assets/images/storycard.png";
import StoryCardCock from "../../assets/images/storycardcock.png";

const StoryBox = () => {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [cockdata, setCockData] = useState([])
  const [selectedCockData, setSelectedCockData] = useState()

  const getCock = async () => {
    try {
      const data = await getCockData();
      if (data?.cock?.length > 0) {
        const combinedData = data.cock.map(item => ({
          ...item,
          bg: StoryCardBG,
          img: StoryCardCock,
        }));
        setCockData(combinedData)
        setSelectedCockData(combinedData[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCock()
  }, [])

  useEffect(() => {
  }, [selectedCockData])

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
    <StoryWrapper>
      <Background src={StoryBg} />
      <StoryImage src={StoryImg} />
      <StoryMobileWrapper>
        <StoryContentWrapper>
          <StoryContentButton>Fighter Story</StoryContentButton>
          <StoryContentTitle>{selectedCockData && selectedCockData?.cockname}</StoryContentTitle>
          <StoryContentText>
            The ultimate betting experience has arrived. Back your fighters,
            place your bets, and win big with the power of $Cock! Whether you're
            a casual fan or a seasoned bettor, this is your chance to engage
            like never before. Set up your wallet, join the live streams, and
            get ready to take your stake in the fight. It’s time to let loose,
            bet with confidence, and Unleash the $Cock!
          </StoryContentText>
        </StoryContentWrapper>
        <StoryStats>
          <StoryStatsTitle>Battles Stats</StoryStatsTitle>
          <StoryStatsBar>
            <StoryStatsBarWrapper>
              <StoryStatsBarText>Win : </StoryStatsBarText>
              <StoryStatsBarText>&nbsp;{selectedCockData && selectedCockData?.win}</StoryStatsBarText>
            </StoryStatsBarWrapper>
            <StoryStatsBarWrapper>
              <StoryStatsBarText>lose : </StoryStatsBarText>
              <StoryStatsBarHr />
              <StoryStatsBarText>&nbsp;{selectedCockData && selectedCockData?.lose}</StoryStatsBarText>
            </StoryStatsBarWrapper>
          </StoryStatsBar>
        </StoryStats>
      </StoryMobileWrapper>
      {windowSize.width > 1270 && (
        <>
          <StoryContentWrapper>
            <StoryContentButton>Fighter Story</StoryContentButton>
            <StoryContentTitle>{selectedCockData && selectedCockData?.cockname}</StoryContentTitle>
            <StoryContentText>
              The ultimate betting experience has arrived. Back your fighters,
              place your bets, and win big with the power of $Cock! Whether
              you're a casual fan or a seasoned bettor, this is your chance to
              engage like never before. Set up your wallet, join the live
              streams, and get ready to take your stake in the fight. It’s time
              to let loose, bet with confidence, and Unleash the $Cock!
            </StoryContentText>
          </StoryContentWrapper>
          <StoryStats>
            <StoryStatsTitle>Battles Stats</StoryStatsTitle>
            <StoryStatsBar>
              <StoryStatsBarWrapper>
                <StoryStatsBarText>W</StoryStatsBarText>
                <StoryStatsBarHr />
                <StoryStatsBarText>{selectedCockData && selectedCockData?.win}</StoryStatsBarText>
              </StoryStatsBarWrapper>
              <StoryStatsBarWrapper>
                <StoryStatsBarText>l</StoryStatsBarText>
                <StoryStatsBarHr />
                <StoryStatsBarText>{selectedCockData && selectedCockData?.lose}</StoryStatsBarText>
              </StoryStatsBarWrapper>
            </StoryStatsBar>
          </StoryStats>
        </>
      )}
      <StorySliderWrapper>
        <StorySlider
          itemsToShow={
            windowSize.width > 1430
              ? 4
              : windowSize.width > 1025
                ? 3
                : windowSize.width > 545
                  ? 2
                  : 1
          }
          cardsData={cockdata}
          setSelectedCockData={setSelectedCockData}
        />
      </StorySliderWrapper>
    </StoryWrapper>
  );
};

const StoryWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
  /* background: url(${StoryBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; */
  max-width: 1400px;
  width: 100%;
  height: 642px;
  box-sizing: border-box;
  padding: 50px;
  position: relative;
  @media screen and (max-width: 1270px) {
    height: 720px;
  }

  @media screen and (max-width: 1100px) {
    gap: 30px;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 20px;
  }
`;

const StoryImage = styled.img`
  max-width: 290px;
  height: 420px;
  @media screen and (max-width: 1023px) {
    max-width: 200px;
    height: 300px;
  }
`;

const StoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 10px;
  @media screen and (max-width: 440px) {
    gap: 20px;
  }
`;
const StoryContentButton = styled.button`
  border-radius: 8px;
  background-color: rgba(152, 3, 18, 0.3);
  border: 1px solid #980312;
  width: 140px;
  color: white;
  padding: 10px;
  font-weight: 500;
`;
const StoryContentTitle = styled.div`
  font-family: "aquire";
  font-size: 52px;
  @media screen and (max-width: 1023px) {
    align-items: center;
    font-size: 42px;
  }
  @media screen and (max-width: 440px) {
    align-items: center;
    font-size: 32px;
  }
`;
const StoryContentText = styled.div`
  max-width: 600px;
`;
const StoryStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: -20px;
  @media screen and (max-width: 1270px) {
    align-items: flex-start;
    margin-top: 0;
    gap: 20px;
  }
`;
const StoryStatsTitle = styled.div`
  font-family: "aquire";
  font-size: 20px;
  color: #ffc200;
`;

const StoryStatsBar = styled.div`
  display: flex;
  gap: 20px;
`;

const StoryStatsBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(152, 3, 18, 0.15);
  border: 1px solid white;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width:40px;
  @media screen and (max-width: 1270px) {
    flex-direction: row;
    align-items: flex-start;
    width:140px;
  }
`;
const StoryStatsBarText = styled.div`
  font-family: "aquire";
  font-size: 24px;
`;

const StoryStatsBarHr = styled.hr`
  width: 100%;
  @media screen and (max-width: 1270px) {
    display: none;
  }
`;

const StorySliderWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: 120px;
  @media screen and (max-width: 1430px) {
    right: 150px;
  }
  @media screen and (max-width: 1025px) {
    right: 160px;
  }
  @media screen and (max-width: 900px) {
    position: relative;
    bottom: 0px;
    right: 0px;
  }
`;

const Background = styled.img`
  position: absolute;
  z-index: -1;
  height: 650px;
  top: -10px;
  @media screen and (max-width: 1430px) {
    width: 98%;
    height: 650px;
  }
  @media screen and (max-width: 1270px) {
    width: 100%;
    height: 743px;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const StoryMobileWrapper = styled.div`
  display: none;
  @media screen and (max-width: 1270px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;
export default StoryBox;
