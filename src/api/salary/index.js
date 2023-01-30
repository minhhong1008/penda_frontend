import axiosClient from "../axiosClient";

export const getSalary = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/salary/list?${queryString}`;
  return axiosClient.get(url);
};

const genQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
