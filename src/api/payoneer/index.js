import axiosClient from "../axiosClient.js";

export const postPayoneerInfo = (payload) => {
  const url = `/payoneer/create`;
  return axiosClient.post(url, payload);
};

export const getPayoneerInfo = (id) => {
  const url = `/payoneer/get/${id}`;
  return axiosClient.get(url);
}