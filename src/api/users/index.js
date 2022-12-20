import axiosClient from "../axiosClient.js";

export const postusersInfo = (payload) => {
  const url = `/users/create`;
  return axiosClient.post(url, payload);
};

export const getusersInfo = (id) => {
  const url = `/users/get/${id}`;
  return axiosClient.get(url);
}

export const getListusers = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/users/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateusersInfo = (payload, id) => {
  const url = `/users/update?id=${id}`;
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