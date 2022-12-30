import axiosClient from "../axiosClient.js";

export const postcustomerInfo = (payload) => {
  const url = `/customer/create`;
  return axiosClient.post(url, payload);
};

export const getcustomerInfo = (id) => {
  const url = `/customer/get/${id}`;
  return axiosClient.get(url);
}

export const getListcustomer = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/customer/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatecustomerInfo = (payload, id) => {
  const url = `/customer/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountCustomer = () => {
  const url = `/getcustomer/count`;
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