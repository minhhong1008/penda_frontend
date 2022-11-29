import { takeLatest, put } from "redux-saga/effects";
import {
  TEST_ERROR,
  TEST_SUCCESS,
  TEST_REQUEST,
} from "../actions/testActions.js";

function* testRequest({ payload }) {
  console.log("Saga run");
  const condition = true;
  if (condition) {
    yield put({ type: TEST_SUCCESS, payload: payload });
  } else {
    yield put({ type: TEST_ERROR, message: "Error" });
  }
}

export default function* testSaga() {
  yield takeLatest(TEST_REQUEST, testRequest);
}
