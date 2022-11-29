import axiosClient from "../axiosClient.js";

export const addDepartmentApi = (payload) => {
  return axiosClient.post("/department", payload);
};

export const getListDepartmentApi = () => {
  return axiosClient.get("/departments");
};

export const removeDepartmentApi = (payload) => {
  return axiosClient.post("/department/remove", payload);
};
