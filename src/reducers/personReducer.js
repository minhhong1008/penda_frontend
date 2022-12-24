import { GET_LIST_PERSON_SUCCESS } from "../actions/personActions";

const initialState = {
  persons: [],
  loading: false,
};

function personReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PERSON_SUCCESS: {
      return {
        ...state,
        persons: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default personReducer;
