import axiosClient from "../axiosClient.js";

export const postbankInfo = (payload) => {
  const url = `/bank/create`;
  return axiosClient.post(url, payload);
};

export const getbankInfo = (id) => {
  const url = `/bank/get/${id}`;
  return axiosClient.get(url);
}

export const getListbank = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/bank/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatebankInfo = (payload, id) => {
  const url = `/bank/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountBank = () => {
  const url = `/getbank/count`;
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