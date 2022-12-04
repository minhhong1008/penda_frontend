import axiosClient from "../axiosClient.js";

export const postInfoInfo = (payload) => {
  const url = `/info/create`;
  return axiosClient.post(url, payload);
};

export const getInfoInfo = (id) => {
  const url = `/info/get/${id}`;
  return axiosClient.get(url);
}