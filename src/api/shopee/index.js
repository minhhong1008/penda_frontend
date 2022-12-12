import axiosClient from "../axiosClient.js";

export const postshopeeInfo = (payload) => {
  const url = `/shopee/create`;
  return axiosClient.post(url, payload);
};

export const getshopeeInfo = (id) => {
  const url = `/shopee/get/${id}`;
  return axiosClient.get(url);
}

export const getListshopee = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/shopee/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateshopeeInfo = (payload, id) => {
  const url = `/shopee/update?id=${id}`;
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