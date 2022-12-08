import { GET_LIST_ETSY_SUCCESS } from "../actions/etsyActions";

const initialState = {
  etsys: [],
  loading: false,
};

function etsyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ETSY_SUCCESS: {
      return {
        ...state,
        etsys: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default etsyReducer;
