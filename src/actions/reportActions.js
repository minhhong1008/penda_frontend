export const GET_LIST_REPORT = "GET_LIST_REPORT";
export const GET_LIST_REPORT_SUCCESS = "GET_LIST_REPORT_SUCCESS";
export const GET_LIST_REPORT_ERROR = "GET_LIST_REPORT_ERROR";

export const getListreportActions = (payload) => {
    return {
        type: GET_LIST_REPORT,
        payload: payload
    }
}