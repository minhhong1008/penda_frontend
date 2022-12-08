import { combineReducers } from "redux";
import authReducer from "./authReducer";
import departmentReducer from "./departmentReducer";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import ebayReducer from "./ebayReducer";
import etsyReducer from "./etsyReducer";

const appReducer = asyncReducers =>
  combineReducers({
    test: testReducer,
    auth: authReducer,
    user: userReducer,
    department: departmentReducer,
    ebay: ebayReducer,
    etsy: etsyReducer,
    ...asyncReducers
  });

function rootReducer(asyncReducers) {
  return appReducer(asyncReducers);
}

export default rootReducer;
