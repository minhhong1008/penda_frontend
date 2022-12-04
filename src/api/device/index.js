import axiosClient from "../axiosClient.js";

export const postDeviceInfo = (payload) => {
  const url = `/device/create`;
  return axiosClient.post(url, payload);
};

export const getDeviceInfo = (id) => {
  const url = `/device/get/${id}`;
  return axiosClient.get(url);
}