export const GET_LIST_USERS = "GET_LIST_USERS";
export const GET_LIST_USERS_SUCCESS = "GET_LIST_USERS_SUCCESS";
export const GET_LIST_USERS_ERROR = "GET_LIST_USERS_ERROR";

export const getListusersActions = (payload) => {
    return {
        type: GET_LIST_USERS,
        payload: payload
    }
}

export const getListusers_timesheetsActions = (payload) => {
    return {
        type: GET_LIST_USERS,
        payload: payload
    }
}