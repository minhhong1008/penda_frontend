import axiosClient from "../axiosClient.js";

export const postproxyInfo = (payload) => {
  const url = `/proxy/create`;
  return axiosClient.post(url, payload);
};

export const getproxyInfo = (id) => {
  const url = `/proxy/get/${id}`;
  return axiosClient.get(url);
}

export const getListproxy = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/proxy/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateproxyInfo = (payload, id) => {
  const url = `/proxy/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountProxy = () => {
  const url = `/getproxy/count`;
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