import { GET_LIST_ETSYITEM_SUCCESS } from "../actions/etsyitemActions";

const initialState = {
  etsyitems: [],
  loading: false,
};

function etsyitemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ETSYITEM_SUCCESS: {
      return {
        ...state,
        etsyitems: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default etsyitemReducer;
