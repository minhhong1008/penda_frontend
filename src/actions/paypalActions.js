export const GET_LIST_PAYPAL = "GET_LIST_PAYPAL";
export const GET_LIST_PAYPAL_SUCCESS = "GET_LIST_PAYPAL_SUCCESS";
export const GET_LIST_PAYPAL_ERROR = "GET_LIST_PAYPAL_ERROR";

export const getListpaypalActions = (payload) => {
    return {
        type: GET_LIST_PAYPAL,
        payload: payload
    }
}
