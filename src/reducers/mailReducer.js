import { GET_LIST_MAIL_SUCCESS } from "../actions/mailActions";

const initialState = {
  mails: [],
  loading: false,
};

function mailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_MAIL_SUCCESS: {
      return {
        ...state,
        mails: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default mailReducer;