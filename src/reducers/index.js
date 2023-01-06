import { combineReducers } from "redux";
import authReducer from "./authReducer";
import departmentReducer from "./departmentReducer";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import ebayReducer from "./ebayReducer";
import etsyReducer from "./etsyReducer";
import shopeeReducer from "./shopeeReducer";
import amazonReducer from "./amazonReducer";
import payoneerReducer from "./payoneerReducer";
import paypalReducer from "./paypalReducer";
import pingpongReducer from "./pingpongReducer";
import bankReducer from "./bankReducer";
import infoReducer from "./infoReducer";
import projectReducer from "./projectReducer";
import mailReducer from "./mailReducer";
import simReducer from "./simReducer";
import deviceReducer from "./deviceReducer";
import proxyReducer from "./proxyReducer";
import facebookReducer from "./facebookReducer";
import tiktokReducer from "./tiktokReducer";

import usersReducer from "./usersReducer";

import ebayorderReducer from "./ebayorderReducer";
import etsyorderReducer from "./etsyorderReducer";
import ebayitemReducer from "./ebayitemReducer";
import etsyitemReducer from "./etsyitemReducer";

import reportReducer from "./reportReducer";
import billReducer from "./billReducer";
import customerReducer from "./customerReducer";

const appReducer = asyncReducers =>
  combineReducers({
    test: testReducer,
    auth: authReducer,
    user: userReducer,
    department: departmentReducer,
    ebay: ebayReducer,
    etsy: etsyReducer,
    shopee: shopeeReducer,
    bank: bankReducer,
    info: infoReducer,
    project: projectReducer,
    amazon: amazonReducer,
    payoneer: payoneerReducer,
    paypal: paypalReducer,
    pingpong: pingpongReducer,
    mail: mailReducer,
    sim: simReducer,
    device: deviceReducer,
    proxy: proxyReducer,
    facebook: facebookReducer,
    tiktok: tiktokReducer,

    users: usersReducer,
    ebayorder: ebayorderReducer,
    etsyorder: etsyorderReducer,
    ebayitem: ebayitemReducer,
    etsyitem: etsyitemReducer,

    report: reportReducer,
    bill:  billReducer,
    customer:  customerReducer,

    ...asyncReducers
  });

function rootReducer(asyncReducers) {
  return appReducer(asyncReducers);
}

export default rootReducer;
