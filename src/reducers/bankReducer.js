import { GET_LIST_BANK_SUCCESS } from "../actions/bankActions";

const initialState = {
  banks: [],
  loading: false,
};

function bankReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_BANK_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.bank_id
        })
      })
      return {
        ...state,
        banks: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default bankReducer;
