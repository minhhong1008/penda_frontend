import axiosClient from "../axiosClient.js";

export const postSimInfo = (payload) => {
  const url = `/sim/create`;
  return axiosClient.post(url, payload);
};

export const getSimInfo = (id) => {
  const url = `/sim/get/${id}`;
  return axiosClient.get(url);
}