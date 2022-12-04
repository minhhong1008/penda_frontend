import axiosClient from "../axiosClient.js";

export const postPaypalInfo = (payload) => {
  const url = `/paypal/create`;
  return axiosClient.post(url, payload);
};

export const getPaypalInfo = (id) => {
  const url = `/paypal/get/${id}`;
  return axiosClient.get(url);
}