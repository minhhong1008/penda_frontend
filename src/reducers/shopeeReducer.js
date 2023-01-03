import { GET_LIST_SHOPEE_SUCCESS } from "../actions/shopeeActions";

const initialState = {
  shopees: [],
  loading: false,
};

function shopeeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_SHOPEE_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.shopee_id
        })
      })
      return {
        ...state,
        shopees: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default shopeeReducer;