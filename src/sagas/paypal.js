import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_PAYPAL, GET_LIST_PAYPAL_ERROR, GET_LIST_PAYPAL_SUCCESS
} from "../actions/paypalActions"

import { getListpaypal } from "../api/paypal/index.js";
import { showError } from "../utils";

function* getListpaypalSaga({ payload }) {
  try {
    const response = yield call(getListpaypal, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_PAYPAL_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_PAYPAL_ERROR, message: message });
  }

}
export default function* paypalSaga() {
  yield takeLatest(GET_LIST_PAYPAL, getListpaypalSaga);
}
