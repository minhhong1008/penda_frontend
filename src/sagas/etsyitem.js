import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_ETSYITEM, GET_LIST_ETSYITEM_ERROR, GET_LIST_ETSYITEM_SUCCESS
} from "../actions/etsyitemActions"

import { getListetsyitem } from "../api/etsyitem/index.js";
import { showError } from "../utils";

function* getListetsyitemSaga({ payload }) {
  try {
    const response = yield call(getListetsyitem, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_ETSYITEM_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_ETSYITEM_ERROR, message: message });
  }

}
export default function* etsyitemSaga() {
  yield takeLatest(GET_LIST_ETSYITEM, getListetsyitemSaga);
}