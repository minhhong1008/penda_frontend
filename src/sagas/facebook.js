import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_FACEBOOK, GET_LIST_FACEBOOK_ERROR, GET_LIST_FACEBOOK_SUCCESS
} from "../actions/facebookActions"

import { getListfacebook } from "../api/facebook/index.js";
import { showError } from "../utils";

function* getListfacebookSaga({ payload }) {
  try {
    const response = yield call(getListfacebook, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_FACEBOOK_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_FACEBOOK_ERROR, message: message });
  }

}
export default function* facebookSaga() {
  yield takeLatest(GET_LIST_FACEBOOK, getListfacebookSaga);
}