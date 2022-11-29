import { takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_DEPARTMENT_FAIL,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_SUCCESS,
  GET_LIST_DEPARTMENT_FAIL,
  GET_LIST_DEPARTMENT_REQUEST,
  GET_LIST_DEPARTMENT_SUCCESS,
  REMOVE_DEPARTMENT_FAIL,
  REMOVE_DEPARTMENT_REQUEST,
  REMOVE_DEPARTMENT_SUCCESS,
} from "../actions/departmentActions.js";
import { addDepartmentApi, getListDepartmentApi, removeDepartmentApi } from "../api/department/index.js";
import { showError, showSuccess } from "../utils/index.js";

function* addDepartmentRequest({ payload }) {
  try {
    const response = yield call(addDepartmentApi, payload);
    const { data } = response;
    showSuccess(`Phòng ban ${data.name} đã tạo thành công`);
    yield put({ type: ADD_DEPARTMENT_SUCCESS, payload: data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: ADD_DEPARTMENT_FAIL, message: message });
  }
}

function* getListDepartmentRequest() {
  try {
    const response = yield call(getListDepartmentApi);
    const { data } = response;
    yield put({ type: GET_LIST_DEPARTMENT_SUCCESS, payload: data.data });
  } catch (res) {
    const message = res.response.data.error;
    showError(message);
    yield put({ type: GET_LIST_DEPARTMENT_FAIL, message: message });
  }
}

function* removeDepartmentRequest({ payload }) {
    try {
      const response = yield call(removeDepartmentApi, payload);
      const { data } = response;
      showSuccess(`Phòng ban ${data.department.name} đã xóa thành công`);
      yield put({ type: REMOVE_DEPARTMENT_SUCCESS, payload: data.department });
    } catch (res) {
      const message = res.response.data.error;
      showError(message);
      yield put({ type: REMOVE_DEPARTMENT_FAIL, message: message });
    }
  }


export default function* departmentSaga() {
  yield takeLatest(ADD_DEPARTMENT_REQUEST, addDepartmentRequest);
  yield takeLatest(GET_LIST_DEPARTMENT_REQUEST, getListDepartmentRequest);
  yield takeLatest(REMOVE_DEPARTMENT_REQUEST, removeDepartmentRequest);


}
