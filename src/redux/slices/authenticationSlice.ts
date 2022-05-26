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
} from "../../utilities/services/authentication";

const initialUserDetails: UserDetails = {
  _id: "",
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  followers: [],
  following: [],
};

const initialData: AuthInitialData = {
  authToken: localStorage.getItem("token") || "",
  userDetails:
    JSON.parse(localStorage.getItem("user") || "{}") || initialUserDetails,
  authStatus: IDLE,
  authError: "",
};

export const signIn = createAsyncThunk("authentication/signIn", callSignIn);
export const signUp = createAsyncThunk("authentication/signUp", callSignUp);

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
      state.userDetails = action.payload.userDetails;
      localStorage.setItem("token", state.authToken);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.userDetails, password: "***" })
      );
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
      state.userDetails = action.payload.userDetails;
      localStorage.setItem("token", state.authToken);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...action.payload.userDetails, password: "***" })
      );
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.authStatus = ERROR;
      state.authError = String(action.payload);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
