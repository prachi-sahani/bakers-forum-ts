import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";
import {
  editUserData,
  signInUser,
  signUpUser,
} from "../server-request/server-request";

const callSignIn = async (
  { username, password }: SignInDataToSend,
  { rejectWithValue }: any
) => {
  try {
    const { data } = await signInUser({ username, password });
    return { authToken: data.encodedToken, userDetails: data.foundUser };
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callSignUp = async (
  dataToSend: SignUpDataToSend,
  { rejectWithValue }: any
) => {
  try {
    const { data } = await signUpUser(dataToSend);
    return { authToken: data.encodedToken, userDetails: data.createdUser };
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callEditUser = async (
  { token, dataToSend }: { token: string; dataToSend: SignUpDataToSend },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await editUserData(token, dataToSend);
    return data.user;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

export { callSignIn, callSignUp, callEditUser };
