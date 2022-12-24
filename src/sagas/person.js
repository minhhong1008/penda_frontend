import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_LIST_PERSON,
  GET_LIST_PERSON_ERROR,
  GET_LIST_PERSON_SUCCESS,
} from "../actions/personActions";
import { getListperson } from "../api/person/index.js";
import { showError } from "../utils/index";

function* getListpersonSaga({ payload }) {
  try {
    const response = yield call(getListperson, payload);
    const { data } = response;
    yield put({ type: GET_LIST_PERSON_SUCCESS, payload: data });
  } catch (res) {
    const message = "Không có quyền truy cập vào person";
    showError(message);
    yield put({ type: GET_LIST_PERSON_ERROR, message: message });
  }
}
export default function* personSaga() {
  yield takeLatest(GET_LIST_PERSON, getListpersonSaga);
}
