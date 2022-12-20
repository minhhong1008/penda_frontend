import { GET_LIST_EBAYORDER_SUCCESS } from "../actions/ebayorderActions";

const initialState = {
  ebayorders: [],
  loading: false,
};

function ebayorderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_EBAYORDER_SUCCESS: {
      return {
        ...state,
        ebayorders: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default ebayorderReducer;