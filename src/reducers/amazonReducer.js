import { GET_LIST_AMAZON_SUCCESS } from "../actions/amazonActions";

const initialState = {
  amazons: [],
  loading: false,
};

function amazonReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_AMAZON_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.amazon_id
        })
      })
      return {
        ...state,
        amazons: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default amazonReducer;
