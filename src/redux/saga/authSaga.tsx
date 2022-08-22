import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeEvery } from "redux-saga/effects";
import { AuthApi, LoginPayload, RegisterPayload } from "../../api/auth/AuthApi";
import { setUserData, setUserStatus } from "../slices/auth/userSlice";
import { userResponse } from "../slices/auth/userTypes";

function* workFetchLogin({ payload }: PayloadAction<LoginPayload>) {
  try {
    const data: userResponse = yield call(AuthApi.fetchLogin, payload);
    yield put(setUserData(data));
    if (data.token) {
      localStorage.setItem("DToken", data.token);
    }
  } catch (error) {
    console.log(error);
    // @ts-ignore
    yield put(setUserStatus(error?.response?.data.message as string));
  }
}

function* workFetchRegister({ payload }: PayloadAction<RegisterPayload>) {
  try {
    const data: userResponse = yield call(AuthApi.fetchRegister, payload);
    yield put(setUserData(data));
    if (data.token) {
      localStorage.setItem("DToken", data.token);
    }
  } catch (error) {
    console.log(error);
    // @ts-ignore
    yield put(setUserStatus(error?.response?.data.message as string));
  }
}

function* workFetchGetMe() {
  try {
    const data: userResponse = yield call(AuthApi.fetchGetMe);
    yield put(setUserData(data));
  } catch (error) {
    console.log(error);
  }
}

export function* authSaga() {
  yield takeEvery("auth/fetchUserLogin", workFetchLogin);
  yield takeEvery("auth/fetchUserRegister", workFetchRegister);
  yield takeEvery("auth/fetchGetMe", workFetchGetMe);
}
