import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoryCard from "./StoryCard";
import StoryCardRed from "../../assets/images/storycardred.png";
import Left_Ico from "../../assets/images/left_ico.png";
import Right_Ico from "../../assets/images/right_ico.png";

const Slider = ({ itemsToShow, cardsData, setSelectedCockData }) => {
  const [currentViewStartIndex, setCurrentViewStartIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + cardsData.length) % cardsData?.length;
      const newViewStartIndex =
        newIndex === currentViewStartIndex
          ? (currentViewStartIndex - 1 + cardsData.length) % cardsData?.length
          : currentViewStartIndex;

      setCurrentViewStartIndex(newViewStartIndex); // Update `currentViewStartIndex`
      setSelectedCockData(cardsData[newIndex]); // Set the selected data based on new index
      return newIndex; // Update `currentIndex`
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % cardsData?.length;
      const newViewStartIndex =
        (currentViewStartIndex + itemsToShow - 1) % cardsData?.length === prev
          ? (currentViewStartIndex + 1) % cardsData?.length
          : currentViewStartIndex;

      setCurrentViewStartIndex(newViewStartIndex); // Update `currentViewStartIndex`
      setSelectedCockData(cardsData[newIndex]); // Set the selected data based on new index
      return newIndex; // Update `currentIndex`
    });
  };

  const displayedCards = [];
  for (let i = 0; i < itemsToShow; i++) {
    displayedCards.push(
      cardsData[(currentViewStartIndex + i) % cardsData?.length]
    );
  }

  return (
    <SliderWrapper>
      <SliderButton icon={Left_Ico} onClick={handlePrev} />
      <CardContainer>
        {displayedCards.map((card, index) => (
          <StoryCard
            key={index}
            bg={
              currentIndex ===
              (currentViewStartIndex + index) % cardsData?.length
                ? StoryCardRed
                : card?.bg
            }
            img={card?.img}
            name={card?.cockname}
            focus={card?.focus}
            weapon={card?.weapon}
            onClick={() => {
              setCurrentIndex(
                (currentViewStartIndex + index) % cardsData?.length
              );
              setSelectedCockData(card);
            }}
          />
        ))}
      </CardContainer>
      <SliderButton icon={Right_Ico} onClick={handleNext} />
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px; // Space between cards
  overflow: hidden; // Hide overflow for neatness
  transition: transform 0.5s ease; // Animation for smooth transition
`;

const SliderButton = styled.div`
  background: url(${(props) => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Slider;
