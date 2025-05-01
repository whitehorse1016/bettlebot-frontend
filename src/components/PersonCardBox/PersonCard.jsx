import styled from "styled-components";
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
  max-height: 270px;
  height: 100%;
  border-radius: 4px;
  background: ${(props) => props.image && `url(${props.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PersonCardTitle = styled.div`
  font-family: "aquire";
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
`;

const PersonCardText = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default PersonCard;
