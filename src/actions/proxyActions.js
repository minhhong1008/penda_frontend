export const GET_LIST_PROXY = "GET_LIST_PROXY";
export const GET_LIST_PROXY_SUCCESS = "GET_LIST_PROXY_SUCCESS";
export const GET_LIST_PROXY_ERROR = "GET_LIST_PROXY_ERROR";

export const getListproxyActions = (payload) => {
    return {
        type: GET_LIST_PROXY,
        payload: payload
    }
}