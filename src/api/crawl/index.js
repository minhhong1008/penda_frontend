import axiosClient from "../axiosClient.js";

export const CrawlApi = (payload) => {
  const url = `/crawl`;
  return axiosClient.post(url, payload);
};

export const Create = (newData) => {
  const url = `/crawl/create`;
  return axiosClient.post(url, newData);
};

const genQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
