import styled from "styled-components";
import TeamImg from "../assets/images/blue.png";
import { SiSolana } from "react-icons/si";
import IconText from "./IconText";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { placeBet } from "../services/bet.service";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useBets } from "../context/BetContext";
import ComfirmModalBar from "./Modal/ComfirmModal";

const API = import.meta.env.VITE_API_URL;

const PlaceBet = (props) => {
  const PercentData = [25, 50, 75, 100];
  const [currentIndex, setCurrentIndex] = useState(5);
  const { currentBet, betFlag, setBetFlag } = useBets();
  const { userid, totalbalance, refresh, updateRefresh } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [balance, setBalance] = useState(0);
  const [comfirm, setComfirm] = useState(false);
  const [teamImage, setTeamImage] = useState();
  const handleSelect = (key) => {
    if (PercentData[key] == 100) {
      setBalance((totalbalance * 98) / 100);
    } else {
      setBalance((totalbalance * PercentData[key]) / 100);
    }
    setCurrentIndex(key);
  };

  const handleOpenModal = () => {
    if (!userid) {
      toast.warn("Please Log in");
      return;
    }
    if (currentBet && currentBet?.status == "created") {
      toast.warn("Bet is not started ");
      return;
    }
    if (currentBet && currentBet?.status == "closed") {
      toast.warn("Bet Closed ");
      return;
    }
    if (currentBet && currentBet?.status == "finished") {
      toast.warn("Bet Finished ");
      return;
    }

    if (betFlag != 2 && betFlag != props.teamId) {
      toast.info("You Already Bet");
      return;
    }
    if (!Number(balance)) {
      toast.warning("Balance must be number");
      return;
    }
    if (balance == 0) {
      toast.warning("Balance is 0");
      return;
    }
    if (totalbalance == 0) {
      toast.warning("Balance is 0");
      return;
    }
    if (balance > totalbalance) {
      toast.warning("Enter correct Balance");
      return;
    }
    if (loading == true) {
      toast.warning("Your Bet is processing");
      return;
    }
    setComfirm(true);
  };

  const handlePlaceBet = async () => {
    try {
      setLoading(true);
      if (
        currentBet !== undefined &&
        currentBet !== null &&
        currentBet?.teams &&
        currentBet?.teams?.length > 0 &&
        userid
      ) {
        const token = localStorage.getItem("token");
        await placeBet({
          betId: currentBet._id,
          userId: userid,
          teamId: currentBet?.teams[props.teamId]._id,
          amount: balance,
          privateKeyIndex: 0,
          token: token,
        });

        updateRefresh(!refresh);
        setBetFlag(props.teamId);
        toast.success("You placed Vote");
        setLoading(false);
        setComfirm(false);
      }
    } catch (error) {
      setBetFlag(2);
      setComfirm(false);
      setLoading(false);

      console.log(error);
    }
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  useEffect(() => {
    setTeamImage();
    setBetFlag(2);
    if (
      currentBet !== undefined &&
      currentBet !== null &&
      currentBet?.teams &&
      currentBet?.teams?.length > 0 &&
      currentBet?.teams[props.teamId] &&
      currentBet?.teams[props.teamId].image
    ) {
      setTeamImage(currentBet?.teams[props.teamId]?.image);
    }
  }, [currentBet, refresh]);

  return (
    <PlaceBetWrapper color={props.color} bgcolor={props.bgcolor}>
      <PlaceBetTitleWrapper color={props.color}>
        <PlaceBetTitle>{props.team} TEAM</PlaceBetTitle>
        <PlaceBetImg src={teamImage ? API + teamImage : TeamImg} />
      </PlaceBetTitleWrapper>
      <PlaceBetInputWrapper color={props.color}>
        <IconText
          width="24px"
          height="24px"
          icon={<SiSolana />}
          iconwidth="14px"
          iconheight="14px"
          text="BETTLE"
          fweight="400"
          fsize="12px"
          padding="12px"
        />
        <PlaceBethr color={props.color} />
        <PlaceBetInput
          type="text"
          value={balance && balance}
          onChange={handleBalanceChange}
        />
      </PlaceBetInputWrapper>
      <PercentBoxWrapper>
        <PercentBoxWrapperGroup>
          {PercentData.map((item, key) => (
            <PercentBox
              key={key}
              bgcolor={key === currentIndex ? props.color : "transparent"}
              color={props.color}
              onClick={() => handleSelect(key)}
            >
              {item} %
            </PercentBox>
          ))}
        </PercentBoxWrapperGroup>
        <BalanceWrapper>
          <BalanceText>Bal</BalanceText>
          <BalanceNumber>
            {totalbalance && totalbalance.toFixed(3)} BETTLE
          </BalanceNumber>
        </BalanceWrapper>
      </PercentBoxWrapper>
      <ButtonWrapper>
        {loading == true ? (
          <Button
            padding={"12px"}
            fsize={"18px"}
            border={""}
            maxwidth={"310px"}
            bgcolor={currentBet?.status != "open" && "rgb(163 ,108, 105,0.13)"}
            color={currentBet?.status != "open" && "rgb(255,255,255,0.2)"}
          >
            BET IS PROCESSING
          </Button>
        ) : (
          <Button
            padding={"12px"}
            fsize={"18px"}
            border={""}
            maxwidth={"310px"}
            onClick={handleOpenModal}
            bgcolor={currentBet?.status != "open" && "rgb(163 ,108, 105,0.13)"}
            color={currentBet?.status != "open" && "rgb(255,255,255,0.2)"}
          >
            PLACE A VOTE
          </Button>
        )}
      </ButtonWrapper>
      <ComfirmModalBar
        open={comfirm}
        setOpen={setComfirm}
        handlePlaceBet={handlePlaceBet}
        loading={loading}
        setLoading={setLoading}
        balance={balance}
        team={props.team}
      />
    </PlaceBetWrapper>
  );
};

const PlaceBetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: ${(props) => props.color && "1px solid " + props.color};
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  box-sizing: border-box;
  max-width: 360px;
  height: 230px;
  width: 100%;
  gap: 5px;
  @media screen and (max-width: 1270px) {
    width: 360px;
  }
`;

const PlaceBetTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border-bottom: ${(props) => props.color && "1px solid " + props.color};
`;
const PlaceBetTitle = styled.div`
  font-family: "aquire";
  font-size: 20px;
  font-weight: 900;
`;
const PlaceBetImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50px;
`;

const PlaceBetInputWrapper = styled.div`
  display: flex;
  border-radius: 12px;
  border: ${(props) => props.color && "1px solid " + props.color};
  margin: 4px 12px;
  box-sizing: border-box;
`;
const PlaceBetInput = styled.input`
  padding: 12px;
  border: 0;
  outline: 0;
  font-size: 16px;
  background-color: transparent;
  width: 100%;
  color: white;
`;
const PlaceBethr = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${(props) => props.color && props.color};
`;
const PercentBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px;
  user-select: none;
`;
const PercentBoxWrapperGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
const PercentBox = styled.div`
  padding: 4px;
  text-align: center;
  border: ${(props) => props.color && "1px solid " + props.color};
  font-size: 12px;
  border-radius: 4px;
  background-color: ${(props) => props.bgcolor};
`;

const BalanceText = styled.div`
  font-size: 14px;
`;
const BalanceNumber = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
`;
const BalanceWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
export default PlaceBet;
