import axios from "../index";

export interface CommentPayload {
  text: string;
  postId: string;
}

export const CommentApi = {
  async fetchGetComment() {
    const { data } = await axios.get("/comment");
    return data;
  },
  async fetchCreateComment(payload: CommentPayload) {
    const { data } = await axios.post("/comment", payload);
    return data;
  },
  //   async fetchUpdatePost(updateInfo: { id: string; payload: PostsPayload }) {
  //     const { data } = await axios.patch(
  //       `/posts/${updateInfo.id}`,
  //       updateInfo.payload
  //     );
  //     return data;
  //   },
  //   async fetchRemovePost(id: string) {
  //     const { data } = await axios.delete(`/posts/${id}`);
  //     return data;
  //   },
};
