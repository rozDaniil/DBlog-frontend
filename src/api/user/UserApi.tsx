import axios from "../index";

export const UserApi = {
  async fetchGetUserPosts(id: string) {
    const { data } = await axios.get(`/posts/user/${id}`);
    return data;
  },
  async fetchGetUse(id: string) {
    const { data } = await axios.get(`/user/${id}`);
    return data;
  },
};
