export const GET_LIST_DEPARTMENT_REQUEST = "GET_LIST_DEPARTMENT_REQUEST";
export const GET_LIST_DEPARTMENT_SUCCESS = "GET_LIST_DEPARTMENT_SUCCESS";
export const GET_LIST_DEPARTMENT_FAIL = "GET_LIST_DEPARTMENT_FAIL";

export const ADD_DEPARTMENT_REQUEST = "ADD_DEPARTMENT_REQUEST";
export const ADD_DEPARTMENT_SUCCESS = "ADD_DEPARTMENT_SUCCESS";
export const ADD_DEPARTMENT_FAIL = "ADD_DEPARTMENT_FAIL";

export const REMOVE_DEPARTMENT_REQUEST = "REMOVE_DEPARTMENT_REQUEST";
export const REMOVE_DEPARTMENT_SUCCESS = "REMOVE_DEPARTMENT_SUCCESS";
export const REMOVE_DEPARTMENT_FAIL = "REMOVE_DEPARTMENT_FAIL";

export const addDepartmentAction = (payload) => {
  return {
    type: ADD_DEPARTMENT_REQUEST,
    payload: payload,
  };
};

export const getListDepartmentAction = () => {
  return {
    type: GET_LIST_DEPARTMENT_REQUEST,
  };
};

export const removeDepartmentAction = (payload) => {
    return {
        type: REMOVE_DEPARTMENT_REQUEST,
        payload: payload,
    }
};
