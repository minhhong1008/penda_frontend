import axiosClient from "../axiosClient.js";

export const registerApi = (payload) => {
  return axiosClient.post('/signup', payload);
};

export const loginApi = (payload) => {
  return axiosClient.post('/signin', payload);
};

export const verifyToken = (payload) => {
  return axiosClient.post('/verify', payload)
}
