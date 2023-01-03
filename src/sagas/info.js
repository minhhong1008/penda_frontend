import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_INFO, GET_LIST_INFO_ERROR, GET_LIST_INFO_SUCCESS
} from "../actions/infoActions"

import { getListinfo } from "../api/info/index.js";
import { showError } from "../utils";

function* getListinfoSaga({ payload }) {
  try {
    const response = yield call(getListinfo, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_INFO_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_INFO_ERROR, message: message });
  }

}
export default function* infoSaga() {
  yield takeLatest(GET_LIST_INFO, getListinfoSaga);
}