import axiosClient from "../axiosClient.js";

export const postsimInfo = (payload) => {
  const url = `/sim/create`;
  return axiosClient.post(url, payload);
};

export const getsimInfo = (id) => {
  const url = `/sim/get/${id}`;
  return axiosClient.get(url);
}

export const getListsim = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/sim/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatesimInfo = (payload, id) => {
  const url = `/sim/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountSim = () => {
  const url = `/getsim/count`;
  return axiosClient.get(url);
}

export const searchSimInfo = (text) => {
  const url = `/sim/search?${genQueryString(text)}`;
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