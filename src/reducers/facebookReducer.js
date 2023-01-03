import { GET_LIST_FACEBOOK_SUCCESS } from "../actions/facebookActions";

const initialState = {
  facebooks: [],
  loading: false,
};

function facebookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_FACEBOOK_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.facebook_id
        })
      })
      return {
        ...state,
        facebooks: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default facebookReducer;
