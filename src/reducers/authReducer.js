import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  GET_ROLE_SUCCESS,
} from "../actions/authActions.js";
import { getUser } from "../utils/index.js";

const initialState = {
  profile: JSON.parse(getUser()),
  isLogin: false,
  users_name: "",
  users_function: "",
  users_owner: "",
  manage_view: "",
  loading: false,
  message: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        profile: action.payload,
        users_function: action.payload.users_function,
        users_name: action.payload.users_name,
        isLogin: true,
        loading: false,
        message: "",
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        profile: null,
        isLogin: false,
        loading: false,
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        profile: null,
        isLogin: false,
        loading: false,
      };
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        isLogin: false,
        message: action.payload,
        loading: false,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        isLogin: false,
        message: action.payload,
        loading: false,
      };
    }

    case GET_ROLE_SUCCESS: {
      return {
        ...state,
        users_function: action.payload.users_function,
        users_name: action.payload.users_name,
        users_owner: action.payload.users_owner,
        manage_view: action.payload.manage_view,
      }
    }
    default: {
      return state;
    }
  }
}

export default authReducer;
