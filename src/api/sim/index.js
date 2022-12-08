import axiosClient from "../axiosClient.js";

export const postsimInfo = (payload) => {
  const url = `/sim/create`;
  return axiosClient.post(url, payload);
};

export const getsimInfo = (id) => {
  const url = `/sim/get/${id}`;
  return axiosClient.get(url);
}