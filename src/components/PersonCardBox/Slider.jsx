import React, { useState } from "react";
import styled from "styled-components";
import Left_Ico from "../../assets/images/left_ico.png";
import Right_Ico from "../../assets/images/right_ico.png";
import PersonCard from "./PersonCard";

const cardsData = [
  {
    image:
      "https://battlebots.com/wp-content/uploads/2018/04/Tombstone-Team-S2018.jpg",
    title: "🔥 Ray Billings – Tombstone",
    text: "Ray is known for raw aggression and maximum-damage tactics. Tombstone reflects his philosophy—no mercy.",
  },
  {
    image:
      "https://battlebots.com/wp-content/uploads/2022/11/BB2022-lockjaw-team.jpg",
    title: "🛡️ Donald Hutson – Lock-Jaw",
    text: "A veteran strategist with unmatched adaptability. His bot Lock-Jaw is as versatile as his mind.",
  },
  {
    image:
      "https://battlebots.com/wp-content/uploads/2019/05/Sawblaze-Team-S2019.jpg",
    title: "⚙️ Jamison Go – SawBlaze",
    text: "Precision-driven and cool under pressure, Jamison’s surgical strikes set him apart.",
  },
  {
    image:
      "https://battlebots.com/wp-content/uploads/2021/10/MadCatter-Team-2021.jpg",
    title: "🧠 Martin Mason – MadCatter",
    text: "The showman of the sport. Wild energy, unpredictable tactics—MadCatter matches his personality.",
  },
  {
    image:
      "https://battlebots.com/wp-content/uploads/2019/05/Minotaur-Team-S2019.jpg",
    title: "🐉 Marco Antonio Meggiolaro – Minotaur",
    text: "Brazilian fire and grit. Marco’s relentless drum spinner shows no fear, no hesitation",
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
