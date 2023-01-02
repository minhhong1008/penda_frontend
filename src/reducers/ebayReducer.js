import { GET_LIST_EBAY_SUCCESS } from "../actions/ebayActions";

const initialState = {
  ebays: [],
  loading: false,
};

function ebayReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_EBAY_SUCCESS: {
      let newEbay = [];
      action?.payload?.map((item) => {
        newEbay.push({
          ...item,
          key: item?.ebay_id
        })
      })
      return {
        ...state,
        ebays: newEbay,
      };
    }
    default: {
      return state;
    }
  }
}

export default ebayReducer;
