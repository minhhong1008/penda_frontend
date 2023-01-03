import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_AMAZON, GET_LIST_AMAZON_ERROR, GET_LIST_AMAZON_SUCCESS
} from "../actions/amazonActions"

import { getListamazon } from "../api/amazon/index.js";

function* getListamazonSaga({ payload }) {
  try {
    const response = yield call(getListamazon, payload);
    
    const { data } = response;
    yield put({ type: GET_LIST_AMAZON_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_AMAZON_ERROR, message: message });
  }

}
export default function* amazonSaga() {
  yield takeLatest(GET_LIST_AMAZON, getListamazonSaga);
}
