export interface InitialStateType {
  postsData: PostType[] | null;
  postsStatus:
    | {
        value: string;
        msg: string;
        param: string;
        location: string;
      }[]
    | null;
  userPostsData: PostType[] | null;
  userPostStatus: null | string;
  sagasPayload: any;
}

export interface PostType {
  title: string;
  text: string;
  tags: string[] | [];
  viewsCount: number;
  user: {
    _id: string;
    fullName: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    updatedAt: string;
    avatarUrl?: string;
    __v: number;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  __v: number;
}

export interface PostCreateType {
  title: string;
  text: string;
  tags: string[] | [];
  viewsCount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: string;
}
