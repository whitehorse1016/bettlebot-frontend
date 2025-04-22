import React, { useState } from "react";
import styled from "styled-components";
import Person1 from "../../assets/images/person1.png";
import Left_Ico from "../../assets/images/left_ico.png";
import Right_Ico from "../../assets/images/right_ico.png";
import PersonCard from "./PersonCard";

const cardsData = [
  {
    image: Person1,
    title: "Strategic Master",
    text: "A mind like no other, capable of devising unmatched strategies.",
  },
  {
    image: Person1,
    title: "Strategic Master 1",
    text: "A mind like no other, capable of devising unmatched strategies.",
  },
  {
    image: Person1,
    title: "Strategic Master 2",
    text: "A mind like no other, capable of devising unmatched strategies.",
  },
  {
    image: Person1,
    title: "Strategic Master 3",
    text: "A mind like no other, capable of devising unmatched strategies.",
  },
  {
    image: Person1,
    title: "Strategic Master 4",
    text: "A mind like no other, capable of devising unmatched strategies.",
  },
  {
    image: Person1,
    title: "Strategic Master 5",
    text: "A mind like no other, capable of devising unmatched strategies.",
  },
  {
    image: Person1,
    title: "Strategic Master 6",
    text: "A mind like no other, capable of devising unmatched strategies.",
  },
];

const Slider = ({ itemsToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(cardsData.length - itemsToShow, 0) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= cardsData.length - itemsToShow + 1 ? 0 : prev + 1
    );
  };

  const displayedCards = Array.from({ length: itemsToShow }, (_, index) => {
    const cardIndex = (currentIndex + index) % cardsData.length;
    return cardsData[cardIndex];
  });

  return (
    <SliderWrapper>
      <CardContainer>
        {displayedCards.map((card, index) => (
          <PersonCard
            key={index}
            image={card.image}
            title={card.title}
            text={card.text}
            onClick={() => console.log(index)}
          />
        ))}
      </CardContainer>
      <ButtonWrapper>
        <SliderButton icon={Left_Ico} onClick={handlePrev} />
        <SliderButton icon={Right_Ico} onClick={handleNext} />
      </ButtonWrapper>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px; // Space between cards
  overflow: hidden; // Hide overflow for neatness
  transition: transform 0.5s ease; // Smooth transition
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
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
`;

export default Slider;
