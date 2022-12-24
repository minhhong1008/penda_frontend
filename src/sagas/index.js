import { all } from "redux-saga/effects";
import testSaga from "./testSaga";
import authSaga from "./auth";
import userSaga from "./user";
import departmentSaga from "./department";
import ebaySaga from "./ebay";
import etsySaga from "./etsy";
import amazonSaga from "./amazon";
import shopeeSaga from "./shopee";
import payoneerSaga from "./payoneer";
import paypalSaga from "./paypal";
import pingpongSaga from "./pingpong";
import bankSaga from "./bank";
import infoSaga from "./info";
import personSaga from "./person";
import mailSaga from "./mail";
import simSaga from "./sim";
import deviceSaga from "./device";
import proxySaga from "./proxy";
import facebookSaga from "./facebook";
import tiktokSaga from "./tiktok";
import usersSaga from "./users";
import ebayorderSaga from "./ebayorder";
import etsyorderSaga from "./etsyorder";
import ebayitemSaga from "./ebayitem";
import etsyitemSaga from "./etsyitem";

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
    pingpongSaga(),
    bankSaga(),
    infoSaga(),
    personSaga(),
    mailSaga(),
    simSaga(),
    deviceSaga(),
    proxySaga(),
    facebookSaga(),
    tiktokSaga(),
    usersSaga(),
    ebayorderSaga(),
    etsyorderSaga(),
    ebayitemSaga(),
    etsyitemSaga()
  ])
}
