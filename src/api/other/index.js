import axiosClient from "../axiosClient.js";

export const postOtherInfo = (payload) => {
  const url = `/other/create`;
  return axiosClient.post(url, payload);
};

export const getOtherInfo = (id) => {
  const url = `/other/get/${id}`;
  return axiosClient.get(url);
}