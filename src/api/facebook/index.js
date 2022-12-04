import axiosClient from "../axiosClient.js";

export const postFacebookInfo = (payload) => {
  const url = `/facebook/create`;
  return axiosClient.post(url, payload);
};

export const getFacebookInfo = (id) => {
  const url = `/facebook/get/${id}`;
  return axiosClient.get(url);
}