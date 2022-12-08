import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_ETSY, GET_LIST_ETSY_ERROR, GET_LIST_ETSY_SUCCESS
} from "../actions/etsyActions"

import { getListetsy } from "../api/etsy/index.js";

function* getListetsySaga({ payload }) {
  try {
    const response = yield call(getListetsy, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_ETSY_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_ETSY_ERROR, message: message });
  }

}
export default function* etsySaga() {
  yield takeLatest(GET_LIST_ETSY, getListetsySaga);
}
