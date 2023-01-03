import { GET_LIST_PAYPAL_SUCCESS } from "../actions/paypalActions";

const initialState = {
  paypals: [],
  loading: false,
};

function paypalReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PAYPAL_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.paypal_id
        })
      })
      return {
        ...state,
        paypals: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default paypalReducer;