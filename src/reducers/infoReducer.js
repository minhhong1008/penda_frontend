import { GET_LIST_INFO_SUCCESS } from "../actions/infoActions";

const initialState = {
  infos: [],
  loading: false,
};

function infoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_INFO_SUCCESS: {
      return {
        ...state,
        infos: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default infoReducer;
