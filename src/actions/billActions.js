export const GET_LIST_BILL = "GET_LIST_BILL";
export const GET_LIST_BILL_SUCCESS = "GET_LIST_BILL_SUCCESS";
export const GET_LIST_BILL_ERROR = "GET_LIST_BILL_ERROR";

export const getListbillActions = (payload) => {
    return {
        type: GET_LIST_BILL,
        payload: payload
    }
}