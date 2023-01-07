import Swal from "sweetalert2";

export const randomStr = (l) => {
  var text = "";
  var char_list =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < l; i++) {
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return text;
};

export const copyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
  showSuccess("Copy: "+ "\n" + text);
};

export const createActionTypes = (base, actions = []) =>
  actions.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;

    return acc;
  }, {});

export const showSuccess = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 600,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const showError = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: message,
  });
};

export const setToken = (value) => {
  localStorage.setItem("token", value);
};

export const setUser = (value) => {
  localStorage.setItem("user", value);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  return localStorage.getItem("user");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

