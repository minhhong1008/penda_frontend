import { combineReducers } from "redux";
import authReducer from "./authReducer";
import departmentReducer from "./departmentReducer";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import ebayReducer from "./ebayReducer";
import etsyReducer from "./etsyReducer";
import bankReducer from "./bankReducer";

const appReducer = asyncReducers =>
  combineReducers({
    test: testReducer,
    auth: authReducer,
    user: userReducer,
    department: departmentReducer,
    ebay: ebayReducer,
    etsy: etsyReducer,
    bank: bankReducer,
    ...asyncReducers
  });

function rootReducer(asyncReducers) {
  return appReducer(asyncReducers);
}

export default rootReducer;
