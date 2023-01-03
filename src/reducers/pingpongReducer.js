import { GET_LIST_PINGPONG_SUCCESS } from "../actions/pingpongActions";

const initialState = {
  pingpongs: [],
  loading: false,
};

function pingpongReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PINGPONG_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.pingpong_id
        })
      })
      return {
        ...state,
        pingpongs: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default pingpongReducer;