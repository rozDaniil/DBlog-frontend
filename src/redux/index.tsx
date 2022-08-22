import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

import userReducer from "./slices/auth/userSlice";
import postReducer from "./slices/posts/postsSlice";
import commentReducer from "./slices/comment/commentSlice";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  comment: commentReducer,
});

export const setupStore = () => {
  const saga = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(saga),
  });
  saga.run(rootSaga);

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
