import styled from "styled-components";
import TopBetBg from "../assets/images/topbet.png";
import { RiCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getTopBet } from "../services/bet.service";

const TopBet = () => {
  const [topdata, setTopData] = useState([]);

  const fetchTopData = async () => {
    try {
      const getdata = await getTopBet();
      let data = [];

      const iterations = 20;

      // Loop to push the pattern multiple times
      for (let i = 0; i < iterations; i++) {
        data.push({ name: "Red", balance: getdata.TopRedTeam });
        data.push({ name: "Blue", balance: getdata.TopBlueTeam });
      }
      setTopData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopData();
  }, []);

  return (
    <TopBetWrapper>
      <TopBetBox>
        <TopBetBoxIcon>
          <RiCircleFill />
        </TopBetBoxIcon>
        <TopBetBoxTitle>Top Votes</TopBetBoxTitle>
      </TopBetBox>
      <TextMarqueeWrapper>
        {topdata.length > 0 &&
          topdata.map((item, key) => {
            return (
              <TopBetTextWrapper key={key}>
                <TopBetTextIcon>
                  <RiCircleFill />
                </TopBetTextIcon>
                <TopBetText>
                  {item.name} team:{" "}
                  {item.balance.toString().length > 6
                    ? item.balance.toFixed(5)
                    : item.balance}{" "}
                  SOL
                </TopBetText>
              </TopBetTextWrapper>
            );
          })}
      </TextMarqueeWrapper>
    </TopBetWrapper>
  );
};

const TopBetWrapper = styled.div`
  width: 100%;
  background-color: #980312;
  border-radius: 8px;
  position: relative;
  height: 46px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  gap: 20px;
`;

const TopBetBox = styled.div`
  display: flex;
  background: url(${TopBetBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  padding-right: 15px;
  gap: 8px;
  box-sizing: border-box;
  position: absolute;
  left: -16px;
  top: -3px;
  z-index: 5;
`;

const TextMarqueeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 50px;
  padding-left: 3%;
  box-sizing: border-box;
  animation: marquee 100s linear infinite;
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const TopBetBoxTitle = styled.div`
  font-size: 20px;
  font-weight: 900;
`;
const TopBetBoxIcon = styled.div`
  display: flex;
  color: #980312;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 16px;
  }
`;
const TopBetTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  user-select: none;
`;
const TopBetText = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const TopBetTextIcon = styled.div`
  display: flex;
  color: #ffc200;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 10px;
  }
`;

export default TopBet;
