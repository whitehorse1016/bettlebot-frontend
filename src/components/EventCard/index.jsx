import styled from "styled-components";
import UpImg from "../../assets/images/up.png";
import DownImg from "../../assets/images/down.png";
import CardImg1 from "../../assets/images/cockevent1.png";
import CardImg2 from "../../assets/images/cockevent2.png";
import Carousel from "./Slider";
import Slider from "./SliderMobile";

const data = [
  {
    img: CardImg1,
    title: "The Fighting Arena of the Cocks 1 ",
    text: "The arena is meticulously crafted for the intensity of the battle.",
  },
  {
    img: CardImg2,
    title: "The Fighting Arena of the Cocks 2 ",
    text: "The arena is meticulously crafted for the intensity of the battle.",
  },
  {
    img: CardImg1,
    title: "The Fighting Arena of the Cocks 3",
    text: "The arena is meticulously crafted for the intensity of the battle.",
  },
  {
    img: CardImg2,
    title: "The Fighting Arena of the Cocks 4",
    text: "The arena is meticulously crafted for the intensity of the battle.",
  },
  {
    img: CardImg1,
    title: "The Fighting Arena of the Cocks 5",
    text: "The arena is meticulously crafted for the intensity of the battle.",
  },
  {
    img: CardImg1,
    title: "The Fighting Arena of the Cocks 6",
    text: "The arena is meticulously crafted for the intensity of the battle.",
  },
];

const CardBox = () => {
  return (
    <CardWrapper>
      <CardBoxImage src={UpImg} />
      <CardBoxTitle>
        Discover Our <CardBoxTitleYellow> Fighting Fields </CardBoxTitleYellow>
      </CardBoxTitle>
      <CarouselWrapper>
        <Carousel data={data} />
      </CarouselWrapper>
      <CarouselMobileWrapper>
        <Slider cardsData={data} />
      </CarouselMobileWrapper>
      <CardBoxImage src={DownImg} />
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  gap: 20px;
  position: relative;
`;

const CardBoxTitle = styled.div`
  font-family: "aquire";
  font-size: 40px;
  @media screen and (max-width: 1200px) {
    font-size: 30px;
    text-align: center;
  }
  /* @media screen and (max-width: 767px) {
    font-size: 30px;
  }
  @media screen and (max-width: 550px) {
    font-size: 19px;
  } */
`;
const CardBoxTitleYellow = styled.span`
  font-family: "aquire";
  font-size: 40px;
  color: rgba(255, 194, 0, 1);
  @media screen and (max-width: 1200px) {
    font-size: 30px;
  }
`;
const CardBoxImage = styled.img`
  max-width: 100%;
  height: auto;
`;
const CarouselWrapper = styled.div`
  width: 100%;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
const CarouselMobileWrapper = styled.div`
  width: 100%;
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

export default CardBox;
