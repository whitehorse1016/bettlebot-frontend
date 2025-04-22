import styled from "styled-components";
import RED_TEAM from "../assets/images/blue.png";
import { useEffect, useState } from "react";
import { getFinishedBets } from "../services/bet.service";

const API = import.meta.env.VITE_API_URL;

const MatchHistory = () => {
  const [finishedData, setFinishedData] = useState([]);
  const [winner, setWinner] = useState([]);

  const fetchHistory = async () => {
    try {
      const data = await getFinishedBets();
      setFinishedData(data);
      if (data.length > 0) {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(itemdata => {
          itemdata.teams.map((item) => {
            if (item._id == itemdata.winningTeamId) {
              setWinner((prev) => [...prev, item.name]);
            }
          });

        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Set an interval to poll the server for updates
    const interval = setInterval(async () => {
      fetchHistory();
    }, 2000); // Poll every 2 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <MatchHistoryWrapper>
      <MatchHistoryTitle>Match history</MatchHistoryTitle>
      <MatchHistorScrollWrapper>
        {finishedData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date in descending order
          .map((item, key) => (
            <ScrollWrapper key={key} color={key !== 0 ? "0.4" : "1"}>
              <MatchHistoryGroup>
                <MatchHistoryGroupIcon
                  src={
                    item.teams[0].image ? API + item.teams[0].image : RED_TEAM
                  }
                />
                <MatchHistoryGroupTextWrapper>
                  <MatchHistoryGroupTitle>
                    Winner
                  </MatchHistoryGroupTitle>
                  <MatchHistoryGroupText>
                    {winner[key] && winner[key]} Team
                  </MatchHistoryGroupText>
                </MatchHistoryGroupTextWrapper>
                <MatchHistoryGroupIcon
                  src={
                    item.teams[1].image ? API + item.teams[1].image : RED_TEAM
                  }
                />
              </MatchHistoryGroup>
              <MatchHistoryhr />
            </ScrollWrapper>
          ))}
      </MatchHistorScrollWrapper>
    </MatchHistoryWrapper>
  );
};
const MatchHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #980312;
  background-color: rgba(152, 3, 18, 0.1);
  box-sizing: border-box;
  max-width: 320px;
  height: 430px;
  gap: 6px;
  width: 100%;
  user-select: none;
  @media screen and (max-width: 1270px) {
    max-width: 360px;
  }
`;
const MatchHistorScrollWrapper = styled.div`
  overflow: auto;
  height: 430px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MatchHistoryTitle = styled.div`
  font-family: "aquire";
  font-size: 20px;
  font-weight: 900;
  padding: 12px 16px;
  border-bottom: 1px solid #980312;
`;
const ScrollWrapper = styled.div`
  opacity: ${(props) => props.color};
`;
const MatchHistoryGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 16px;
  box-sizing: border-box;
`;

const MatchHistoryGroupIcon = styled.img`
  width: 44px;
  height:44px;
  border-radius:50px
`;
const MatchHistoryGroupTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
`;

const MatchHistoryGroupTitle = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
`;
const MatchHistoryGroupText = styled.div`
  font-size: 12px;
`;
const MatchHistoryhr = styled.hr`
  width: 100%;
  border: 0;
  margin: 0;
  border-top: 1px solid #980312;
  margin-top: 3px;
`;
export default MatchHistory;
