import axiosClient from "../axiosClient.js";
// dùng để update class và status của các tài khoản khác trong Ebay_info ngay tại page Ebay_info
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
