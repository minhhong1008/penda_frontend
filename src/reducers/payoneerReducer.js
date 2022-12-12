import { GET_LIST_PAYONEER_SUCCESS } from "../actions/payoneerActions";

const initialState = {
  payoneers: [],
  loading: false,
};

function payoneerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PAYONEER_SUCCESS: {
      return {
        ...state,
        payoneers: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default payoneerReducer;