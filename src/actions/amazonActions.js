export const GET_LIST_AMAZON = "GET_LIST_AMAZON";
export const GET_LIST_AMAZON_SUCCESS = "GET_LIST_AMAZON_SUCCESS";
export const GET_LIST_AMAZON_ERROR = "GET_LIST_AMAZON_ERROR";

export const getListamazonActions = (payload) => {
    return {
        type: GET_LIST_AMAZON,
        payload: payload
    }
}