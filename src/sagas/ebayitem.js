import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_LIST_EBAYITEM,
  GET_LIST_EBAYITEM_ERROR,
  GET_LIST_EBAYITEM_SUCCESS,
} from "../actions/ebayitemActions";
import { getListebayitem } from "../api/ebayitem/index.js";
import { showError } from "../utils";

function* getListebayitemSaga({ payload }) {
  try {
    const response = yield call(getListebayitem, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_EBAYITEM_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_EBAYITEM_ERROR, message: message });
  }
}
export default function* ebayitemSaga() {
  yield takeLatest(GET_LIST_EBAYITEM, getListebayitemSaga);
}