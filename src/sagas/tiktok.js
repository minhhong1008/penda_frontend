import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_TIKTOK, GET_LIST_TIKTOK_ERROR, GET_LIST_TIKTOK_SUCCESS
} from "../actions/tiktokActions"

import { getListtiktok } from "../api/tiktok/index.js";
import { showError } from "../utils";

function* getListtiktokSaga({ payload }) {
  try {
    const response = yield call(getListtiktok, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_TIKTOK_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_TIKTOK_ERROR, message: message });
  }

}
export default function* tiktokSaga() {
  yield takeLatest(GET_LIST_TIKTOK, getListtiktokSaga);
}