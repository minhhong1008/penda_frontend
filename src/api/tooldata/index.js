import axios from "axios";
import axiosClient from "../axiosClient.js";

export const createData = (payload, type) => {
  const url = `/tooldata_create?type=${type}`;
  return axiosClient.post(url, payload);
};

export const getEmployee = () => {
  const url = `/tooldata_get`;
  return axiosClient.get(url);
}
