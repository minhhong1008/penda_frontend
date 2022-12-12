import React from "react";
import "antd/dist/antd.css";
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
// Bank
import Bank_class from "./pages/Bank/Bank_class";
import Bank_table from "./pages/Bank/Bank_table";
import Bank_info from "./pages/Bank/Bank_info";
// Info
import Info_class from "./pages/Info/Info_class";
import Info_table from "./pages/Info/Info_table";
import Info_info from "./pages/Info/Info_info";
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
import Tools_list from "./pages/Tools/tools_list";
import CCCD from "./pages/Tools/cccd/cccd";

// Copy 1 cái thẻ <Route /> rồi sửa phần component={tên cái vừa import}
// Sửa phần path="Đường dẫn của link vừa tạo"
// Quay lại file vừa tạo để sửa giao diện
const App = () => (
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
        <Route
          path="/account-management"
          exact
          component={AccountManager}
        />
        <Route
          path="/Accounts/account"
          exact
          component={Account}
        />

        {/* Ebay */}
        <Route
          path="/products/ebay_class"
          exact
          component={Ebay_class}
        />
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
        <Route
          path="/products/etsy_class"
          exact
          component={Etsy_class}
        />
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
        <Route
          path="/products/amazon_class"
          exact
          component={Amazon_class}
        />
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
        <Route
          path="/products/shopee_class"
          exact
          component={Shopee_class}
        />
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
        <Route
          path="/products/paypal_class"
          exact
          component={Paypal_class}
        />
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
        {/* Bank */}
        <Route
          path="/products/bank_class"
          exact
          component={Bank_class}
        />
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
        <Route
          path="/products/info_class"
          exact
          component={Info_class}
        />
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
        {/* Mail */}
        <Route
          path="/products/mail_class"
          exact
          component={Mail_class}
        />
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
        <Route
          path="/products/sim_class"
          exact
          component={Sim_class}
        />
        <Route
          path="/products/sim_class/table"
          exact
          component={Sim_table}
        />
        <Route
          path="/products/sim_class/table/:id"
          exact
          component={Sim_info}
        />
        {/* Device */}
        <Route
          path="/products/device_class"
          exact
          component={Device_class}
        />
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
        <Route
          path="/products/tiktok_class"
          exact
          component={Tiktok_class}
        />
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
        <Route
          path="/products/other_class"
          exact
          component={Other_class}
        />
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

        <Route
          path="/products/create"
          exact
          component={Create}
        />

        <Route
          path="/products/tools"
          exact
          component={Tools_list}
        />

        <Route
          path="/products/cccd"
          exact
          component={CCCD}
        />

        <Route exact path="/rtl" component={Rtl} />
        <Route exact path="/profile" component={Profile} />
      </Main>
    </Switch>
  </div>
);

export default compose(withRouter)(App);
