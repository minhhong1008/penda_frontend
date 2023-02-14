export const GET_LIST_MAIL = "GET_LIST_MAIL";
export const GET_LIST_MAIL_SUCCESS = "GET_LIST_MAIL_SUCCESS";
export const GET_LIST_MAIL_ERROR = "GET_LIST_MAIL_ERROR";

export const getListmailActions = (payload) => {
    return {
        type: GET_LIST_MAIL,
        payload: payload
    }
}

export const getListmailWorkActions = (payload) => {
    return {
        type: GET_LIST_MAIL,
        payload: payload
    }
}