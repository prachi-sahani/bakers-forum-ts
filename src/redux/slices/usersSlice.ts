import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../types/UserDetails";
import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../../utilities/constants/api-status";
import {
  callFollowUser,
  callGetAllUser,
  callUnfollowUser,
} from "../../utilities/services/users";
interface UsersState {
  users: UserDetails[];
  usersAPIStatus: string;
  usersAPIError: string;
  followUserAPIStatus: string;
  followUserAPIError: string;
  unfollowUserAPIStatus: string;
  unfollowUserAPIError: string;
}

const initialUsersData: UsersState = {
  users: [],
  usersAPIStatus: IDLE,
  usersAPIError: "",
  followUserAPIStatus: IDLE,
  followUserAPIError: "",
  unfollowUserAPIStatus: IDLE,
  unfollowUserAPIError: "",
};
export const getUsers = createAsyncThunk("/user/getAllUsers", callGetAllUser);
export const followUser = createAsyncThunk("/user/followUser", callFollowUser);
export const unfollowUser = createAsyncThunk(
  "/user/unfollowUser",
  callUnfollowUser
);

const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.usersAPIStatus = LOADING;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.usersAPIStatus = FULFILLED;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.usersAPIStatus = FULFILLED;
      state.usersAPIError = String(action.payload);
    });
    builder.addCase(followUser.pending, (state) => {
      state.followUserAPIStatus = LOADING;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.followUserAPIStatus = FULFILLED;
      state.users = state.users.map((user) => {
        if (user._id === action.payload.user._id) {
          return action.payload.user;
        }
        if (user._id === action.payload.followUser._id) {
          return action.payload.followUser;
        }
        return user;
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...action.payload.user, password: "***" })
      );
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.followUserAPIStatus = ERROR;
      state.followUserAPIError = String(action.payload);
    });
    builder.addCase(unfollowUser.pending, (state) => {
      state.unfollowUserAPIStatus = LOADING;
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      state.unfollowUserAPIStatus = FULFILLED;
      state.users = state.users.map((user) => {
        if (user._id === action.payload.user._id) {
          return action.payload.user;
        }
        if (user._id === action.payload.followUser._id) {
          return action.payload.followUser;
        }
        return user;
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...action.payload.user, password: "***" })
      );
    });
    builder.addCase(unfollowUser.rejected, (state, action) => {
      state.unfollowUserAPIStatus = ERROR;
      state.unfollowUserAPIError = String(action.payload);
    });
  },
});

export default usersSlice.reducer;
