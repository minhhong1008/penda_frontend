import { GET_LIST_ETSYORDER_SUCCESS } from "../actions/etsyorderActions";

const initialState = {
  etsyorders: [],
  loading: false,
};

function etsyorderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ETSYORDER_SUCCESS: {
      return {
        ...state,
        etsyorders: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default etsyorderReducer;