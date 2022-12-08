import axiosClient from "../axiosClient.js";

export const postpayoneerInfo = (payload) => {
  const url = `/payoneer/create`;
  return axiosClient.post(url, payload);
};

export const getpayoneerInfo = (id) => {
  const url = `/payoneer/get/${id}`;
  return axiosClient.get(url);
}