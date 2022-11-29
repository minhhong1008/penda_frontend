import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_LIST_USER_FAIL,
  GET_LIST_USER_REQUEST,
  GET_LIST_USER_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_RPOFILE_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../actions/userActions";
import { getListUser, getProfileApi, updateProfileApi } from "../api/user";
import { showError, showSuccess } from "../utils";

function* getProfileRequest({ payload }) {
  try {
    const response = yield call(getProfileApi, payload);
    const { data } = response;
    yield put({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_RPOFILE_FAIL, message: message });
  }
}

function* updateProfileRequest({ payload }) {
  try {
    const response = yield call(updateProfileApi, payload);
    const { data } = response;
    yield put({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    showSuccess("Cập nhật thông tin thành công");
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: UPDATE_PROFILE_FAIL, message: message });
  }
}

function* getListUserRequest({ payload }) {
  try {
    const response = yield call(getListUser, payload);
    const { data } = response;
    yield put({ type: GET_LIST_USER_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_USER_FAIL, message: message });
  }
}

export default function* userSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, getProfileRequest);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileRequest);
  yield takeLatest(GET_LIST_USER_REQUEST, getListUserRequest);
}
