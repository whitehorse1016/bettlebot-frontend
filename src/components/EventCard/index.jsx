import styled from "styled-components";
import UpImg from "../../assets/images/up.png";
import DownImg from "../../assets/images/down.png";
import CardImg1 from "../../assets/images/cockevent1.png";
import CardImg2 from "../../assets/images/cockevent2.png";
import CardImg3 from "../../assets/images/cockevent3.png";
import CardImg4 from "../../assets/images/cockevent4.png";
import Carousel from "./Slider";
import Slider from "./SliderMobile";

const data = [
  {
    img: CardImg1,
    title: "Inferno Dojo $BETTLE Arena",
    text: "A scorched battlefield where ancient architecture meets molten mayhem. Robots battle through fire, falling beams, and a fury of sparks ",
  },
  {
    img: CardImg2,
    title: "Shrine of Shrapnel $BETTLE Arena ",
    text: "A sacred arena turned savage, where stone floors echo with metal-on-metal chaos. Tradition ends when the first blade spins.",
  },
  {
    img: CardImg3,
    title: "The Mech Pit $BETTLE Arena",
    text: "A classic square combat zone built for pure, high-stakes robot brawling. No gimmicks — just steel, sparks, and skill under the lights.",
  },
  {
    img: CardImg4,
    title: "Glacier Clash $BETTLE Arena",
    text: "Set in the icy shallows of a mountain lake, this arena pushes bots to adapt or freeze. Every hit sends waves — and maybe parts — flying.",
  },
  {
    img: CardImg1,
    title: "The Mech Pit $BETTLE Arena",
    text: "A classic square combat zone built for pure, high-stakes robot brawling. No gimmicks — just steel, sparks, and skill under the lights.",
  },
  {
    img: CardImg2,
    title: "The Mech Pit $BETTLE Arena",
    text: "A classic square combat zone built for pure, high-stakes robot brawling. No gimmicks — just steel, sparks, and skill under the lights.",
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
