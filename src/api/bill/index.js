import axiosClient from "../axiosClient.js";

// axiosClient là thư viện js dùng để gọi http request ( gọi Ajax )
// url là 1 link tự đặt và nó === link tại routes , nên đặt link theo bảng nào truyền đến
export const Create = (newData) => {
  const url = `/bill_class/create`;
  return axiosClient.post(url, newData);
};
export const getPayAndCollect = (payload) => {
  const url = `/bill_class/pay_collect?${genQueryString(payload)}`;
  return axiosClient.get(url);
};

export const postBillUpdate = (newData) => {
  const url = `/bill_table/update`;
  return axiosClient.post(url, newData);
};

export const getListBill = (payload) => {
  const url = `/bill_table/list_table?${genQueryString(payload)}`;
  return axiosClient.get(url);
};

export const updateBill = (bill) => {
  const url = `/billadsds/upate`;
  return axiosClient.post(url, bill);
};

export const getEmployee = () => {
  const url = `/bill/getemployee`;
  return axiosClient.get(url);
};

const genQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
