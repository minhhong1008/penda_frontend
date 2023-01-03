import { GET_LIST_DEVICE_SUCCESS } from "../actions/deviceActions";

const initialState = {
  devices: [],
  loading: false,
};

function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_DEVICE_SUCCESS: {
      let newData = [];
      action?.payload?.map((item) => {
        newData.push({
          ...item,
          key: item?.device_id
        })
      })
      return {
        ...state,
        devices: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default deviceReducer;
