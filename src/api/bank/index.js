import axiosClient from "../axiosClient.js";

export const postbankInfo = (payload) => {
  const url = `/bank/create`;
  return axiosClient.post(url, payload);
};

export const getbankInfo = (id) => {
  const url = `/bank/get/${id}`;
  return axiosClient.get(url);
}