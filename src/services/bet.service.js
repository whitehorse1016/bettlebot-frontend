import axios from "axios";
const endpoint = import.meta.env.VITE_API_URL;

export const createBet = async (payload) => {
  const response = await axios.post(`${endpoint}/api/bet/create`, payload);
  return response.data;
};

export const startBet = async (payload) => {
  const response = await axios.post(`${endpoint}/api/bet/start`, payload);
  return response.data;
};

export const closeBet = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/bet/close/${payload.betId}`,
    payload
  );
  return response.data;
};

export const finishBet = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/bet/finish/${payload.betId}`,
    payload
  );
  return response.data;
};
export const setWinner = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/bet/setwinner/${payload.betId}`,
    payload
  );
  return response.data;
};

export const addLiveLink = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/bet/livelink/${payload.betId}`,
    payload
  );
  return response.data;
};

export const placeBet = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/bet/place-bet/${payload.betId}`,
    payload
  );
  return response.data;
};

export const uploadTeamImage = async (payload) => {
  const response = await axios.post(`${endpoint}/api/bet/upload`, payload);
  return response.data;
};

export const getAllBets = async () => {
  const response = await axios.get(`${endpoint}/api/bet/allbets`);
  return response.data;
};
export const getTopBet = async () => {
  const response = await axios.get(`${endpoint}/api/bet/gettopbet`);
  return response.data;
};

export const getCurrentBet = async () => {
  const response = await axios.get(`${endpoint}/api/bet/currentbet`);
  return response.data;
};

export const getFinishedBets = async () => {
  const response = await axios.get(`${endpoint}/api/bet/finishedbets`);
  return response.data;
};

export const getBetByTeam = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/bet/getbetbyteam`,
    payload
  );
  return response.data;
};
export const getBetByBetId = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/bet/getbetbybetid`,
    payload
  );
  return response.data;
};
