import axiosClient from "../axiosClient.js";

export const createData = (payload, type) => {
  const url = `/create?type=${type}`;
  return axiosClient.post(url, payload);
};