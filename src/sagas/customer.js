import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_CUSTOMER, GET_LIST_CUSTOMER_ERROR, GET_LIST_CUSTOMER_SUCCESS
} from "../actions/customerActions"

import { getListcustomer } from "../api/customer/index.js";

function* getListcustomerSaga({ payload }) {
  try {
    const response = yield call(getListcustomer, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_CUSTOMER_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    //showError(message);
    yield put({ type: GET_LIST_CUSTOMER_ERROR, message: message });
  }

}
export default function* customerSaga() {
  yield takeLatest(GET_LIST_CUSTOMER, getListcustomerSaga);
}
