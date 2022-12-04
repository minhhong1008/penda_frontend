import axiosClient from "../axiosClient.js";

export const postEbayInfo = (payload) => {
  const url = `/ebay/create`;
  return axiosClient.post(url, payload);
};

export const getEbayInfo = (id) => {
  const url = `/ebay/get/${id}`;
  return axiosClient.get(url);
}

export const getListEbay = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/ebay/list?${queryString}`;
  return axiosClient.get(url);
}

export const updateEbayInfo = (payload, id) => {
  const url = `/ebay/update?id=${id}`;
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