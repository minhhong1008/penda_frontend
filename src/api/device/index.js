import axiosClient from "../axiosClient.js";

export const postdeviceInfo = (payload) => {
  const url = `/device/create`;
  return axiosClient.post(url, payload);
};

export const getdeviceInfo = (id) => {
  const url = `/device/get/${id}`;
  return axiosClient.get(url);
}