import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_MAIL, GET_LIST_MAIL_ERROR, GET_LIST_MAIL_SUCCESS
} from "../actions/mailActions"

import { getListmail } from "../api/mail/index.js";

function* getListmailSaga({ payload }) {
  try {
    const response = yield call(getListmail, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_MAIL_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_MAIL_ERROR, message: message });
  }

}
export default function* mailSaga() {
  yield takeLatest(GET_LIST_MAIL, getListmailSaga);
}