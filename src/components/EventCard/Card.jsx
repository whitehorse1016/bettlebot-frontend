import React from "react";
import styled from "styled-components";
import CardBg from "../../assets/images/cardbg.png";
import CardRemovedBg from "../../assets/images/cardremovedbg.png";

const Card = (props) => {
  return (
    <ImageCard>
      <CardImage cardimg={props.cardImg}>
        <CardRemoveImage src={CardRemovedBg} />
      </CardImage>
      <CardTitle>{props.cardTitle}</CardTitle>
      <CardText>{props.cardText}</CardText>
    </ImageCard>
  );
};

const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 372px;
  background: url(${CardBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  gap: 10px;
`;
const CardImage = styled.div`
  width: 300px;
  height: 220px;
  background: url(${(props) => props.cardimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const CardRemoveImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-family: "Aquire";
  padding: 0 20px;
`;
const CardText = styled.div`
  padding: 0 20px;
`;

export default Card;
