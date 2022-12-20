import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_PROXY, GET_LIST_PROXY_ERROR, GET_LIST_PROXY_SUCCESS
} from "../actions/proxyActions"

import { getListproxy } from "../api/proxy/index.js";

function* getListproxySaga({ payload }) {
  try {
    const response = yield call(getListproxy, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_PROXY_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_PROXY_ERROR, message: message });
  }

}
export default function* proxySaga() {
  yield takeLatest(GET_LIST_PROXY, getListproxySaga);
}
