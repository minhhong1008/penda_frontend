import { GET_LIST_USER_FAIL, GET_LIST_USER_REQUEST, GET_LIST_USER_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_RPOFILE_FAIL, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS } from '../actions/userActions'

const initialState = {
  profile: null,
  listUser: [],
  message: '',
  loading: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_LIST_USER_REQUEST: {
      console.log('run1');
      return {
        ...state,
        loading: true,
      }
    }
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      }
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        loading: false,
      }
    }
    case GET_LIST_USER_SUCCESS: {
      console.log('run2');

      return {
        ...state,
        listUser: action.payload,
        loading: false,
      }
    }
    case GET_LIST_USER_FAIL: {
      return{
        ...state,
        listUser: [],
        message: action.payload,
        loading: false,
      }
    }
    case UPDATE_PROFILE_FAIL: {
      return {
        ...state,
        profile: null,
        message: action.payload,
        loading: false,
      }
    }
    case GET_RPOFILE_FAIL: {
      return {
        ...state,
        profile: null,
        message: action.payload,
        loading: false,
      }
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
