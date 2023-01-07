export const GET_LIST_project = "GET_LIST_project";
export const GET_LIST_project_SUCCESS = "GET_LIST_project_SUCCESS";
export const GET_LIST_project_ERROR = "GET_LIST_project_ERROR";

export const getListprojectActions = (payload) => {
   
    return {
        type: GET_LIST_project,
        payload: payload
    }
}