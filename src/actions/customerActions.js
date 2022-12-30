export const GET_LIST_CUSTOMER = "GET_LIST_CUSTOMER";
export const GET_LIST_CUSTOMER_SUCCESS = "GET_LIST_CUSTOMER_SUCCESS";
export const GET_LIST_CUSTOMER_ERROR = "GET_LIST_CUSTOMER_ERROR";

export const getListcustomerActions = (payload) => {
    return {
        type: GET_LIST_CUSTOMER,
        payload: payload
    }
}