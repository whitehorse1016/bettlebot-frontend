import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import AdminButton from "../../components/AdminButton";
import { createBet, getAllBets } from "../../services/bet.service";
import BetCard from "../../components/BetCard";
import { useBets } from "../../context/BetContext";

const Dashboard = () => {
  const [betCards, setBetCards] = useState([]); // State to store bets
  const { betRefresh, updateBetRefresh } = useBets();
  const token = localStorage.getItem("token");

  const handleCreateBet = async () => {
    try {
      const formData = new FormData();
      formData.append("teams[0][name]", "Red");
      formData.append("teams[1][name]", "Blue");
      formData.append("token", token);
      await createBet(formData);
      updateBetRefresh(!betRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllBets = async () => {
    try {
      const response = await getAllBets();
      setBetCards(response); // Update the state with the fetched bets
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBets();
  }, [betRefresh]);

  useEffect(() => {
    document.title = 'CockFights - Admin';
  }, []);

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <AdminButton
          bgcolor="#980312"
          color="white"
          width="140px"
          text="Create Bet"
          icon={<FiPlus />}
          onClick={handleCreateBet}
        />
        {betCards
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((bet) => (
            <BetCardWrapper key={bet._id}>
              <BetCard bet={bet} />
            </BetCardWrapper>
          ))}
      </DashboardContainer>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  width: 100%;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: 100%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 50px;
`;

const BetCardWrapper = styled.div``;

export default Dashboard;
