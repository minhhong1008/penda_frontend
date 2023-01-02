import axiosClient from "../axiosClient.js";

// axiosClient là thư viện js dùng để gọi http request ( gọi Ajax )

export const createBill = (bill) => {
  const url = `/bill/create`;
  return axiosClient.post(url, bill);
}

export const updateBill = (bill) => {
  const url = `/billadsds/upate`;
  return axiosClient.post(url, bill);
}

export const getPayAndCollect = () => {
  const url = `/bill/pay_collect`;
  return axiosClient.get(url);
}

export const getListBill = (payload) => {
  const url = `/bill/list_table?${genQueryString(payload)}`;
  return axiosClient.get(url);
}

export const postBillUpdate = (bill) => {
  const url = `/bill/update`;
  return axiosClient.post(url, bill);
} 

const genQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}