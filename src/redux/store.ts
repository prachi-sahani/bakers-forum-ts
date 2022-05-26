import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authenticationSlice";
import feedReducer from "./slices/feedSlice";
import userReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    feed: feedReducer,
    users: userReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
