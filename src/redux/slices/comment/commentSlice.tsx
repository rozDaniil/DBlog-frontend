import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentStateType, SingleComment } from "./commentType";

const initialState: CommentStateType = {
  commentData: [] as SingleComment[],
  commentStatus: null,
  sagaPayload: null as any,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComment: (
      state: CommentStateType,
      actions: PayloadAction<SingleComment[]>
    ) => {
      state.commentData = actions.payload;
    },
    addComment: (
      state: CommentStateType,
      actions: PayloadAction<SingleComment>
    ) => {
      state.commentData.unshift(actions.payload);
    },
    fetchComment: (state: CommentStateType) => {
      state.sagaPayload = "adding";
    },
    fetchAddComment: (state: CommentStateType, actions: PayloadAction<any>) => {
      state.sagaPayload = actions.payload;
    },
  },
});

export const { setComment, addComment, fetchComment, fetchAddComment } =
  commentSlice.actions;

export default commentSlice.reducer;
