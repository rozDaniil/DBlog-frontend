import { userResponse } from "../auth/userTypes";

export interface CommentStateType {
  commentData: SingleComment[];
  commentStatus: string | null;
  sagaPayload: any;
}

export interface SingleComment {
  _id?: string;
  text: string;
  user?: string | userResponse;
  post: any;
  createdAt?: string;
  updatedAt?: string;
}
