import axios from "../index";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  fullName: string;
}

export const AuthApi = {
  async fetchLogin(payload: LoginPayload) {
    const { data } = await axios.post("/auth/login", payload);
    return data;
  },
  async fetchRegister(payload: RegisterPayload) {
    const { data } = await axios.post("/auth/register", payload);
    return data;
  },
  async fetchGetMe() {
    const { data }: any = await axios.get("/auth/me");
    return data;
  },
};
