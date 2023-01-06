import { GET_LIST_project_SUCCESS } from "../actions/projectActions";

const initialState = {
  projects: [],
  loading: false,
};

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_project_SUCCESS: {
      return {
        ...state,
        projects: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default projectReducer;
