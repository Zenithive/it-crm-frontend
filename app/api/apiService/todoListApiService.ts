import axios from "axios";

export const getApiData = async () => {
  const response = await axios.get("http://localhost:3000/api/some");
  return response.data;
};