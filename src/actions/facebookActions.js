export const GET_LIST_FACEBOOK = "GET_LIST_FACEBOOK";
export const GET_LIST_FACEBOOK_SUCCESS = "GET_LIST_FACEBOOK_SUCCESS";
export const GET_LIST_FACEBOOK_ERROR = "GET_LIST_FACEBOOK_ERROR";

export const getListfacebookActions = (payload) => {
    return {
        type: GET_LIST_FACEBOOK,
        payload: payload
    }
}
