import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_SIM, GET_LIST_SIM_ERROR, GET_LIST_SIM_SUCCESS
} from "../actions/simActions"

import { getListsim } from "../api/sim/index.js";
import { showError } from "../utils";

function* getListsimSaga({ payload }) {
  try {
    const response = yield call(getListsim, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_SIM_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_SIM_ERROR, message: message });
  }

}
export default function* simSaga() {
  yield takeLatest(GET_LIST_SIM, getListsimSaga);
}