export const GET_LIST_DEVICE = "GET_LIST_DEVICE";
export const GET_LIST_DEVICE_SUCCESS = "GET_LIST_DEVICE_SUCCESS";
export const GET_LIST_DEVICE_ERROR = "GET_LIST_DEVICE_ERROR";

export const getListdeviceActions = (payload) => {
    return {
        type: GET_LIST_DEVICE,
        payload: payload
    }
}