export const GET_LIST_ETSY = "GET_LIST_ETSY";
export const GET_LIST_ETSY_SUCCESS = "GET_LIST_ETSY_SUCCESS";
export const GET_LIST_ETSY_ERROR = "GET_LIST_ETSY_ERROR";

export const getListetsyActions = (payload) => {
    return {
        type: GET_LIST_ETSY,
        payload: payload
    }
}
