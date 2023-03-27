import axiosClient from "../axiosClient.js";


export const getGologincare = () => {
  const url = `/Auto/Gologincare`;
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