import axios from "axios";

export const dashboardTaskApi = async () => {
  const response = await axios.get("api-endpoint");
  return response.data;
};

export const dashboardFollowupApi = async () => {
  const response = await axios.get("api-endpoint");
  return response.data;
};

export const dashboardMeetingsApi = async () => {
  const response = await axios.get("api-endpoint");
  return response.data;
};

export const dashboardRecentApi = async () => {
  const response = await axios.get("api-endpoint");
  return response.data;
};

export const dashboardUnreadMessagesApi = async () => {
  const response = await axios.get("api-endpoint");
  return response.data;
};

export const dashboardTotalLeadApi = async () => {
  const response = await axios.get("api-endpoint");
  return response.data;
};

export const dashboardTotalLeadLineApi = async () => {
  const response = await axios.get("api-endpoint");
  return response.data;
};
