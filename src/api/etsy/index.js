import axiosClient from "../axiosClient.js";

export const postEtsyInfo = (payload) => {
  const url = `/etsy/create`;
  return axiosClient.post(url, payload);
};

export const getEtsyInfo = (id) => {
  const url = `/etsy/get/${id}`;
  return axiosClient.get(url);
}