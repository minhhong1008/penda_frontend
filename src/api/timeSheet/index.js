import axiosClient from "../axiosClient.js";

export const createSession = (payload) => {
  const url = `/timeSheet/create`;
  return axiosClient.post(url, payload);
};

export const getSessions = (payload) => {
  const url = `/timeSheet/list?${genQueryString(payload)}`
  return axiosClient.get(url);
}


const genQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}