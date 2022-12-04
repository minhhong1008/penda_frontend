import axios from 'axios';

const BASE_URL = "http://localhost:4000/api";

const axiosClient = axios.create({
  baseURL: BASE_URL
});

axiosClient.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default axiosClient;