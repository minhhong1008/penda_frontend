import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_SHOPEE, GET_LIST_SHOPEE_ERROR, GET_LIST_SHOPEE_SUCCESS
} from "../actions/shopeeActions"

import { getListshopee } from "../api/shopee/index.js";
import { showError } from "../utils";

function* getListshopeeSaga({ payload }) {
  try {
    const response = yield call(getListshopee, payload);
    const { data } = response;
    yield put({ type: GET_LIST_SHOPEE_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_SHOPEE_ERROR, message: message });
  }

}
export default function* shopeeSaga() {
  yield takeLatest(GET_LIST_SHOPEE, getListshopeeSaga);
}