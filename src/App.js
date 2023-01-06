// Test deploy
import React, { useEffect } from "react";
import 'antd/dist/reset.css';
import './index.css';
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Main from "./components/layout/Main.js";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import Rtl from "./pages/Rtl";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tables from "./pages/Tables";
import LogOut from "./pages/LogOut";
import PersonnelManager from "./pages/PersonnelManager";
import DepartmentManager from "./pages/DepartmentManager";
import HomePage from "./pages/HomePage/HomePage";

// Import lại cái file vừa tạo
import AccountManager from "./pages/AccountManager";
import Account from "./pages/Accounts/Account";
// EBAY
import Ebay_class from "./pages/Ebay/Ebay_class";
import Ebay_table from "./pages/Ebay/Ebay_table";
import Ebay_info from "./pages/Ebay/Ebay_info";
// ETSY
import Etsy_class from "./pages/Etsy/Etsy_class";
import Etsy_table from "./pages/Etsy/Etsy_table";
import Etsy_info from "./pages/Etsy/Etsy_info";
// Amazon
import Amazon_class from "./pages/Amazon/Amazon_class";
import Amazon_table from "./pages/Amazon/Amazon_table";
import Amazon_info from "./pages/Amazon/Amazon_info";
// Shopee
import Shopee_class from "./pages/Shopee/Shopee_class";
import Shopee_table from "./pages/Shopee/Shopee_table";
import Shopee_info from "./pages/Shopee/Shopee_info";
// Payoneer
import Payoneer_class from "./pages/Payoneer/Payoneer_class";
import Payoneer_table from "./pages/Payoneer/Payoneer_table";
import Payoneer_info from "./pages/Payoneer/Payoneer_info";
// Paypal
import Paypal_class from "./pages/Paypal/Paypal_class";
import Paypal_table from "./pages/Paypal/Paypal_table";
import Paypal_info from "./pages/Paypal/Paypal_info";
// Pingpong
import Pingpong_class from "./pages/Pingpong/Pingpong_class";
import Pingpong_table from "./pages/Pingpong/Pingpong_table";
import Pingpong_info from "./pages/Pingpong/Pingpong_info";
// Bank
import Bank_class from "./pages/Bank/Bank_class";
import Bank_table from "./pages/Bank/Bank_table";
import Bank_info from "./pages/Bank/Bank_info";
// Info
import Info_class from "./pages/Info/Info_class";
import Info_table from "./pages/Info/Info_table";
import Info_info from "./pages/Info/Info_info";
// project
import Project_class from "./pages/Project/Project_class";
import Project_table from "./pages/Project/Project_table";
import Project_info from "./pages/Project/Project_info";
// Mail
import Mail_class from "./pages/Mail/Mail_class";
import Mail_table from "./pages/Mail/Mail_table";
import Mail_info from "./pages/Mail/Mail_info";
// Sim
import Sim_class from "./pages/Sim/Sim_class";
import Sim_table from "./pages/Sim/Sim_table";
import Sim_info from "./pages/Sim/Sim_info";
// Device
import Device_class from "./pages/Device/Device_class";
import Device_table from "./pages/Device/Device_table";
import Device_info from "./pages/Device/Device_info";
// Device
import Proxy_class from "./pages/Proxy/Proxy_class";
import Proxy_table from "./pages/Proxy/Proxy_table";
import Proxy_info from "./pages/Proxy/Proxy_info";
// Facebook
import Facebook_class from "./pages/Facebook/Facebook_class";
import Facebook_table from "./pages/Facebook/Facebook_table";
import Facebook_info from "./pages/Facebook/Facebook_info";

// Tiktok
import Tiktok_class from "./pages/Tiktok/Tiktok_class";
import Tiktok_table from "./pages/Tiktok/Tiktok_table";
import Tiktok_info from "./pages/Tiktok/Tiktok_info";

// Other
import Other_class from "./pages/Other/Other_class";
import Other_table from "./pages/Other/Other_table";
import Other_info from "./pages/Other/Other_info";

// Create
import Create from "./pages/Create/Create";
import Tooldata_info from "./pages/Tooldata/Tooldata_info";
import Tools_list from "./pages/Tools/tools_list";
import CCCD from "./pages/Tools/cccd/cccd";
import DOCKBANK from "./pages/Tools/docbank/docbank";


// User
import Users_class from "./pages/Users/Users_class";
import Users_table from "./pages/Users/Users_table";
import Users_info from "./pages/Users/Users_info";
import Users_timesheets from "./pages/Users/Users_timesheets";

// Ebayorder
import Ebayorder_class from "./pages/Ebayorder/Ebayorder_class";
import Ebayorder_table from "./pages/Ebayorder/Ebayorder_table";
import Ebayorder_info from "./pages/Ebayorder/Ebayorder_info";

// Etsyorder
import Etsyorder_class from "./pages/Etsyorder/Etsyorder_class";
import Etsyorder_table from "./pages/Etsyorder/Etsyorder_table";
import Etsyorder_info from "./pages/Etsyorder/Etsyorder_info";

