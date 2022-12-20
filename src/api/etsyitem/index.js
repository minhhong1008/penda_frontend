import axiosClient from "../axiosClient.js";

export const postetsyitemInfo = (payload) => {
  const url = `/etsyitem/create`;
  return axiosClient.post(url, payload);
};

export const getetsyitemInfo = (id) => {
  const url = `/etsyitem/get/${id}`;
  return axiosClient.get(url);
}

export const getListetsyitem = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/etsyitem/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateetsyitemInfo = (payload, id) => {
  const url = `/etsyitem/update?id=${id}`;
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