import axiosClient from "../axiosClient.js";

export const postBankInfo = (payload) => {
  const url = `/bank/create`;
  return axiosClient.post(url, payload);
};

export const getBankInfo = (id) => {
  const url = `/bank/get/${id}`;
  return axiosClient.get(url);
}