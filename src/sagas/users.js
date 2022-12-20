import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_USERS, GET_LIST_USERS_ERROR, GET_LIST_USERS_SUCCESS
} from "../actions/usersActions"

import { getListusers } from "../api/users/index.js";

function* getListusersSaga({ payload }) {
  try {
    const response = yield call(getListusers, payload);
    const { data } = response;
    yield put({ type: GET_LIST_USERS_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_USERS_ERROR, message: message });
  }

}
export default function* usersSaga() {
  yield takeLatest(GET_LIST_USERS, getListusersSaga);
}