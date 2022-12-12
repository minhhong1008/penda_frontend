import { GET_LIST_PAYPAL_SUCCESS } from "../actions/paypalActions";

const initialState = {
  paypals: [],
  loading: false,
};

function paypalReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PAYPAL_SUCCESS: {
      return {
        ...state,
        paypals: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default paypalReducer;