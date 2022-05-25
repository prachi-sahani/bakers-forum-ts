import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";
import { signInUser, signUpUser } from "../server-request/server-request";

const callSignIn = async (
  { email, password }: SignInDataToSend,
  { rejectWithValue }: any
) => {
  try {
    const { data } = await signInUser({ email, password });
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
    return { authToken: data.encodedToken, userDetails: data.foundUser };
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

export { callSignIn, callSignUp };
