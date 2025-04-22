import { useState } from "react";
import styled from "styled-components";
import FileUploader from "../FileUploader";
import RedTeam from "../../assets/images/red.png";
import AdminButton from "../AdminButton";
import { setWinner } from "../../services/bet.service";
import { useBets } from "../../context/BetContext";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API_URL;

const TeamCard = (props) => {
  const [teamUri, setTeamUri] = useState(
    props.team.image !== null && API + props.team.image
  );
  const token = localStorage.getItem("token");
  const { betRefresh, updateBetRefresh } = useBets();

  const handleSetWinner = async () => {
    try {
      const data = await setWinner({
        betId: props.betid,
        winner: props.team._id,
        token: token,
      });
      toast.success("Set Winner");
      updateBetRefresh(!betRefresh);
    } catch (error) {
      toast.error("Didn't set Winner");
      console.log(error);
    }
  };

  return (
    <TeamCardWrapper align={props.align}>
      <TeamCardTitleWrapper>
        <TeamCardTitle>{props.team.name} TEAM</TeamCardTitle>
        <TeamCardImg src={teamUri ? teamUri : RedTeam} />
      </TeamCardTitleWrapper>
      <AdminButton
        bgcolor="#FFC200"
        color="black"
        width="220px"
        text={`Set ${props.team.name} Team as winner`}
        fweight="500"
        onClick={handleSetWinner}
      />
      <FileUploader
        setTeamUri={setTeamUri}
        betid={props.betid}
        teamIndex={props.teamIndex}
      />
    </TeamCardWrapper>
  );
};

const TeamCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align && props.align};
  gap: 30px;
`;
const TeamCardTitleWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const TeamCardTitle = styled.div`
  font-size: 28px;
  font-family: "aquire";
`;
const TeamCardImg = styled.img`
  width: 40px;
  border-radius:50px
`;
export default TeamCard;
