import axios from "../index";

export interface PostsPayload {
  text: string;
  title: string;
  imageUrl: string | null;
  tags?: string[];
}

export const PostsApi = {
  async fetchGetPosts() {
    const { data } = await axios.get("/posts");
    return data;
  },
  async fetchGetSinglePosts(id: string) {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  },
  async fetchCreatePost(payload: PostsPayload) {
    const { data } = await axios.post("/posts", payload);
    return data;
  },
  async fetchUpdatePost(updateInfo: { id: string; payload: PostsPayload }) {
    const { data } = await axios.patch(
      `/posts/${updateInfo.id}`,
      updateInfo.payload
    );
    return data;
  },
  async fetchRemovePost(id: string) {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  },
};
