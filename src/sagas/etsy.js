import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_LIST_ETSY,
  GET_LIST_ETSY_ERROR,
  GET_LIST_ETSY_SUCCESS,
} from "../actions/etsyActions";
import { getListetsy } from "../api/etsy/index.js";
import { showError } from "../utils/index";

function* getListetsySaga({ payload }) {
  try {
    const response = yield call(getListetsy, payload);
    const { data } = response;
    yield put({ type: GET_LIST_ETSY_SUCCESS, payload: data });
  } catch (res) {
    const message = "Không có quyền truy cập vào etsy";
    showError(message);
    yield put({ type: GET_LIST_ETSY_ERROR, message: message });
  }
}
export default function* etsySaga() {
  yield takeLatest(GET_LIST_ETSY, getListetsySaga);
}
