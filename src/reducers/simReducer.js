import { GET_LIST_SIM_SUCCESS } from "../actions/simActions";

const initialState = {
  sims: [],
  loading: false,
};

function simReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_SIM_SUCCESS: {
      let newEbay = [];
      action?.payload?.map((item) => {
        newEbay.push({
          ...item,
          key: item?.sim_id,
        });
      });
      return {
        ...state,
        sims: newEbay,
      };
    
    }
    default: {
      return state;
    }
  }
}

export default simReducer;
