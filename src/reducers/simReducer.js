import { GET_LIST_SIM_SUCCESS } from "../actions/simActions";

const initialState = {
  sims: [],
  loading: false,
};

function simReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_SIM_SUCCESS: {
      return {
        ...state,
        sims: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default simReducer;
