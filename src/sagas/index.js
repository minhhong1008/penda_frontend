import { all } from "redux-saga/effects";
import testSaga from "./testSaga";
import authSaga from "./auth";
import userSaga from "./user";
import departmentSaga from "./department";
import ebaySaga from "./ebay";
import etsySaga from "./esty";

export default function* rootSaga() {
  yield all([
    testSaga(),
    authSaga(),
    userSaga(),
    departmentSaga(),
    ebaySaga(),
    etsySaga(),
  ])
}
