import { takeLatest, put, call } from "redux-saga/effects";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
} from "../actions/authActions";
import { loginApi, registerApi, verifyToken } from "../api/auth/index.js";
import {
  removeToken,
  removeUser,
  setToken,
  setUser,
  showError,
  showSuccess,
} from "../utils";

function* registerRequest({ payload }) {
  try {
    const response = yield call(registerApi, payload);
    const { data } = response;
    showSuccess(`Email ${data.email} đã đăng kí thành công, vui lòng đăng nhập`);
    yield put({ type: REGISTER_SUCCESS});
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: REGISTER_ERROR, message: message });
  }
}

function* loginRequest({ payload }) {
  try {
    const response = yield call(loginApi, payload);
    const { data } = response;
    showSuccess("Đăng nhập thành công");
    setToken(data.token);
    setUser(JSON.stringify(data.user));
    yield put({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: LOGIN_ERROR, message: message });
  }
}

function* logoutRequest() {
  removeToken();
  removeUser();
  showSuccess('Đăng xuất thành công')
  yield put({ type: LOG_OUT_SUCCESS });
}

function* getRole({ payload }) {
  try {
    const response = yield call(verifyToken, {
      token: payload
    });
    const { data } = response;
    yield put({ type: GET_ROLE_SUCCESS, payload: data });
  } catch (error) {
    
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, registerRequest);
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(LOG_OUT_REQUEST, logoutRequest);
  yield takeLatest(GET_ROLE_REQUEST, getRole);
}
