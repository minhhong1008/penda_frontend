import { GET_LIST_TIKTOK_SUCCESS } from "../actions/tiktokActions";

const initialState = {
  tiktoks: [],
  loading: false,
};

function tiktokReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_TIKTOK_SUCCESS: {
      return {
        ...state,
        tiktoks: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default tiktokReducer;
