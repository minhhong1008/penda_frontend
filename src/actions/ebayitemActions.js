export const GET_LIST_EBAYITEM = "GET_LIST_EBAYITEM";
export const GET_LIST_EBAYITEM_SUCCESS = "GET_LIST_EBAYITEM_SUCCESS";
export const GET_LIST_EBAYITEM_ERROR = "GET_LIST_EBAYITEM_ERROR";

export const getListebayitemActions = (payload) => {
    return {
        type: GET_LIST_EBAYITEM,
        payload: payload
    }
}