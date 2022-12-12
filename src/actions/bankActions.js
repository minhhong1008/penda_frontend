export const GET_LIST_BANK = "GET_LIST_BANK";
export const GET_LIST_BANK_SUCCESS = "GET_LIST_BANK_SUCCESS";
export const GET_LIST_BANK_ERROR = "GET_LIST_BANK_ERROR";

export const getListbankActions = (payload) => {
    return {
        type: GET_LIST_BANK,
        payload: payload
    }
}