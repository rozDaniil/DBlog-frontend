import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, AuthPayload, userResponse } from "./userTypes";

const initialState: InitialState = {
  userData: null,
  userStatus: "",
  authPayload: {} as AuthPayload,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserStatus: (state: InitialState, action: PayloadAction<string>) => {
      state.userStatus = action.payload;
    },
    setUserData: (state: InitialState, action: PayloadAction<userResponse>) => {
      state.userData = action.payload;
    },
    fetchUserLogin: (
      state: InitialState,
      action: PayloadAction<AuthPayload>
    ) => {
      state.authPayload = action.payload;
    },
    fetchUserRegister: (
      state: InitialState,
      action: PayloadAction<AuthPayload>
    ) => {
      state.authPayload = action.payload;
    },
    fetchGetMe: (state: InitialState) => {},
    logout: (state: InitialState) => {
      state.userData = null;
    },
  },
});

export const {
  setUserStatus,
  setUserData,
  fetchUserLogin,
  fetchUserRegister,
  fetchGetMe,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
