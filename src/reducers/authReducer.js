import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGIN_REQUEST,
} from "../actions/authActions.js";
import { getUser } from "../utils/index.js";

const initialState = {
  profile: JSON.parse(getUser()),
  isLogin: false,
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
    default: {
      return state;
    }
  }
}

export default authReducer;
