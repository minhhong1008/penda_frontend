import axiosClient from "../axiosClient.js";

export const postMailInfo = (payload) => {
  const url = `/mail/create`;
  return axiosClient.post(url, payload);
};

export const getMailInfo = (id) => {
  const url = `/mail/get/${id}`;
  return axiosClient.get(url);
}