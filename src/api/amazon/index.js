import axiosClient from "../axiosClient.js";

export const postamazonInfo = (payload) => {
  const url = `/amazon/create`;
  return axiosClient.post(url, payload);
};

export const getamazonInfo = (id) => {
  const url = `/amazon/get/${id}`;
  return axiosClient.get(url);
}

export const getListamazon = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/amazon/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateamazonInfo = (payload, id) => {
  const url = `/amazon/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountAmazon = () => {
  const url = `/getamazon/count`;
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