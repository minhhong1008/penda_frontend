import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_BANK, GET_LIST_BANK_ERROR, GET_LIST_BANK_SUCCESS
} from "../actions/bankActions"

import { getListbank } from "../api/bank/index.js";
import { showError } from "../utils";

function* getListbankSaga({ payload }) {
  try {
    const response = yield call(getListbank, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_BANK_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_BANK_ERROR, message: message });
  }

}
export default function* bankSaga() {
  yield takeLatest(GET_LIST_BANK, getListbankSaga);
}
