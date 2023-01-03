import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_DEVICE, GET_LIST_DEVICE_ERROR, GET_LIST_DEVICE_SUCCESS
} from "../actions/deviceActions"

import { getListdevice } from "../api/device/index.js";
import { showError } from "../utils";

function* getListdeviceSaga({ payload }) {
  try {
    const response = yield call(getListdevice, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_DEVICE_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_DEVICE_ERROR, message: message });
  }

}
export default function* deviceSaga() {
  yield takeLatest(GET_LIST_DEVICE, getListdeviceSaga);
}