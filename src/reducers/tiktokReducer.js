import { GET_LIST_TIKTOK_SUCCESS } from "../actions/tiktokActions";

const initialState = {
  tiktoks: [],
  loading: false,
};

function tiktokReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_TIKTOK_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.tiktok_id
        })
      })
      return {
        ...state,
        tiktoks: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default tiktokReducer;
