import Swal from "sweetalert2";

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  showSuccess("Copy: " + text);
}

export const createActionTypes = (base, actions = []) =>
  actions.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;

    return acc;
  }, {});


export const showSuccess = ( message ) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: message
  })
}

export const showError = ( message ) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: message
  })
}

export const setToken = ( value ) => {
  localStorage.setItem('token', value);
}

export const setUser = ( value ) => {
  localStorage.setItem('user', value);
}

export const getToken = () => {
  return localStorage.getItem('token');
}

export const getUser = () => {
  return localStorage.getItem('user');
}

export const removeUser = () => {
  localStorage.removeItem('user');
}

export const removeToken = () => {
  localStorage.removeItem('token')
}