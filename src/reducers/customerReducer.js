import { GET_LIST_CUSTOMER_SUCCESS } from "../actions/customerActions";

const initialState = {
  customers: [],
  loading: false,
};

function customerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_CUSTOMER_SUCCESS: {
      return {
        ...state,
        customers: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default customerReducer;