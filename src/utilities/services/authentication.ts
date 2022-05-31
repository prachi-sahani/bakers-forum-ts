import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";
import {
  editUserData,
  getUserData,
  signInUser,
  signUpUser,
} from "../server-request/server-request";

const callSignIn = async (
  { username, password }: SignInDataToSend,
  { rejectWithValue }: any
) => {
  try {
    const { data } = await signInUser({ username, password });
    const userData = await getUserData(data.foundUser._id);
    return { authToken: data.encodedToken, userDetails: userData.data.user };
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
    const userData = await getUserData(data.createdUser._id);
    return { authToken: data.encodedToken, userDetails: userData.data.user };
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
