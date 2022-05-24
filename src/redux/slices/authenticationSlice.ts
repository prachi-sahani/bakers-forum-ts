import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";
import { FULFILLED, IDLE, LOADING } from "../../utilities/constants/api-status";
import {
  signInUser,
  signUpUser,
} from "../../utilities/server-request/server-request";

const initialData = {
  authToken: localStorage.getItem("token") || "",
  authStatus: IDLE,
  authError: "",
};
const callSignIn = async (
  { email, password }: SignInDataToSend,
  { rejectWithValue }: any
): Promise<string> => {
  try {
    const { data } = await signInUser({ email, password });
    return data.encodedToken;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callSignUp = async (
  dataToSend: SignUpDataToSend,
  { rejectWithValue }: any
): Promise<string> => {
  try {
    const { data } = await signUpUser(dataToSend);
    return data.encodedToken;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
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
