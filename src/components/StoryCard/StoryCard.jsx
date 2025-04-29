import styled from "styled-components";
const StoryCard = ({ bg, img, name, focus, weapon, onClick }) => {
  return (
    <StoryCardWrapper url={bg} onClick={onClick}>
      <StoryCardImg src={img} />
      <StoryCardTextBox>
        <StoryCardTextBoxTitle>{name}</StoryCardTextBoxTitle>
        <StoryCardTextBoxTitleHr />
        <StoryCardTextBoxWrapper>
          <StoryCardTextBoxContainer>
            {/* <StoryCardTextBoxText>Age</StoryCardTextBoxText> */}
            <StoryCardTextBoxTextYellow>{focus}</StoryCardTextBoxTextYellow>
          </StoryCardTextBoxContainer>
          <StoryCardTextBoxTitleHr2 />
          <StoryCardTextBoxContainer>
            {/* <StoryCardTextBoxText>Weight</StoryCardTextBoxText> */}
            <StoryCardTextBoxTextYellow>{weapon}</StoryCardTextBoxTextYellow>
          </StoryCardTextBoxContainer>
        </StoryCardTextBoxWrapper>
      </StoryCardTextBox>
    </StoryCardWrapper>
  );
};

const StoryCardWrapper = styled.div`
  width: 167px;
  height: 215px;
  background: url(${(props) => props.url});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 5px;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

const StoryCardImg = styled.img`
  width: 115px;
  margin-top: 10px;
`;

const StoryCardTextBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(152, 3, 18, 1);
  margin-top: 4px;
`;

const StoryCardTextBoxTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 8px;
`;

const StoryCardTextBoxTitleHr = styled.div`
  height: 1px;
  width: 99%;
  background-color: #ffc200;
`;
const StoryCardTextBoxTitleHr2 = styled.div`
  width: 1px;
  height: 24px;
  background-color: #ffc200;
`;

const StoryCardTextBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2px;
  gap: 10px;
`;
const StoryCardTextBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  gap: 7px;
`;

const StoryCardTextBoxText = styled.div`
  font-size: 12px;
`;

const StoryCardTextBoxTextYellow = styled.div`
  color: #ffc200;
  font-size: 12px;
`;

export default StoryCard;
