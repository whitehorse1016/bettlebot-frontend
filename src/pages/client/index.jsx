import styled from "styled-components";
import IntroBox from "../../components/IntroBox";
import CardBox from "../../components/EventCard";
import PersonCardBox from "../../components/PersonCardBox";
import StoryBox from "../../components/StoryCard";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ModalBar from "../../components/Modal/Modal";

const Home = () => {
  const { open, setOpen } = useContext(UserContext);

  return (
    <HomeWrapper>
      <HomeContainer>
        <IntroBox />
        <CardBox />
        <PersonCardBox />
        <StoryBox />
        <ModalBar open={open} setOpen={setOpen} />
      </HomeContainer>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100%;
`;
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1460px;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  gap: 100px;
  padding: 0px 20px;
  box-sizing: border-box;
`;

export default Home;
