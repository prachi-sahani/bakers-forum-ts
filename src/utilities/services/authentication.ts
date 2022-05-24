import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";
import { signInUser, signUpUser } from "../server-request/server-request";

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

export { callSignIn, callSignUp };
