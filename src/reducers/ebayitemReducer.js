import { GET_LIST_EBAYITEM_SUCCESS } from "../actions/ebayitemActions";

const initialState = {
  ebayitems: [],
  loading: false,
};

function ebayitemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_EBAYITEM_SUCCESS: {
      return {
        ...state,
        ebayitems: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default ebayitemReducer;