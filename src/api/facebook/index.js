import axiosClient from "../axiosClient.js";

export const postfacebookInfo = (payload) => {
  const url = `/facebook/create`;
  return axiosClient.post(url, payload);
};

export const getfacebookInfo = (id) => {
  const url = `/facebook/get/${id}`;
  return axiosClient.get(url);
}

export const getListfacebook = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/facebook/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatefacebookInfo = (payload, id) => {
  const url = `/facebook/update?id=${id}`;
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