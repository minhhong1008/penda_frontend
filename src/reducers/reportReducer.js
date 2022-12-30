import { GET_LIST_REPORT_SUCCESS } from "../actions/reportActions";

const initialState = {
  reports: [],
  loading: false,
};

function reportReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_REPORT_SUCCESS: {
      return {
        ...state,
        reports: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default reportReducer;