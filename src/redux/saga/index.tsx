import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { commentSaga } from "./commentSaga";
import { postsSaga } from "./postsSaga";

function* rootSaga() {
  yield all([authSaga(), postsSaga(), commentSaga()]);
}

export default rootSaga;
