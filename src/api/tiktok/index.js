import axiosClient from "../axiosClient.js";

export const postTiktokInfo = (payload) => {
  const url = `/tiktok/create`;
  return axiosClient.post(url, payload);
};

export const getTiktokInfo = (id) => {
  const url = `/tiktok/get/${id}`;
  return axiosClient.get(url);
}