import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../types/UserDetails";
import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../../utilities/constants/api-status";
import { callGetAllUser } from "../../utilities/services/users";

interface UsersState {
  users: UserDetails[];
  usersAPIStatus:
    | typeof IDLE
    | typeof FULFILLED
    | typeof LOADING
    | typeof ERROR;
  usersAPIError: string;
}

const initialUsersData: UsersState = {
  users: [],
  usersAPIStatus: IDLE,
  usersAPIError: "",
};
export const getUsers = createAsyncThunk("/user/getAllUsers", callGetAllUser);

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
      console.log(action);
      state.usersAPIError = String(action.payload);
    });
  },
});

export default usersSlice.reducer;
