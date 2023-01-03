import { GET_LIST_PAYONEER_SUCCESS } from "../actions/payoneerActions";

const initialState = {
  payoneers: [],
  loading: false,
};

function payoneerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PAYONEER_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.payoneer_id
        })
      })
      return {
        ...state,
        payoneers: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default payoneerReducer;