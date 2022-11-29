import {
  ADD_DEPARTMENT_FAIL,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_SUCCESS,
  GET_LIST_DEPARTMENT_FAIL,
  GET_LIST_DEPARTMENT_REQUEST,
  GET_LIST_DEPARTMENT_SUCCESS,
  REMOVE_DEPARTMENT_FAIL,
  REMOVE_DEPARTMENT_REQUEST,
  REMOVE_DEPARTMENT_SUCCESS,
} from "../actions/departmentActions";

const initialState = {
  listDepartment: [],
  loading: false,
  message: "",
};

function departmentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DEPARTMENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_LIST_DEPARTMENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REMOVE_DEPARTMENT_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case ADD_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        listDepartment: [...state.listDepartment, action.payload],
        loading: false,
      };
    }
    case REMOVE_DEPARTMENT_SUCCESS: {
      const newData = state.listDepartment.filter( item => item._id !== action.payload._id )
      return {
        ...state,
        listDepartment: newData,
        loading: false,
      };
    }
    case GET_LIST_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        listDepartment: action.payload,
        message: "",
      };
    }
    case REMOVE_DEPARTMENT_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case GET_LIST_DEPARTMENT_FAIL: {
      return {
        ...state,
        loading: false,
        listDepartment: [],
        message: action.payload,
      };
    }
    case ADD_DEPARTMENT_FAIL: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default departmentReducer;
