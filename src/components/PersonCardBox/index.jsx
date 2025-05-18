import styled from "styled-components";
import LeftImg from "../../assets/images/left.png";
import RightImg from "../../assets/images/right.png";
import BottomImg from "../../assets/images/bottom.png";
import Slider from "./Slider";
import { useEffect, useState } from "react";

const PersonCardBox = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
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
    <PersonCardBoxWrapper>
      <PersonCardBoxTitleWrapper>
        <PersonCardBoxImage src={LeftImg} />
        <PersonCardBoxTitle>
          Discover BETTLE
          <PersonCardBoxTitleYellow> Trainers</PersonCardBoxTitleYellow>
        </PersonCardBoxTitle>
        <PersonCardBoxImage src={RightImg} />
      </PersonCardBoxTitleWrapper>
      <PersonCardBoxText>
        All bettle went through a rigorous training
      </PersonCardBoxText>
      <Slider
        itemsToShow={
          windowSize.width > 1400
            ? 4
            : windowSize.width > 980
            ? 3
            : windowSize.width > 676
            ? 2
            : 1
        }
      />
      <PersonCardBoxImage2 src={BottomImg} />
    </PersonCardBoxWrapper>
  );
};

const PersonCardBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const PersonCardBoxTitleWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
`;
const PersonCardBoxTitle = styled.div`
  font-family: "aquire";
  font-size: 39px;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-size: 30px;
  }
`;
const PersonCardBoxTitleYellow = styled.span`
  font-family: "aquire";
  font-size: 39px;
  color: rgba(255, 194, 0, 1);
  @media screen and (max-width: 1200px) {
    font-size: 30px;
  }
`;
const PersonCardBoxText = styled.div`
  font-size: 18px;
`;
const PersonCardBoxImage = styled.img`
  width: 320px;
  height: auto;
  @media screen and (max-width: 1300px) {
    width: 290px;
  }
  @media screen and (max-width: 1200px) {
    width: 190px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const PersonCardBoxImage2 = styled.img`
  max-width: 100%;
  height: auto;
`;

export default PersonCardBox;
