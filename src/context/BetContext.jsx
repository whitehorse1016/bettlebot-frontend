import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentBet } from "../services/bet.service";

const BetContext = createContext();

export const BetProvider = ({ children }) => {
  const [currentBet, setCurrentBet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [betRefresh, setBetRefresh] = useState(false);
  const [betFlag, setBetFlag] = useState(2);

  const updateBetRefresh = (refresh) => {
    setBetRefresh(refresh);
  };

  const fetchCurrentBet = async () => {
    try {
      const response = await getCurrentBet(); // Adjust the API endpoint as needed
      setCurrentBet(response[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set an interval to poll the server for updates
    const interval = setInterval(async () => {
      fetchCurrentBet();
    }, 2000); // Poll every 2 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [betRefresh]);

  return (
    <BetContext.Provider
      value={{
        currentBet,
        loading,
        error,
        betRefresh,
        updateBetRefresh,
        betFlag,
        setBetFlag,
      }}
    >
      {children}
    </BetContext.Provider>
  );
};

export const useBets = () => {
  const context = useContext(BetContext);
  if (!context) {
    throw new Error("useBets must be used within a BetProvider");
  }
  return context;
};
