import axiosClient from "../axiosClient.js";

export const postmailInfo = (payload) => {
  const url = `/mail/create`;
  return axiosClient.post(url, payload);
};

export const getmailInfo = (id) => {
  const url = `/mail/get/${id}`;
  return axiosClient.get(url);
}

export const getListmail = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/mail/list?${queryString}`;
  return axiosClient.get(url);
}


export const updatemailInfo = (payload, id) => {
  const url = `/mail/update?id=${id}`;
  return axiosClient.put(url, payload);
}

export const updatmailWork = (payload) => {
  const url = `/mail/updatmailWork`;
  return axiosClient.put(url, payload);
}

export const getListmailWork = (payload) => {
  let queryString = genQueryString(payload);
  const url = `/mail/listmailWork?${queryString}`;
  return axiosClient.get(url);
}


export const getCountMail = () => {
  const url = `/getmail/count`;
  return axiosClient.get(url);
}

export const searchMailInfo = (text) => {
  const url = `/mail/search?${genQueryString(text)}`;
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