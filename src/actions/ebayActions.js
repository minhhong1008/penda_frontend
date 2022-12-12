export const GET_LIST_EBAY = "GET_LIST_EBAY";
export const GET_LIST_EBAY_SUCCESS = "GET_LIST_EBAY_SUCCESS";
export const GET_LIST_EBAY_ERROR = "GET_LIST_EBAY_ERROR";

export const getListebayActions = (payload) => {
    return {
        type: GET_LIST_EBAY,
        payload: payload
    }
}
