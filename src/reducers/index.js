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
import bankReducer from "./bankReducer";
import infoReducer from "./infoReducer";
import mailReducer from "./mailReducer";
import simReducer from "./simReducer";
import deviceReducer from "./deviceReducer";
import facebookReducer from "./facebookReducer";
import tiktokReducer from "./tiktokReducer";


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
    amazon: amazonReducer,
    payoneer: payoneerReducer,
    paypal: paypalReducer,
    mail: mailReducer,
    sim: simReducer,
    device: deviceReducer,
    facebook: facebookReducer,
    tiktok: tiktokReducer,
    ...asyncReducers
  });

function rootReducer(asyncReducers) {
  return appReducer(asyncReducers);
}

export default rootReducer;
