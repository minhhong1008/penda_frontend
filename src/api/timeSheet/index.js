import axiosClient from "../axiosClient.js";

export const createSession = (payload) => {
  const url = `/timeSheet/create`;
  return axiosClient.post(url, payload);
};

export const createVerifySession = (payload) => {
  console.log(payload)
  const url = `/timeSheet/createverify`;
  return axiosClient.post(url, payload);
};

export const get_Timesheets_table = (payload) => {
  const url = `/timeSheet/list?${genQueryString(payload)}`
  return axiosClient.get(url);
}

export const getcheckSessions = (payload) => {
  const url = `/timeSheet/getcheck?${genQueryString(payload)}`
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