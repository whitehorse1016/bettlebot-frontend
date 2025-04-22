import styled from "styled-components";
import Person1 from "../../assets/images/person1.png";
const PersonCard = ({ image, title, text, onClick }) => {
  return (
    <PersonCardBorderWrapper onClick={onClick}>
      <PersonCardNewBorderWrapper>
        <PersonCardWrapper>
          <PersonCardImageWrapper image={image} />
          <PersonCardTitle>{title}</PersonCardTitle>
          <PersonCardText>{text}</PersonCardText>
        </PersonCardWrapper>
      </PersonCardNewBorderWrapper>
    </PersonCardBorderWrapper>
  );
};
const PersonCardBorderWrapper = styled.div`
  background: linear-gradient(
    90deg,
    rgba(152, 3, 18, 1) 0%,
    rgba(255, 194, 0, 1) 100%
  );
  height: 380px;
  width: 300px;
  border-radius: 8px;
  padding: 1px;
  cursor: pointer;
`;
const PersonCardNewBorderWrapper = styled.div`
  background: rgba(152, 3, 18, 0.05);
  height: 100%;
  width: 100%;
`;
const PersonCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #191919;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  gap: 7px;
`;
const PersonCardImageWrapper = styled.div`
  width: 280px;
  height: 270px;
  border-radius: 4px;
  background: url(${Person1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PersonCardTitle = styled.div`
  font-family: "aquire";
  font-size: 18px;
  font-weight: 600;
`;

const PersonCardText = styled.div``;

export default PersonCard;
