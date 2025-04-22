import React, { createContext, useState, useEffect } from "react";
import { getUserInfo } from "../services/user.service";
import { Connection, PublicKey } from "@solana/web3.js";
import io from "socket.io-client";

export const UserContext = createContext();
const socket = io(import.meta.env.VITE_API_URL); // Replace with your backend URL

export const UserProvider = ({ children }) => {
  const [publicAddress, setPublicAddress] = useState(null);
  const [userid, setUserId] = useState(null);
  const [username, setUserName] = useState(null);
  const [totalbalance, setBalance] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [messages, setMessages] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [checkWinner, setCheckWinner] = useState({ winner: false, amount: 0 });

  const updatePublicAddress = (address) => {
    setPublicAddress(address);
  };
  const updateRefresh = (refresh) => {
    setRefresh(refresh);
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
    });
    // Receive chat history when the component mounts
    socket.on("chat history", (messages) => {
      setMessages(messages);
    });
  }, []);

  // Fetch public address if token is available
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Example API call with token to get public keys
          const userdata = await getUserInfo({ token });
          setUserId(userdata.userId);
          setUserName(userdata.username);
          setWithdrawHistory(userdata.withdraw);
          if (userdata.publicKeys && userdata.publicKeys.length > 0) {
            setPublicAddress(userdata.publicKeys[0]);
          }
        } catch (error) {
          console.error("Failed to fetch public address:", error);
          logout(); // Optional: Log o  ut on error to clear session
        }
      }
    };

    fetchUserInfo();
  }, [refresh]);

  const fetchBalance = async () => {
    if (!publicAddress) return; // Ensure wallet is connected
    const connection = new Connection(import.meta.env.VITE_RPC_URL); // Use the appropriate endpoint
    try {
      const publicKeyInstance = new PublicKey(publicAddress.toString());
      const lamports = await connection.getBalance(publicKeyInstance);
      const solBalance = lamports / 1e9; // Convert lamports to SOL
      setBalance(solBalance);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    // Set an interval to poll the server for updates
    const interval = setInterval(async () => {
      fetchBalance();
    }, 2000); // Poll every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [publicAddress]);

  return (
    <UserContext.Provider
      value={{
        publicAddress,
        updatePublicAddress,
        updateRefresh,
        refresh,
        logout,
        userid,
        totalbalance,
        username,
        messages,
        setMessages,
        withdrawHistory,
        open,
        setOpen,
        checkWinner,
        setCheckWinner
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
