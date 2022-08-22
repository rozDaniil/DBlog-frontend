export interface InitialState {
  userData: userResponse | null;
  userStatus: string;
  authPayload: AuthPayload;
}

export interface AuthPayload {
  email: string;
  password: string;
  fullName?: string;
}

export interface userResponse {
  fullName: string;
  email: string;
  _id: string;
  createdAt: string;
  updatdAt: string;
  token?: string;
  avatarUrl?: string;
}
