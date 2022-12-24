import axiosClient from "../axiosClient.js";

export const updateListView = (id, field, value) => {
  let type = field.split("_")[0];
  if(type=="device"){
    if(field =="device_class"){
        return;
    }
    
  }
  let url,
    payload = {};
  url = `/${type}/update?id=${id}`;
  payload[field] = value;
  return axiosClient.put(url, payload);
};
