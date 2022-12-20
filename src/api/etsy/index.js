import axiosClient from "../axiosClient.js";

export const postetsyInfo = (payload) => {
  const url = `/etsy/create`;
  return axiosClient.post(url, payload);
};

export const getetsyInfo = (id) => {
  const url = `/etsy/get/${id}`;
  return axiosClient.get(url);
}

export const getListetsy = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/etsy/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateetsyInfo = (payload, id) => {
  const url = `/etsy/update?id=${id}`;
  return axiosClient.put(url, payload);
}

export const getCountEtsy = () => {
  const url = `/getetsy/count`;
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