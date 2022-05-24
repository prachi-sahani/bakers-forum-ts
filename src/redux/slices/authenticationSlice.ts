import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FULFILLED, IDLE, LOADING } from "../../utilities/constants/api-status";
import {
  callSignIn,
  callSignUp,
} from "../../utilities/services/authentication";

const initialData = {
  authToken: localStorage.getItem("token") || "",
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
      state.authToken = action.payload;
      localStorage.setItem("token", state.authToken);
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.authStatus = "error";
      state.authError = String(action.payload);
    });
    builder.addCase(signUp.pending, (state) => {
      state.authStatus = LOADING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.authStatus = FULFILLED;
      state.authToken = action.payload;
      localStorage.setItem("token", state.authToken);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.authStatus = "error";
      state.authError = String(action.payload);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
