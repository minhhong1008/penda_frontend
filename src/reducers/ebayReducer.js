import { GET_LIST_EBAY_SUCCESS } from "../actions/ebayActions";

const initialState = {
  ebays: [],
  loading: false,
};

function ebayReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_EBAY_SUCCESS: {
      return {
        ...state,
        ebays: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default ebayReducer;
