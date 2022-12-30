import { takeLatest, put, call } from "redux-saga/effects";
import {
    GET_LIST_BILL, GET_LIST_BILL_ERROR, GET_LIST_BILL_SUCCESS
} from "../actions/billActions"


function* getListbillSaga({ payload }) {
  try {
    const response = yield call(getListbill, payload);
    console.log(response);
    const { data } = response;
    yield put({ type: GET_LIST_BILL_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_BILL_ERROR, message: message });
  }

}
export default function* billSaga() {
  yield takeLatest(GET_LIST_BILL, getListbillSaga);
}