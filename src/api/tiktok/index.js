import axiosClient from "../axiosClient.js";

export const posttiktokInfo = (payload) => {
  const url = `/tiktok/create`;
  return axiosClient.post(url, payload);
};

export const gettiktokInfo = (id) => {
  const url = `/tiktok/get/${id}`;
  return axiosClient.get(url);
}

export const getListtiktok = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/tiktok/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatetiktokInfo = (payload, id) => {
  const url = `/tiktok/update?id=${id}`;
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