import axios from "axios";
const endpoint = import.meta.env.VITE_API_URL;

export const createNewUser = async (payload) => {
  const response = await axios.post(`${endpoint}/api/users/register`, payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post(`${endpoint}/api/users/login`, payload);
  return response.data;
};

export const createNewWallet = async (payload) => {
  const response = await axios.get(`${endpoint}/api/users/createWallet`, {
    headers: { authorization: payload.token },
  });
  return response.data;
};

export const getUserInfo = async (payload) => {
  const response = await axios.get(`${endpoint}/api/users/getuserinfo`, {
    headers: { authorization: payload.token },
  });
  return response.data;
};
export const googleCaptcha = async (payload) => {
  const response = await axios.post(`${endpoint}/api/users/verify`, payload);
  return response.data;
};

export const getCurrenSolPrice = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/users/getcurrensolprice`,
    payload
  );
  return response.data;
};

export const getPrivateKeys = async (payload) => {
  const response = await axios.get(`${endpoint}/api/users/privatekey`, {
    headers: { authorization: payload.token },
  });
  return response.data;
};

export const withdrawFund = async (payload) => {
  const response = await axios.post(`${endpoint}/api/users/withdraw`, payload);
  return response.data;
};
export const getUsersInfo = async (payload) => {
  const response = await axios.post(
    `${endpoint}/api/users/getusersinfo`,
    payload
  );
  return response.data;
};
