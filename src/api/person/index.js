import axiosClient from "../axiosClient.js";

export const postpersonInfo = (payload) => {
  const url = `/person/create`;
  return axiosClient.post(url, payload);
};

export const getpersonInfo = (id) => {
  const url = `/person/get/${id}`;
  return axiosClient.get(url);
}

export const getListperson = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/person/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatepersonInfo = (payload, id) => {
  const url = `/person/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountPerson = () => {
  const url = `/getperson/count`;
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