import styled from "styled-components";
import TopBet from "../../components/TopBet";
import MatchHistory from "../../components/MatchHistory";
import StreamChat from "../../components/StreamChat";
import CurrentBet from "../../components/CurrentBet";
import PlaceBet from "../../components/PlaceBet";
import { useBets } from "../../context/BetContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getBetByBetId } from "../../services/bet.service";
import LiveStream from "../../components/LiveStream";
import { toast } from "react-toastify";

const BetDashboard = () => {
  const { currentBet, betRefresh } = useBets();
  const { userid, checkWinner, setCheckWinner } = useContext(UserContext);
  const [streamUrl, setStreamUrl] = useState(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  );
  const [notifiedStatus, setNotifiedStatus] = useState(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleCheckWinner = async () => {
    const response = await getBetByBetId({
      betId: currentBet?._id,
    });
    // const PAYOUT_MULTIPLIER_LIMIT = 3;
    if (response.length > 0) {
      response.map((item) => {
        if (item.userId == userid) {
          if (item.teamId == currentBet.winningTeamId) {
            setCheckWinner({
              winner: true,
              amount: (
                item.amount *
                ((currentBet.teams.filter(
                  (item) => item._id == currentBet.winningTeamId
                )[0].multiplier *
                  99) /
                  100)
              ).toFixed(4),
            });
          } else {
            setCheckWinner({
              winner: false,
              amount: item.amount.toFixed(4),
            });
          }
          return;
        }
      });
    }
  };

  useEffect(() => {
    document.title = "CockFights - Bets";
  }, []);

  useEffect(() => {
    if (currentBet && currentBet.liveUrl != "" && currentBet.liveUrl) {
      setStreamUrl(currentBet.liveUrl);
    }
    if (
      currentBet &&
      currentBet.winningTeamId &&
      currentBet.status == "finished"
    ) {
      handleCheckWinner();
    }
  }, [currentBet, betRefresh]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentBet) {
      // if (userid && checkWinner && checkWinner.amount > 0) {
      //   if (currentBet.status == "finished" && notifiedStatus !== "finished") {
      //     if (checkWinner?.winner == false) {
      //       toast.info(`You lost ${checkWinner.amount} SOL`);
      //     } else {
      //       toast.info(`You won ${checkWinner.amount} SOL`);
      //     }
      //     setNotifiedStatus("finished");
      //   }
      // }
      if (currentBet.status && notifiedStatus !== currentBet.status) {
        toast.info("Bets are " + currentBet.status);
        setNotifiedStatus(currentBet.status);
      }
    }
  }, [currentBet, checkWinner, userid, notifiedStatus]);

  return (
    <BetWrapper>
      <BetContainer>
        <TopBet />
        {windowSize.width < 950 && (
          <LiveStream videoSrc={streamUrl} betRefresh={betRefresh} />
        )}
        <BetMainGroup>
          {windowSize.width > 1270 && <MatchHistory />}
          {windowSize.width < 950 && <MatchHistory />}
          {windowSize.width > 950 && (
            <LiveStream streamUrl={streamUrl} betRefresh={betRefresh} />
          )}
          {<StreamChat />}
        </BetMainGroup>
        <BetMainGroup>
          <CurrentBet
            team="RED"
            color="#980312"
            bgcolor="rgba(152, 3, 18, 0.2)"
            teamId={0}
          />
          {windowSize.width < 1270 && windowSize.width > 950 && (
            <MatchHistory />
          )}
          {windowSize.width > 1270 && (
            <BetPlaceGroup>
              <BetMainGroup>
                <PlaceBet
                  color="#980312"
                  bgcolor="rgba(152, 3, 18, 0.3)"
                  team="RED"
                  teamId={0}
                />
                <PlaceBet
                  color="#24A1DE"
                  bgcolor="rgba(36, 161, 222, 0.2)"
                  team="Blue"
                  teamId={1}
                />
              </BetMainGroup>
              <Status>
                {currentBet &&
                userid &&
                currentBet?.status == "finished" &&
                checkWinner &&
                checkWinner?.amount > 0
                  ? checkWinner?.winner == false
                    ? "You lost " + checkWinner.amount + " SOL"
                    : "You Won " + checkWinner.amount + " SOL"
                  : currentBet?.status
                  ? "Bets are " + currentBet?.status
                  : ""}
              </Status>
            </BetPlaceGroup>
          )}

          <CurrentBet
            color="#24A1DE"
            bgcolor="rgba(36, 161, 222, 0.2)"
            team="Blue"
            teamId={1}
          />
        </BetMainGroup>
        {windowSize.width < 1270 && (
          <BetPlaceGroup>
            <PlaceBet
              color="#980312"
              bgcolor="rgba(152, 3, 18, 0.3)"
              team="RED"
              teamId={0}
            />
            {windowSize.width > 950 && (
              <Status>
                {currentBet &&
                userid &&
                currentBet?.status == "finished" &&
                checkWinner &&
                checkWinner.amount > 0
                  ? checkWinner.winner == false
                    ? "You lost " + checkWinner.amount + " SOL"
                    : "You Won " + checkWinner.amount + " SOL"
                  : currentBet?.status}
              </Status>
            )}

            <PlaceBet
              color="#24A1DE"
              bgcolor="rgba(36, 161, 222, 0.2)"
              team="Blue"
              teamId={1}
            />
          </BetPlaceGroup>
        )}
        {windowSize.width < 950 && (
          <Status>
            {currentBet &&
            userid &&
            currentBet?.status == "finished" &&
            checkWinner &&
            checkWinner.amount > 0
              ? checkWinner.winner == false
                ? "You lost " + checkWinner.amount + " SOL"
                : "You Won " + checkWinner.amount + " SOL"
              : currentBet?.status}
          </Status>
        )}
      </BetContainer>
    </BetWrapper>
  );
};
const BetWrapper = styled.div`
  width: 100%;
`;
const BetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 1460px;
  margin: auto;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  @media screen and (max-width: 950px) {
    gap: 20px;
  }
`;
const BetMainGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  @media screen and (max-width: 1350px) {
    gap: 5px;
  }
  @media screen and (max-width: 1270px) {
    gap: 20px;
    justify-content: space-around;
  }
  @media screen and (max-width: 670px) {
    flex-direction: column;
    align-items: center;
  }
`;
const BetPlaceGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
  @media screen and (max-width: 1270px) {
    flex-direction: row;
    justify-content: space-between;
  }
  @media screen and (max-width: 950px) {
    justify-content: space-around;
  }
  @media screen and (max-width: 670px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Status = styled.div`
  background-color: rgba(152, 3, 18, 0.1);
  font-size: 24px;
  font-family: "aquire";
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  @media screen and (max-width: 1270px) {
    flex-direction: row;
    width: 350px;
    height: 230px;
  }
  @media screen and (max-width: 950px) {
    width: 100%;
    margin: auto;
  }
`;

export default BetDashboard;
