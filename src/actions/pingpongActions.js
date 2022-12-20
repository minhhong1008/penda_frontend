export const GET_LIST_PINGPONG = "GET_LIST_PINGPONG";
export const GET_LIST_PINGPONG_SUCCESS = "GET_LIST_PINGPONG_SUCCESS";
export const GET_LIST_PINGPONG_ERROR = "GET_LIST_PINGPONG_ERROR";

export const getListpingpongActions = (payload) => {
    return {
        type: GET_LIST_PINGPONG,
        payload: payload
    }
}