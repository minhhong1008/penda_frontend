import { GET_LIST_PROXY_SUCCESS } from "../actions/proxyActions";

const initialState = {
  proxys: [],
  loading: false,
};

function proxyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PROXY_SUCCESS: {
      return {
        ...state,
        proxys: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default proxyReducer;