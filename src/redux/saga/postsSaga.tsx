import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeEvery } from "redux-saga/effects";
import { PostsApi, PostsPayload } from "../../api/posts/PostsApi";
import { UserApi } from "../../api/user/UserApi";
import {
  setPosts,
  setPostStatus,
  setUserPosts,
  setUserPostStatus,
} from "../slices/posts/postsSlice";
import { PostCreateType, PostType } from "../slices/posts/postsTypes";

function* workFetchPosts() {
  try {
    const data: PostType[] = yield call(PostsApi.fetchGetPosts);
    yield put(setPosts(data));
  } catch (error) {
    console.log(error);
    // @ts-ignore
    // yield put(setUserStatus(error?.response?.data.message as string));
  }
}

function* workFetchUserPosts({ payload }: PayloadAction<string>) {
  try {
    yield put(setUserPostStatus("loading"));
    const data: PostType[] = yield call(UserApi.fetchGetUserPosts, payload);
    yield put(setUserPosts(data));
    yield put(setUserPostStatus("loaded"));
  } catch (error) {
    yield put(setUserPostStatus("error"));
    console.log(error);
    // @ts-ignore
    // yield put(setUserStatus(error?.response?.data.message as string));
  }
}

function* workFetchCreatePost({ payload }: PayloadAction<PostsPayload>) {
  try {
    const data: PostCreateType = yield call(PostsApi.fetchCreatePost, payload);
    return data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    yield put(setPostStatus(error?.response?.data));
  }
}

function* workFetchUpdatePost({
  payload,
}: PayloadAction<{ id: string; payload: PostsPayload }>) {
  try {
    const data: PostCreateType = yield call(PostsApi.fetchUpdatePost, payload);
    return data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    // yield put(setUserStatus(error?.response?.data.message as string));
  }
}

function* workFetchDeletePost({ payload }: PayloadAction<string>) {
  try {
    const data: { success: boolean } = yield call(
      PostsApi.fetchRemovePost,
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    // yield put(setUserStatus(error?.response?.data.message as string));
  }
}

export function* postsSaga() {
  yield takeEvery("posts/fetchPosts", workFetchPosts);
  yield takeEvery("posts/fetcUserPosts", workFetchUserPosts);
  yield takeEvery("posts/fetchAddPosts", workFetchCreatePost);
  yield takeEvery("posts/fetchUpdatePosts", workFetchUpdatePost);
  yield takeEvery("posts/fetchDeletePosts", workFetchDeletePost);
}
