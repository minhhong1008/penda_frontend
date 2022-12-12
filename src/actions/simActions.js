export const GET_LIST_SIM = "GET_LIST_SIM";
export const GET_LIST_SIM_SUCCESS = "GET_LIST_SIM_SUCCESS";
export const GET_LIST_SIM_ERROR = "GET_LIST_SIM_ERROR";

export const getListsimActions = (payload) => {
    return {
        type: GET_LIST_SIM,
        payload: payload
    }
}