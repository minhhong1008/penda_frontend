import axiosClient from "../axiosClient.js";

export const postebayInfo = (payload) => {
  const url = `/ebay/create`;
  return axiosClient.post(url, payload);
};

export const getebayInfo = (id) => {
  const url = `/ebay/get/${id}`;
  return axiosClient.get(url);
}

export const getListebay = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/ebay/list?${queryString}`;
  return axiosClient.get(url);
}


export const getGologincare = () => {
  const url = `/ebay/Gologincare`;
  return axiosClient.get(url);
}

export const updateebayInfo = (payload, id) => {
  const url = `/ebay/update?id=${id}`;
  return axiosClient.put(url, payload);
}


export const getCountEbay = () => {
  const url = `/getebay/count`;
  return axiosClient.get(url);
}

export const searchEbayInfo = (text) => {
  const url = `/ebay/search?${genQueryString(text)}`;
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