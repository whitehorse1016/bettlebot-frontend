import styled from "styled-components";
import { SiSolana } from "react-icons/si";
import UserImg from "../assets/images/red.png";
import UserImg2 from "../assets/images/blue.png";
import IconText from "./IconText";
import { useBets } from "../context/BetContext";
import { useContext, useEffect, useState } from "react";
import { getBetByTeam } from "../services/bet.service";
import { getUsersInfo } from "../services/user.service";
import { UserContext } from "../context/UserContext";

const CurrentBet = (props) => {
  const colors = ["transparent", props.bgcolor];
  const { currentBet, setBetFlag } = useBets();
  const [currentUsersData, setCurrentUsersData] = useState([]);
  const [myBetAmount, setMyBetAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { username, refresh } = useContext(UserContext);
  const [userImages, setUserImages] = useState({});
  const [checkWinner, setCheckWinner] = useState([]);

  const fetchBetHistory = async () => {
    if (
      currentBet !== undefined &&
      currentBet !== null &&
      currentBet?.teams &&
      currentBet?.teams?.length > 0
    ) {
      if (currentBet.status == "created") {
        setCurrentUsersData([]);
        setMyBetAmount(0);
        setTotalAmount(0);
      }
      const response = await getBetByTeam({
        betId: currentBet?._id,
        teamId: currentBet?.teams[props.teamId]?._id,
      });

      if (response.length > 0) {
        if (currentBet.status == "finished") {
          const winner = [];
          response
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => {
              if (item.teamId == currentBet.winningTeamId) {
                winner.push({
                  winner: true,
                  balance: (
                    item.amount *
                    ((currentBet.teams.filter(
                      (itemdata) => itemdata._id == currentBet.winningTeamId
                    )[0].multiplier *
                      99) /
                      100)
                  ).toFixed(4),
                });
              } else {
                winner.push({ winner: false, balance: item.amount });
              }
            });
          setCheckWinner(winner);
        }

        const userIds = response.map((item) => ({
          userId: item.userId,
          amount: item.amount,
          createdAt: item.createdAt,
        }));
        const data = await getUsersInfo({
          userdata: userIds,
        });
        setCurrentUsersData(data?.userInfoData);
        if (data.userInfoData.length > 0) {
          let total = 0;
          const newImages = {};
          data.userInfoData.forEach((user) => {
            if (!userImages[user.username]) {
              newImages[user.username] =
                Math.random() < 0.5 ? UserImg : UserImg2;
            }
          });
          setUserImages((prevImages) => ({ ...prevImages, ...newImages }));
          data.userInfoData.map((item) => (total += item.amount));
          setTotalAmount(total.toFixed(3));
          if (username !== null) {
            const temp = data.userInfoData.filter(
              (item) => item.username === username
            );
            if (temp.length > 0) {
              setBetFlag(props.teamId);
              setMyBetAmount(temp[0].amount);
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    fetchBetHistory();
  }, [currentBet, username, refresh]);

  return (
    <CurrentBetWrapper bgcolor={props.bgcolor} color={props.color}>
      <CurrentBetTitle color={props.color}>
        VOTES ON {props.team} TEAM
      </CurrentBetTitle>
      <CurrentBetBalanceWrapper color={props.color}>
        <CurrentBetBalanceGroup>
          <CurrentBetBalanceText>Your Vote</CurrentBetBalanceText>
          <IconText
            width="18px"
            height="18px"
            icon={<SiSolana />}
            iconwidth="10px"
            iconheight="10px"
            text={`${
              myBetAmount.toString().length > 10
                ? myBetAmount.toFixed(6)
                : myBetAmount
            } BETTLE `}
            fweight="500"
            fsize="12px"
          />
        </CurrentBetBalanceGroup>
        <CurrentBetBalanceHr color={props.color} />
        <CurrentBetBalanceGroup>
          <CurrentBetBalanceText>Users Vote</CurrentBetBalanceText>
          <IconText
            width="18px"
            height="18px"
            icon={<SiSolana />}
            iconwidth="10px"
            iconheight="10px"
            text={`${
              totalAmount.toString().length > 10
                ? totalAmount.toFixed(6)
                : totalAmount
            } BETTLE `}
            fweight="500"
            fsize="12px"
          />
        </CurrentBetBalanceGroup>
      </CurrentBetBalanceWrapper>
      <CurrentBetHistoryScroll>
        {currentUsersData.length > 0 &&
          currentUsersData
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item, key) => (
              <CurrentBetHistory key={key} color={colors[key % 2]}>
                <IconText
                  width="28px"
                  height="28px"
                  img={userImages[item.username]}
                  iconwidth="28px"
                  iconheight="28px"
                  text={item.username}
                  fweight="500"
                  fsize="14px"
                  gap="16px"
                />
                <IconText
                  width="18px"
                  height="18px"
                  icon={<SiSolana />}
                  iconwidth="10px"
                  iconheight="10px"
                  pretext={`${
                    currentBet.status == "finished"
                      ? (checkWinner[key]?.winner == true ? "+ " : "- ") +
                        (checkWinner[key]?.balance.toString().length > 3
                          ? Number(checkWinner[key]?.balance).toFixed(2)
                          : checkWinner[key]?.balance)
                      : ""
                  }`}
                  text={`${
                    item.amount.toString().length > 10
                      ? item.amount.toFixed(6)
                      : item.amount
                  } BETTLE `}
                  fweight="500"
                  fsize="12px"
                  gap="10px"
                  color={
                    currentBet.status == "finished"
                      ? checkWinner[key]?.winner == true
                        ? "#008000"
                        : "#980312"
                      : "white"
                  }
                />
              </CurrentBetHistory>
            ))}
      </CurrentBetHistoryScroll>
    </CurrentBetWrapper>
  );
};

const CurrentBetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: ${(props) => props.color && "1px solid " + props.color};
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  box-sizing: border-box;
  max-width: 320px;
  height: 430px;
  overflow: auto;
  width: 100%;
  @media screen and (max-width: 1270px) {
    max-width: 360px;
  }
`;
const CurrentBetTitle = styled.div`
  font-family: "aquire";
  font-size: 20px;
  font-weight: 900;
  padding: 12px 16px;
  border-bottom: ${(props) => props.color && "1px solid " + props.color};
`;

const CurrentBetBalanceWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  border-bottom: ${(props) => props.color && "1px solid " + props.color};
  box-sizing: border-box;
`;
const CurrentBetBalanceGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
`;
const CurrentBetBalanceHr = styled.div`
  width: 1px;
  height: 50px;
  background-color: ${(props) => props.color && props.color};
`;
const CurrentBetBalanceText = styled.div`
  font-size: 12px;
`;

const CurrentBetHistory = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${(props) => props.color};
`;

const CurrentBetHistoryScroll = styled.div`
  height: 320px;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default CurrentBet;
