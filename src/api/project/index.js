import axiosClient from "../axiosClient.js";

export const postprojectInfo = (payload) => {
  const url = `/project/create`;
  return axiosClient.post(url, payload);
};

export const getprojectInfo = (id) => {
  const url = `/project/get/${id}`;
  return axiosClient.get(url);
}

export const getListproject = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/project/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateprojectInfo = (payload, id) => {
  const url = `/project/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountProject = () => {
  const url = `/getproject/count`;
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