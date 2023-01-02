import axiosClient from "../axiosClient.js";

export const getProfileApi = (id) => {
  const url = `/user/${id}`;
  return axiosClient.get(url);
};

export const updateProfileApi = (payload) => {
  const url = `/user/${payload._id}`;
  return axiosClient.put(url, payload.values);
};

export const getListUser = (id) => {
  const url = `/users/${id}`;
  return axiosClient.get(url);
}


export const getListusers_timesheets = (payload) => {
  
  const url = `/users/list_timesheets`;
  return axiosClient.get(url);
}