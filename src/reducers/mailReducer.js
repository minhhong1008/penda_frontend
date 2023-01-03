import { GET_LIST_MAIL_SUCCESS } from "../actions/mailActions";

const initialState = {
  mails: [],
  loading: false,
};

function mailReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_MAIL_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.mail_id
        })
      })
      return {
        ...state,
        mails: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default mailReducer;