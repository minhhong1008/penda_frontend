import axiosClient from "../axiosClient.js";

// axiosClient là thư viện js dùng để gọi http request ( gọi Ajax )
// url là 1 link tự đặt và nó === link tại routes , nên đặt link theo bảng nào truyền đến
export const createBlog = (blog) => {
  const url = `/blog/create`;
  return axiosClient.post(url, blog);
};

export const updateBlog = (blog) => {
  const url = `/blog/update`;
  return axiosClient.post(url, blog);
};

export const listBlog = (payload) => {
  const url = `/blog/list?${genQueryString(payload)}`;
  return axiosClient.get(url);
}

export const detailBlog = (id) => {
  const url = `/blog/content/${id}`;
  return axiosClient.get(url);
}

const genQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};