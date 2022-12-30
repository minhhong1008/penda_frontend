import { GET_LIST_BILL_SUCCESS } from "../actions/billActions";

const initialState = {
  bills: [],
  loading: false,
};

function billReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_BILL_SUCCESS: {
      return {
        ...state,
        bills: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default billReducer;