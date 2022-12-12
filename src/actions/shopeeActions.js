export const GET_LIST_SHOPEE = "GET_LIST_SHOPEE";
export const GET_LIST_SHOPEE_SUCCESS = "GET_LIST_SHOPEE_SUCCESS";
export const GET_LIST_SHOPEE_ERROR = "GET_LIST_SHOPEE_ERROR";

export const getListshopeeActions = (payload) => {
    return {
        type: GET_LIST_SHOPEE,
        payload: payload
    }
}
