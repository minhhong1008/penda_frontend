import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_REPORT, GET_LIST_REPORT_ERROR, GET_LIST_REPORT_SUCCESS
} from "../actions/reportActions"

import { getListreport } from "../api/report/index.js";
import { showError } from "../utils";

function* getListreportSaga({ payload }) {
  try {
    const response = yield call(getListreport, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_REPORT_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_REPORT_ERROR, message: message });
  }

}
export default function* reportSaga() {
  yield takeLatest(GET_LIST_REPORT, getListreportSaga);
}