// Ebayorder
import Ebayitem_class from "./pages/Ebayitem/Ebayitem_class";
import Ebayitem_table from "./pages/Ebayitem/Ebayitem_table";
import Ebayitem_info from "./pages/Ebayitem/Ebayitem_info";

// Etsyitem
import Etsyitem_class from "./pages/Etsyitem/Etsyitem_class";
import Etsyitem_table from "./pages/Etsyitem/Etsyitem_table";
import Etsyitem_info from "./pages/Etsyitem/Etsyitem_info";

import { getToken } from "./utils";
import { verifyToken } from "./api/auth";
import { useDispatch } from "react-redux";
import { getRoleAction } from "./actions/authActions";

// Report
import Report_overview from "./pages/Report/Report_overview";
//Bill
import Bill_class from "./pages/Bill/Bill_class";
import Bill_table from "./pages/Bill/Bill_table";
import Salary_table from "./pages/Bill/Salary_table";


// Customer
import Customer_class from "./pages/Customer/Customer_class";
import Customer_table from "./pages/Customer/Customer_table";
import Customer_info from "./pages/Customer/Customer_info";

// Copy 1 cái thẻ <Route /> rồi sửa phần component={tên cái vừa import}
// Sửa phần path="Đường dẫn của link vừa tạo"
// Quay lại file vừa tạo để sửa giao diện

