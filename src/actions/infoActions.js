export const GET_LIST_INFO = "GET_LIST_INFO";
export const GET_LIST_INFO_SUCCESS = "GET_LIST_INFO_SUCCESS";
export const GET_LIST_INFO_ERROR = "GET_LIST_INFO_ERROR";

export const getListinfoActions = (payload) => {
    return {
        type: GET_LIST_INFO,
        payload: payload
    }
}