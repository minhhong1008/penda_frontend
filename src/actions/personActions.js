export const GET_LIST_PERSON = "GET_LIST_PERSON";
export const GET_LIST_PERSON_SUCCESS = "GET_LIST_PERSON_SUCCESS";
export const GET_LIST_PERSON_ERROR = "GET_LIST_PERSON_ERROR";

export const getListpersonActions = (payload) => {
    return {
        type: GET_LIST_PERSON,
        payload: payload
    }
}