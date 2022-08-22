import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeEvery } from "redux-saga/effects";
import axios from "../../api";

import { CommentApi, CommentPayload } from "../../api/comment/CommentApi";
import { PostsApi } from "../../api/posts/PostsApi";
import { UserApi } from "../../api/user/UserApi";
import { userResponse } from "../slices/auth/userTypes";
import { addComment, setComment } from "../slices/comment/commentSlice";
import { SingleComment } from "../slices/comment/commentType";
import { PostType } from "../slices/posts/postsTypes";

function* workFetchComment() {
  try {
    const data: SingleComment[] = yield call(CommentApi.fetchGetComment);
    yield put(setComment(data));
  } catch (error) {
    console.log(error);
  }
}

function* workFetchAddComment({ payload }: PayloadAction<CommentPayload>) {
  try {
    const data: SingleComment = yield call(
      CommentApi.fetchCreateComment,
      payload
    );
    const user: userResponse = yield call(
      UserApi.fetchGetUse,
      data.user as string
    );
    data.user = user;
    yield put(addComment(data));
  } catch (error) {
    console.log(error);
  }
}

export function* commentSaga() {
  yield takeEvery("comment/fetchComment", workFetchComment);
  yield takeEvery("comment/fetchAddComment", workFetchAddComment);
}
