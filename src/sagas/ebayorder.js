import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_LIST_EBAYORDER,
  GET_LIST_EBAYORDER_ERROR,
  GET_LIST_EBAYORDER_SUCCESS,
} from "../actions/ebayorderActions";
import { getListebayorder } from "../api/ebayorder/index.js";
import { showError } from "../utils";

function* getListebayorderSaga({ payload }) {
  try {
    const response = yield call(getListebayorder, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_EBAYORDER_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_EBAYORDER_ERROR, message: message });
  }
}
export default function* ebayorderSaga() {
  yield takeLatest(GET_LIST_EBAYORDER, getListebayorderSaga);
}