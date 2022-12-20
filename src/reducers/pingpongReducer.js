import { GET_LIST_PINGPONG_SUCCESS } from "../actions/pingpongActions";

const initialState = {
  pingpongs: [],
  loading: false,
};

function pingpongReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PINGPONG_SUCCESS: {
      return {
        ...state,
        pingpongs: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default pingpongReducer;