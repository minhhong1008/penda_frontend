import { GET_LIST_PROXY_SUCCESS } from "../actions/proxyActions";

const initialState = {
  proxys: [],
  loading: false,
};

function proxyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PROXY_SUCCESS: {
      let newEbay = [];
      action?.payload?.map((item) => {
        newEbay.push({
          ...item,
          key: item?.proxy_id,
        });
      });
      return {
        ...state,
        proxys: newEbay,
      };
    
    }
    default: {
      return state;
    }
  }
}

export default proxyReducer;