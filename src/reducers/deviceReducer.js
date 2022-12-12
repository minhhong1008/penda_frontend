import { GET_LIST_DEVICE_SUCCESS } from "../actions/deviceActions";

const initialState = {
  devices: [],
  loading: false,
};

function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_DEVICE_SUCCESS: {
      return {
        ...state,
        devices: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default deviceReducer;
