export const GET_LIST_TIKTOK = "GET_LIST_TIKTOK";
export const GET_LIST_TIKTOK_SUCCESS = "GET_LIST_TIKTOK_SUCCESS";
export const GET_LIST_TIKTOK_ERROR = "GET_LIST_TIKTOK_ERROR";

export const getListtiktokActions = (payload) => {
    return {
        type: GET_LIST_TIKTOK,
        payload: payload
    }
}
