import { GET_LIST_AMAZON_SUCCESS } from "../actions/amazonActions";

const initialState = {
  amazons: [],
  loading: false,
};

function amazonReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_AMAZON_SUCCESS: {
      return {
        ...state,
        amazons: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default amazonReducer;
