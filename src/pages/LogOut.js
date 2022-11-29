import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../actions/authActions";

const LogOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch(logoutAction());
  history.push('sign-in')
  return <div>LogOut</div>;
};

export default LogOut;
