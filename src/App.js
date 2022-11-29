import React from "react";
import "antd/dist/antd.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Main from "./components/layout/Main.js";
import Billing from "./pages/Billing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Rtl from "./pages/Rtl";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tables from "./pages/Tables";
import LogOut from "./pages/LogOut";
import PersonnelManager from "./pages/PersonnelManager";
import DepartmentManager from "./pages/DepartmentManager";

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/log-out" exact component={LogOut} />
      <Main>
        <Route exact path="/dashboard" component={Home} />
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
        <Route exact path="/rtl" component={Rtl} />
        <Route exact path="/profile" component={Profile} />
        <Redirect from="*" to="/dashboard" />
      </Main>
    </Switch>
  </div>
);

export default compose(withRouter)(App);
