import { GET_LIST_SHOPEE_SUCCESS } from "../actions/shopeeActions";

const initialState = {
  shopees: [],
  loading: false,
};

function shopeeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_SHOPEE_SUCCESS: {
      return {
        ...state,
        shopees: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default shopeeReducer;