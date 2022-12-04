import axiosClient from "../axiosClient.js";

export const postAmazonInfo = (payload) => {
  const url = `/amazon/create`;
  return axiosClient.post(url, payload);
};

export const getAmazonInfo = (id) => {
  const url = `/amazon/get/${id}`;
  return axiosClient.get(url);
}