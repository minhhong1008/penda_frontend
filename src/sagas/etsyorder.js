import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_ETSYORDER, GET_LIST_ETSYORDER_ERROR, GET_LIST_ETSYORDER_SUCCESS
} from "../actions/etsyorderActions"

import { getListetsyorder } from "../api/etsyorder/index.js";

function* getListetsyorderSaga({ payload }) {
  try {
    const response = yield call(getListetsyorder, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_ETSYORDER_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_ETSYORDER_ERROR, message: message });
  }

}
export default function* etsyorderSaga() {
  yield takeLatest(GET_LIST_ETSYORDER, getListetsyorderSaga);
}