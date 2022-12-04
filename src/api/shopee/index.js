import axiosClient from "../axiosClient.js";

export const postShopeeInfo = (payload) => {
  const url = `/shopee/create`;
  return axiosClient.post(url, payload);
};

export const getShopeeInfo = (id) => {
  const url = `/shopee/get/${id}`;
  return axiosClient.get(url);
}