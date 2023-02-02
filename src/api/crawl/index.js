import axiosClient from "../axiosClient.js";

export const CrawlApi = (payload) => {
  const url = `/crawl`;
  return axiosClient.post(url, payload);
};

