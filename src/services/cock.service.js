import axios from "axios";
const endpoint = import.meta.env.VITE_API_URL;

export const getCockData = async () => {
    const response = await axios.get(`${endpoint}/api/cocks/getcockinfo`);
    return response.data;
};