
import axiosClient from "../axiosClient.js";

export const postebayorderInfo = (payload) => {
  const url = `/ebayorder/create`;
  return axiosClient.post(url, payload);
};

export const getebayorderInfo = (id) => {
  const url = `/ebayorder/get/${id}`;
  return axiosClient.get(url);
}

export const getListebayorder = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/ebayorder/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateebayorderInfo = (payload, id) => {
  const url = `/ebayorder/update?id=${id}`;
  return axiosClient.put(url, payload);
}

const genQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}