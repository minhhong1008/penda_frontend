import axiosClient from "../axiosClient.js";

export const postpayoneerInfo = (payload) => {
  const url = `/payoneer/create`;
  return axiosClient.post(url, payload);
};

export const getpayoneerInfo = (id) => {
  const url = `/payoneer/get/${id}`;
  return axiosClient.get(url);
}

export const getListpayoneer = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/payoneer/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatepayoneerInfo = (payload, id) => {
  const url = `/payoneer/update?id=${id}`;
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