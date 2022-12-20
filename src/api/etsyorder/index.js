import axiosClient from "../axiosClient.js";

export const postetsyorderInfo = (payload) => {
  const url = `/etsyorder/create`;
  return axiosClient.post(url, payload);
};

export const getetsyorderInfo = (id) => {
  const url = `/etsyorder/get/${id}`;
  return axiosClient.get(url);
}

export const getListetsyorder = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/etsyorder/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateetsyorderInfo = (payload, id) => {
  const url = `/etsyorder/update?id=${id}`;
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