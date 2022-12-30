import axiosClient from "../axiosClient.js";


export const getreportInfo = (id) => {
  const url = `/report/get/${id}`;
  return axiosClient.get(url);
}

export const getListreport = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/report/list?${queryString}`;
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