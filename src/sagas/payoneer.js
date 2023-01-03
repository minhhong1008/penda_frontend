import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_PAYONEER, GET_LIST_PAYONEER_ERROR, GET_LIST_PAYONEER_SUCCESS
} from "../actions/payoneerActions"

import { getListpayoneer } from "../api/payoneer/index.js";
import { showError } from "../utils";

function* getListpayoneerSaga({ payload }) {
  try {
    const response = yield call(getListpayoneer, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_PAYONEER_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_PAYONEER_ERROR, message: message });
  }

}
export default function* payoneerSaga() {
  yield takeLatest(GET_LIST_PAYONEER, getListpayoneerSaga);
}