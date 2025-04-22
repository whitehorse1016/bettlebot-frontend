import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import Left_Ico from "../../assets/images/left_ico.png";
import Right_Ico from "../../assets/images/right_ico.png";

const CardCarousel = ({ data }) => {
  const [currentActive, setCurrentActive] = useState(0);
  const totalCards = data.length;

  const generateItems = () => {
    const itemsToShow = [];
    for (let i = currentActive - 2; i < currentActive + 3; i++) {
      let index = (i + totalCards) % totalCards; // Wrap around
      const level = currentActive - i;
      itemsToShow.push(
        <StyledCard key={index} level={level}>
          <Card
            cardImg={data[index].img}
            cardTitle={data[index].title}
            cardText={data[index].text}
          />
        </StyledCard>
      );
    }
    return itemsToShow;
  };

  const moveLeft = () => {
    setCurrentActive((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const moveRight = () => {
    setCurrentActive((prev) => (prev + 1) % totalCards);
  };

  return (
    <SliderContainer>
      <SliderButton icon={Left_Ico} onClick={moveLeft} />
      <CardWrapper>
        <CardContainer>
          <ItemWrapper>{generateItems()}</ItemWrapper>
        </CardContainer>
      </CardWrapper>
      <SliderButton icon={Right_Ico} onClick={moveRight} />
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 1500px) {
    padding: 0 100px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 1350px) {
    padding: 0 50px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 1200px) {
    padding: 0 0px;
    box-sizing: border-box;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const CardContainer = styled.div`
  display: flex;
  overflow: hidden;
  max-width: 1330px;
  width: 100%;
  height: 372px;
`;

const StyledCard = styled.div`
  transition: transform 0.3s ease, margin 1s ease;
  margin: 0 5px;
  flex: 0 0 20%;

  transform: scale(
    ${(props) =>
      props.level === 0
        ? 1
        : props.level === 1 || props.level === -1
        ? 0.9
        : 0.7}
  );

  position: ${(props) => {
    if (props.level === 0) return "absolute";
    if (props.level === 1) return "absolute"; // Slightly visible
    if (props.level === -1) return "absolute"; // Less visible, partially obscured
    if (props.level === 2) return "absolute"; // More obscured
    if (props.level === -2) return "absolute"; // More obscured
    return 0;
  }};

  margin-left: ${(props) => {
    if (props.level === 2) return "0px"; // More obscured
    if (props.level === 1) return "150px"; // Slightly visible
    if (props.level === 0) return "500px";
    if (props.level === -1) return "850px"; // Less visible, partially obscured
    if (props.level === -2) return "1000px"; // More obscured
  }};

  @media screen and (max-width: 1500px) {
    margin-left: ${(props) => {
      if (props.level === 2) return "0px"; // More obscured
      if (props.level === 1) return "120px"; // Slightly visible
      if (props.level === 0) return "350px";
      if (props.level === -1) return "580px"; // Less visible, partially obscured
      if (props.level === -2) return "700px"; // More obscured
    }};
  }

  @media screen and (max-width: 1000px) {
    margin-left: ${(props) => {
      if (props.level === 2) return "0px"; // More obscured
      if (props.level === 1) return "80px"; // Slightly visible
      if (props.level === 0) return "200px";
      if (props.level === -1) return "320px"; // Less visible, partially obscured
      if (props.level === -2) return "400px"; // More obscured
    }};
  }

  z-index: ${(props) =>
    props.level === 0
      ? 3 // Level 0 on top
      : props.level === 1
      ? 2 // Level 1 above level -1 and -2
      : props.level === -1
      ? 1 // Level -1 above level -2
      : props.level === 2
      ? 1 // Level 2 can be behind level 1
      : props.level === -2
      ? 0 // Level -2 hidden behind level -1
      : 0}; // Any other cases

  &::before {
    position: absolute;
    content: "";
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgb(31 24 25);
    opacity: ${(props) => {
      if (props.level === 0) return 0;
      if (props.level === 1) return 0.2; // Slightly visible
      if (props.level === -1) return 0.2; // Less visible, partially obscured
      if (props.level === 2) return 0.5; // More obscured
      if (props.level === -2) return 0.5; // More obscured
      return 0;
    }};
  }
`;

const SliderButton = styled.div`
  background: url(${(props) => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 50px;
  width: 50px;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  z-index: 100;
`;

const ItemWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-665px);

  @media screen and (max-width: 1500px) {
    transform: translateX(-520px);
  }

  @media screen and (max-width: 1000px) {
    transform: translateX(-365px);
  }
`;

export default CardCarousel;
