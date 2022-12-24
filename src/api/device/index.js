import axiosClient from "../axiosClient.js";

export const postdeviceInfo = (payload) => {
  const url = `/device/create`;
  return axiosClient.post(url, payload);
};

export const getdeviceInfo = (id) => {
  const url = `/device/get/${id}`;
  return axiosClient.get(url);
}

export const getListdevice = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/device/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatedeviceInfo = (payload, id) => {
  const url = `/device/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountDevice = () => {
  const url = `/getdevice/count`;
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