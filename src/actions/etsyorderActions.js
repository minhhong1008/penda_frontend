export const GET_LIST_ETSYORDER = "GET_LIST_ETSYORDER";
export const GET_LIST_ETSYORDER_SUCCESS = "GET_LIST_ETSYORDER_SUCCESS";
export const GET_LIST_ETSYORDER_ERROR = "GET_LIST_ETSYORDER_ERROR";

export const getListetsyorderActions = (payload) => {
    return {
        type: GET_LIST_ETSYORDER,
        payload: payload
    }
}