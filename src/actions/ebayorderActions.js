export const GET_LIST_EBAYORDER = "GET_LIST_EBAYORDER";
export const GET_LIST_EBAYORDER_SUCCESS = "GET_LIST_EBAYORDER_SUCCESS";
export const GET_LIST_EBAYORDER_ERROR = "GET_LIST_EBAYORDER_ERROR";

export const getListebayorderActions = (payload) => {
    return {
        type: GET_LIST_EBAYORDER,
        payload: payload
    }
}