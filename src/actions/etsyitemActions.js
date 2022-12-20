export const GET_LIST_ETSYITEM = "GET_LIST_ETSYITEM";
export const GET_LIST_ETSYITEM_SUCCESS = "GET_LIST_ETSYITEM_SUCCESS";
export const GET_LIST_ETSYITEM_ERROR = "GET_LIST_ETSYITEM_ERROR";

export const getListetsyitemActions = (payload) => {
    return {
        type: GET_LIST_ETSYITEM,
        payload: payload
    }
}