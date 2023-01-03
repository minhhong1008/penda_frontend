import { GET_LIST_ETSY_SUCCESS } from "../actions/etsyActions";

const initialState = {
  etsys: [],
  loading: false,
};

function etsyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ETSY_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.etsy_id
        })
      })
      return {
        ...state,
        etsys: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default etsyReducer;
