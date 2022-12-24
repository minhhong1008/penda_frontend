import axiosClient from "../axiosClient.js";

export const postinfoInfo = (payload) => {
  const url = `/info/create`;
  return axiosClient.post(url, payload);
};

export const getinfoInfo = (id) => {
  const url = `/info/get/${id}`;
  return axiosClient.get(url);
}

export const getListinfo = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/info/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateinfoInfo = (payload, id) => {
  const url = `/info/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountInfo = () => {
  const url = `/getinfo/count`;
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