import { GET_LIST_BANK_SUCCESS } from "../actions/bankActions";

const initialState = {
  banks: [],
  loading: false,
};

function bankReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_BANK_SUCCESS: {
      return {
        ...state,
        banks: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default bankReducer;
