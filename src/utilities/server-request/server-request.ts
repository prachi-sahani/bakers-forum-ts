import axios from "axios";
import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";

function signInUser({ email, password }: SignInDataToSend) {
  return axios.post("/api/auth/login", { email, password });
}

function signUpUser(dataToSend: SignUpDataToSend) {
  return axios.post("/api/auth/signup", dataToSend);
}

export { signInUser, signUpUser };
