import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthInitialData } from "../../types/AuthInitialData";
import { UserDetails } from "../../types/UserDetails";
import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../../utilities/constants/api-status";
import {
  callSignIn,
  callSignUp,
  callEditUser,
} from "../../utilities/services/authentication";
import { Buffer } from "buffer";

const initialUserDetails: UserDetails = {
  _id: "",
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  bio: "",
  followers: [],
  following: [],
};

const initialData: AuthInitialData = {
  authToken: localStorage.getItem("token") || "",
  userDetails:
    JSON.parse(localStorage.getItem("user") || "{}") || initialUserDetails,
  authStatus: IDLE,
  authError: "",
  editUserAPIStatus: IDLE,
  editUserAPIError: "",
};

export const signIn = createAsyncThunk("authentication/signIn", callSignIn);
export const signUp = createAsyncThunk("authentication/signUp", callSignUp);
export const editUser = createAsyncThunk(
  "authentication/editUser",
  callEditUser
);

const authSlice = createSlice({
  name: "authentication",
  initialState: initialData,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.authToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.authStatus = LOADING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authStatus = FULFILLED;
      state.authToken = action.payload.authToken;
      // encode password
      state.userDetails = {
        ...action.payload.userDetails,
        password: Buffer.from(action.payload.userDetails.password).toString(
          "base64"
        ),
      };
      localStorage.setItem("token", state.authToken);
      localStorage.setItem("user", JSON.stringify(state.userDetails));
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.authStatus = ERROR;
      state.authError = String(action.payload);
    });
    builder.addCase(signUp.pending, (state) => {
      state.authStatus = LOADING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.authStatus = FULFILLED;
      state.authToken = action.payload.authToken;
      // encode password
      state.userDetails = {
        ...action.payload.userDetails,
        password: Buffer.from(action.payload.userDetails.password).toString(
          "base64"
        ),
      };
      localStorage.setItem("token", state.authToken);
      localStorage.setItem("user", JSON.stringify(state.userDetails));
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.authStatus = ERROR;
      state.authError = String(action.payload);
    });
    builder.addCase(editUser.pending, (state) => {
      state.editUserAPIStatus = LOADING;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.editUserAPIStatus = FULFILLED;
      // encode password
      state.userDetails = {
        ...action.payload,
        password: Buffer.from(action.payload.password).toString("base64"),
      };
      localStorage.setItem("user", JSON.stringify(state.userDetails));
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.editUserAPIStatus = ERROR;
      state.editUserAPIError = String(action.payload);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
