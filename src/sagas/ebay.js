import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_EBAY, GET_LIST_EBAY_ERROR, GET_LIST_EBAY_SUCCESS
} from "../actions/ebayActions"

import { getListEbay } from "../api/ebay/index.js";

function* getListEbaySaga({ payload }) {
  try {
    const response = yield call(getListEbay, payload);
    const { data } = response;
    yield put({ type: GET_LIST_EBAY_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_EBAY_ERROR, message: message });
  }
}
export default function* ebaySaga() {
  yield takeLatest(GET_LIST_EBAY, getListEbaySaga);
}
