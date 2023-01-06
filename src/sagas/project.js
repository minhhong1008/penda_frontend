import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_LIST_project,
  GET_LIST_project_ERROR,
  GET_LIST_project_SUCCESS,
} from "../actions/projectActions";
import { getListproject } from "../api/project/index.js";
import { showError } from "../utils/index";

function* getListprojectSaga({ payload }) {
  try {
    const response = yield call(getListproject, payload);
    const { data } = response;
    yield put({ type: GET_LIST_project_SUCCESS, payload: data });
  } catch (res) {
    const message = "Không có quyền truy cập vào project";
    showError(message);
    yield put({ type: GET_LIST_project_ERROR, message: message });
  }
}
export default function* projectSaga() {
  yield takeLatest(GET_LIST_project, getListprojectSaga);
}