const App = () => {
  const dispatch = useDispatch();
  const verify = async () => {
    let token = getToken();
    dispatch(getRoleAction(token));
    // let response = await verifyToken({
    //   token: token,
    // });
    // console.log(response);
  };

  useEffect(() => {
    verify();
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/log-out" exact component={LogOut} />
        <Main>
          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route
            path="/personnel-management"
            exact
            component={PersonnelManager}
          />
          <Route
            path="/department-management"
            exact
            component={DepartmentManager}
          />
          <Route path="/account-management" exact component={AccountManager} />
          <Route path="/Accounts/account" exact component={Account} />

          {/* Ebay */}
          <Route path="/products/ebay_class" exact component={Ebay_class} />
          <Route
            path="/products/ebay_class/table"
            exact
            component={Ebay_table}
          />
          <Route
            path="/products/ebay_class/table/:id"
            exact
            component={Ebay_info}
          />

          {/* Etsy */}
          <Route path="/products/etsy_class" exact component={Etsy_class} />
          <Route
            path="/products/etsy_class/table"
            exact
            component={Etsy_table}
          />
          <Route
            path="/products/etsy_class/table/:id"
            exact
            component={Etsy_info}
          />

          {/* Amazon */}
          <Route path="/products/amazon_class" exact component={Amazon_class} />
          <Route
            path="/products/amazon_class/table"
            exact
            component={Amazon_table}
          />
          <Route
            path="/products/amazon_class/table/:id"
            exact
            component={Amazon_info}
          />
          {/* Shopee */}
          <Route path="/products/shopee_class" exact component={Shopee_class} />
          <Route
            path="/products/shopee_class/table"
            exact
            component={Shopee_table}
          />
          <Route
            path="/products/shopee_class/table/:id"
            exact
            component={Shopee_info}
          />
          {/* Payoneer */}
          <Route
            path="/products/payoneer_class"
            exact
            component={Payoneer_class}
          />
          <Route
            path="/products/payoneer_class/table"
            exact
            component={Payoneer_table}
          />
          <Route
            path="/products/payoneer_class/table/:id"
            exact
            component={Payoneer_info}
          />
          {/* Paypal */}
          <Route path="/products/paypal_class" exact component={Paypal_class} />
          <Route
            path="/products/paypal_class/table"
            exact
            component={Paypal_table}
          />
          <Route
            path="/products/paypal_class/table/:id"
            exact
            component={Paypal_info}
          />
          {/* Pingpong */}
          <Route
            path="/products/pingpong_class"
            exact
            component={Pingpong_class}
          />
          <Route
            path="/products/pingpong_class/table"
            exact
            component={Pingpong_table}
          />
          <Route
            path="/products/pingpong_class/table/:id"
            exact
            component={Pingpong_info}
          />
          {/* Bank */}
          <Route path="/products/bank_class" exact component={Bank_class} />
          <Route
            path="/products/bank_class/table"
            exact
            component={Bank_table}
          />
          <Route
            path="/products/bank_class/table/:id"
            exact
            component={Bank_info}
          />
          {/* Info */}
          <Route path="/products/info_class" exact component={Info_class} />
          <Route
            path="/products/info_class/table"
            exact
            component={Info_table}
          />
          <Route
            path="/products/info_class/table/:id"
            exact
            component={Info_info}
          />

          {/* project */}
          <Route path="/products/project_class" exact component={Project_class} />
          <Route
            path="/products/project_class/table"
            exact
            component={Project_table}
          />
          <Route
            path="/products/project_class/table/:id"
            exact
            component={Project_info}
          />
          {/* Mail */}
          <Route path="/products/mail_class" exact component={Mail_class} />
          <Route
            path="/products/mail_class/table"
            exact
            component={Mail_table}
          />
          <Route
            path="/products/mail_class/table/:id"
            exact
            component={Mail_info}
          />
          {/* Sim */}
          <Route path="/products/sim_class" exact component={Sim_class} />
          <Route path="/products/sim_class/table" exact component={Sim_table} />
          <Route
            path="/products/sim_class/table/:id"
            exact
            component={Sim_info}
          />
          {/* Device */}
          <Route path="/products/device_class" exact component={Device_class} />
          <Route
            path="/products/device_class/table"
            exact
            component={Device_table}
          />
          <Route
            path="/products/device_class/table/:id"
            exact
            component={Device_info}
          />
          {/* Proxy */}
          <Route path="/products/proxy_class" exact component={Proxy_class} />
          <Route
            path="/products/proxy_class/table"
            exact
            component={Proxy_table}
          />
          <Route
            path="/products/proxy_class/table/:id"
            exact
            component={Proxy_info}
          />
          {/* Facebook */}
          <Route
            path="/products/facebook_class"
            exact
            component={Facebook_class}
          />
          <Route
            path="/products/facebook_class/table"
            exact
            component={Facebook_table}
          />
          <Route
            path="/products/facebook_class/table/:id"
            exact
            component={Facebook_info}
          />

          {/*Tiktok */}
          <Route path="/products/tiktok_class" exact component={Tiktok_class} />
          <Route
            path="/products/tiktok_class/table"
            exact
            component={Tiktok_table}
          />
          <Route
            path="/products/tiktok_class/table/:id"
            exact
            component={Tiktok_info}
          />
          {/* Other */}
          <Route path="/products/other_class" exact component={Other_class} />
          <Route
            path="/products/other_class/table"
            exact
            component={Other_table}
          />
          <Route
            path="/products/other_class/table/:id"
            exact
            component={Other_info}
          />

          <Route path="/products/create" exact component={Create} />
          <Route
            path="/products/tooldata_info"
            exact
            component={Tooldata_info}
          />

          <Route path="/products/tools" exact component={Tools_list} />

          <Route path="/products/cccd" exact component={CCCD} />

          <Route path="/products/docbank" exact component={DOCKBANK} />


          <Route
            path="/products/report_overview"
            exact
            component={Report_overview}
          />

          {/*Bill */}
          <Route path="/finance/bill_class" exact component={Bill_class} />

          <Route path="/finance/bill_table/:status" exact component={Bill_table} />
          <Route path="/finance/salary_table" exact component={Salary_table} />

          {/*---------------------------------quản trị nhân sự-------------------------------- */}
          {/*Users */}
          <Route path="/personnel/users_class" exact component={Users_class} />
          <Route
            path="/personnel/users_class/table"
            exact
            component={Users_table}
          />
          <Route
            path="/personnel/users_class/table/:id"
            exact
            component={Users_info}
          />

          <Route
            path="/personnel/users_timesheets"
            exact
            component={Users_timesheets}
          />

          {/*---------------------------------Business-------------------------------- */}
          {/* Ebayorder */}
          <Route
            path="/business/ebayorder_class"
            exact
            component={Ebayorder_class}
          />
          <Route
            path="/business/ebayorder_class/table"
            exact
            component={Ebayorder_table}
          />
          <Route
            path="/business/ebayorder_class/table/:id"
            exact
            component={Ebayorder_info}
          />
          {/* Etsyorder */}
          <Route
            path="/business/etsyorder_class"
            exact
            component={Etsyorder_class}
          />
          <Route
            path="/business/etsyorder_class/table"
            exact
            component={Etsyorder_table}
          />
          <Route
            path="/business/etsyorder_class/table/:id"
            exact
            component={Etsyorder_info}
          />

          {/* Ebayitem */}
          <Route
            path="/business/ebayitem_class"
            exact
            component={Ebayitem_class}
          />
          <Route
            path="/business/ebayitem_class/table"
            exact
            component={Ebayitem_table}
          />
          <Route
            path="/business/ebayitem_class/table/:id"
            exact
            component={Ebayitem_info}
          />
          {/* Etsyitem */}
          <Route
            path="/business/etsyitem_class"
            exact
            component={Etsyitem_class}
          />
          <Route
            path="/business/etsyitem_class/table"
            exact
            component={Etsyitem_table}
          />
          <Route
            path="/business/etsyitem_class/table/:id"
            exact
            component={Etsyitem_info}
          />

          {/* Customer */}
          <Route
            path="/business/customer_class"
            exact
            component={Customer_class}
          />
          <Route
            path="/business/customer_class/table"
            exact
            component={Customer_table}
          />
          <Route
            path="/business/customer_class/table/:id"
            exact
            component={Customer_info}
          />

          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
        </Main>
      </Switch>
    </div>
  );
};

export default compose(withRouter)(App);
