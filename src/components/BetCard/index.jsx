import styled from "styled-components";
import AdminButton from "../AdminButton";
import TeamCard from "./TeamCard";
import {
  closeBet,
  finishBet,
  startBet,
  addLiveLink,
} from "../../services/bet.service";
import { useEffect, useState } from "react";
import { useBets } from "../../context/BetContext";
import { toast } from "react-toastify";

const BetCard = ({ bet }) => {
  const [liveUrl, setLiveUrl] = useState(null);
  const { betRefresh, updateBetRefresh, currentBet } = useBets();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  console.log(currentBet, "currentBet");
  const handleStart = async () => {
    try {
      if (bet.liveUrl === null) {
        console.log("Enter your live URL");
        toast.warning("Enter your live URL");
        return;
      }
      const data = await startBet({
        betId: bet._id,
        liveUrl: bet.liveUrl,
        token: token,
      });
      toast.success("Vote Started");
      updateBetRefresh(!betRefresh);
    } catch (error) {
      toast.error("Vote Starting Failed");
      console.log(error);
    }
  };

  const handleFinish = async () => {
    if (currentBet?.status !== "closed") {
      toast.warning("Please Close Vote First");
      return;
    }
    setLoading(true);
    try {
      if (!bet.winningTeamId) {
        toast.warning("Please Set Winner");
        setLoading(false);
        return;
      }
      const data = await finishBet({
        betId: bet._id,
        winningTeamId: bet.winningTeamId,
        token: token,
      });
      toast.success("Vote Finished");
      updateBetRefresh(!betRefresh);
      setLoading(false);
    } catch (error) {
      toast.error("Vote Finishing Failed");
      console.log(error);
      setLoading(false);
    }
  };
  const handleClose = async () => {
    try {
      const data = await closeBet({ betId: bet._id, token: token });
      updateBetRefresh(!betRefresh);
      toast.success("Bet Closed");
    } catch (error) {
      toast.error("Bet Closing Failed");
      console.log(error);
    }
  };
  const handleLiveLink = async () => {
    try {
      const data = await addLiveLink({
        betId: bet._id,
        liveUrl: liveUrl,
        token: token,
      });
      console.log(data);
      toast.success("Saved LiveLink");
      updateBetRefresh(!betRefresh);
    } catch (error) {
      toast.error("Didn't save LiveLink");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setLiveUrl(e.target.value);
  };

  useEffect(() => console.log("bet"), [bet, betRefresh]);

  return (
    <BetCardWrapper>
      <TeamCard team={bet.teams[0]} betid={bet._id} teamIndex="0" />
      <BetCardControlWrapper>
        <BetCardControlButtonGroup>
          <AdminButton
            bgcolor="#039823"
            color="white"
            width="110px"
            text="Start Vote"
            fweight="500"
            onClick={handleStart}
          />
          {loading == false ? (
            <AdminButton
              bgcolor="#005BBF"
              color="white"
              width="110px"
              text="Finish Vote"
              fweight="500"
              onClick={handleFinish}
            />
          ) : (
            <AdminButton
              bgcolor="#005BBF"
              color="white"
              width="180px"
              text="Vote is Processing ..."
              fweight="500"
            />
          )}
          <AdminButton
            bgcolor="#980312"
            color="white"
            width="110px"
            text="Close Vote"
            fweight="500"
            onClick={handleClose}
          />
        </BetCardControlButtonGroup>
        <BetCardStreamWrapper>
          <BetCardInput
            type="text"
            onChange={handleChange}
            placeholder="Enter Live Stream Url"
            defaultValue={bet.liveUrl ? bet.liveUrl : ""}
          />
          <AdminButton
            bgcolor="#980312"
            color="white"
            width="90px"
            text="Enter"
            fweight="500"
            padding="5px"
            onClick={handleLiveLink}
          />
        </BetCardStreamWrapper>
      </BetCardControlWrapper>
      <TeamCard
        team={bet.teams[1]}
        align="flex-end"
        betid={bet._id}
        teamIndex={"1"}
      />
    </BetCardWrapper>
  );
};

const BetCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(152, 3, 18, 0.1);
  border-radius: 8px;
  border: 1px solid #980312;
  padding: 50px 30px;
`;

const BetCardControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BetCardControlButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const BetCardStreamWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #980312;
  padding: 8px;
`;

const BetCardInput = styled.input`
  outline: 0;
  border: 0;
  background-color: transparent;
  font-size: 16px;
  font-family: "General Sans";
  width: 70%;
  padding: 5px;
  color: white;
`;

export default BetCard;
