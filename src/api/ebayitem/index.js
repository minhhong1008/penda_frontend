import axiosClient from "../axiosClient.js";

export const postebayitemInfo = (payload) => {
  const url = `/ebayitem/create`;
  return axiosClient.post(url, payload);
};

export const getebayitemInfo = (id) => {
  const url = `/ebayitem/get/${id}`;
  return axiosClient.get(url);
}

export const getListebayitem = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/ebayitem/list?${queryString}`;
  return axiosClient.get(url);
}


export const updateebayitemInfo = (payload, id) => {
  const url = `/ebayitem/update?id=${id}`;
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