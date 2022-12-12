export const GET_LIST_PAYONEER = "GET_LIST_PAYONEER";
export const GET_LIST_PAYONEER_SUCCESS = "GET_LIST_PAYONEER_SUCCESS";
export const GET_LIST_PAYONEER_ERROR = "GET_LIST_PAYONEER_ERROR";

export const getListpayoneerActions = (payload) => {
    return {
        type: GET_LIST_PAYONEER,
        payload: payload
    }
}