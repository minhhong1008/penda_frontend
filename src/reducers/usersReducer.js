import { GET_LIST_USERS_SUCCESS } from "../actions/usersActions";

const initialState = {
  userss: [],
  loading: false,
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_USERS_SUCCESS: {
      return {
        ...state,
        userss: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default usersReducer;