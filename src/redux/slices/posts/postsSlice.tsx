import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsPayload } from "../../../api/posts/PostsApi";
import { InitialStateType, PostType } from "./postsTypes";

const initialState: InitialStateType = {
  postsData: null,
  postsStatus: null,
  userPostsData: null,
  userPostStatus: null,
  sagasPayload: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state: InitialStateType, action: PayloadAction<PostType[]>) => {
      state.postsData = action.payload;
    },
    setUserPosts: (
      state: InitialStateType,
      action: PayloadAction<PostType[]>
    ) => {
      state.userPostsData = action.payload;
    },
    setUserPostStatus: (
      state: InitialStateType,
      action: PayloadAction<string | null>
    ) => {
      state.userPostStatus = action.payload;
    },
    onDelete: (state: InitialStateType, action: PayloadAction<string>) => {
      console.log(action);
      if (state.userPostsData) {
        state.userPostsData = state.userPostsData.filter(
          (post) => post._id !== action.payload
        );
      }
    },
    setPostStatus: (
      state: InitialStateType,
      action: PayloadAction<
        {
          value: string;
          msg: string;
          param: string;
          location: string;
        }[]
      >
    ) => {
      state.postsStatus = action.payload;
    },
    fetchPosts: (state: InitialStateType) => {
      state.sagasPayload = "loading";
    },
    fetcUserPosts: (state: InitialStateType, action: PayloadAction<string>) => {
      state.sagasPayload = action.payload;
    },
    fetchAddPosts: (
      state: InitialStateType,
      action: PayloadAction<PostsPayload>
    ) => {
      state.sagasPayload = action.payload;
    },
    fetchUpdatePosts: (
      state: InitialStateType,
      action: PayloadAction<{ id: string; payload: PostsPayload }>
    ) => {
      state.sagasPayload = action.payload;
    },
    fetchDeletePosts: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.sagasPayload = action.payload;
    },
  },
});

export const {
  setPosts,
  setUserPosts,
  onDelete,
  setPostStatus,
  setUserPostStatus,
  fetchPosts,
  fetcUserPosts,
  fetchAddPosts,
  fetchUpdatePosts,
  fetchDeletePosts,
} = postsSlice.actions;

export default postsSlice.reducer;
