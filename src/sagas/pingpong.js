import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_PINGPONG, GET_LIST_PINGPONG_ERROR, GET_LIST_PINGPONG_SUCCESS
} from "../actions/pingpongActions"

import { getListpingpong } from "../api/pingpong/index.js";
import { showError } from "../utils";

function* getListpingpongSaga({ payload }) {
  try {
    const response = yield call(getListpingpong, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_PINGPONG_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_PINGPONG_ERROR, message: message });
  }

}
export default function* pingpongSaga() {
  yield takeLatest(GET_LIST_PINGPONG, getListpingpongSaga);
}
