import { GET_LIST_INFO_SUCCESS } from "../actions/infoActions";

const initialState = {
  infos: [],
  loading: false,
};

function infoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_INFO_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.info_id
        })
      })
      return {
        ...state,
        infos: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default infoReducer;
