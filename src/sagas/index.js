import { all } from "redux-saga/effects";
import testSaga from "./testSaga";
import authSaga from "./auth";
import userSaga from "./user";
import departmentSaga from "./department";
import ebaySaga from "./ebay";
import etsySaga from "./esty";
import amazonSaga from "./amazon";
import shopeeSaga from "./shopee";
import payoneerSaga from "./payoneer";
import paypalSaga from "./paypal";
import bankSaga from "./bank";
import infoSaga from "./info";
import mailSaga from "./mail";
import simSaga from "./sim";
import deviceSaga from "./device";
import facebookSaga from "./facebook";
import tiktokSaga from "./tiktok";

export default function* rootSaga() {
  yield all([
    testSaga(),
    authSaga(),
    userSaga(),
    departmentSaga(),
    ebaySaga(),
    etsySaga(),
    shopeeSaga(),
    amazonSaga(),
    payoneerSaga(),
    paypalSaga(),
    bankSaga(),
    infoSaga(),
    mailSaga(),
    simSaga(),
    deviceSaga(),
    facebookSaga(),
    tiktokSaga()
  ])
}
