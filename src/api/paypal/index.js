import axiosClient from "../axiosClient.js";

export const postpaypalInfo = (payload) => {
  const url = `/paypal/create`;
  return axiosClient.post(url, payload);
};

export const getpaypalInfo = (id) => {
  const url = `/paypal/get/${id}`;
  return axiosClient.get(url);
}

export const getListpaypal = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/paypal/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatepaypalInfo = (payload, id) => {
  const url = `/paypal/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountPaypal = () => {
  const url = `/getpaypal/count`;
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