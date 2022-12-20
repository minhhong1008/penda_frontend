import axiosClient from "../axiosClient.js";

export const postpingpongInfo = (payload) => {
  const url = `/pingpong/create`;
  return axiosClient.post(url, payload);
};

export const getpingpongInfo = (id) => {
  const url = `/pingpong/get/${id}`;
  return axiosClient.get(url);
}

export const getListpingpong = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/pingpong/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatepingpongInfo = (payload, id) => {
  const url = `/pingpong/update?id=${id}`;
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