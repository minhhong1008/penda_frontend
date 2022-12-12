import { GET_LIST_FACEBOOK_SUCCESS } from "../actions/facebookActions";

const initialState = {
  facebooks: [],
  loading: false,
};

function facebookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_FACEBOOK_SUCCESS: {
      return {
        ...state,
        facebooks: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default facebookReducer;
