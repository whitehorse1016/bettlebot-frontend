import styled from "styled-components";
import SocialGroup from "./SocialGroup";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const SocialMediaUpdates = () => {
  const navigate = useNavigate();

  const handlePlaceBet = async () => {
    try {
      navigate("/bet");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UpdatesWrapper>
      <UpdatesContainer>
        <UpdateText>Social media Updates</UpdateText>
        <SocialGroup
          gap={"20px"}
          background={"rgba(255, 194, 0, 0.3)"}
          border={"1px solid #FFC200"}
        />
        <Button
          padding={"16px"}
          fsize={"18px"}
          border={"1px solid white"}
          maxwidth={"300px"}
          onClick={handlePlaceBet}
        >
          PLACE A BET!
        </Button>
      </UpdatesContainer>
    </UpdatesWrapper>
  );
};

const UpdatesWrapper = styled.div`
  background-color: #980312;
  width: 100%;
`;

const UpdatesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1460px;
  width: 100%;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 1100px) {
    gap: 20px;
    flex-direction: column;
  }
`;

const UpdateText = styled.div`
  text-transform: uppercase;
  font-size: 28px;
  font-family: "aquire";
  @media screen and (max-width: 430px) {
    font-size: 22px;
  }
`;

export default SocialMediaUpdates;
