import axiosClient from "../axiosClient.js";

export const postmailInfo = (payload) => {
  const url = `/mail/create`;
  return axiosClient.post(url, payload);
};

export const getmailInfo = (id) => {
  const url = `/mail/get/${id}`;
  return axiosClient.get(url);
}