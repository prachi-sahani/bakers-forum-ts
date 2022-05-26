import axios from "axios";
import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";

function signInUser({ username, password }: SignInDataToSend) {
  return axios.post("/api/auth/login", { username, password });
}

function signUpUser(dataToSend: SignUpDataToSend) {
  return axios.post("/api/auth/signup", dataToSend);
}

function getUserData(id: string) {
  return axios.get(`/api/users/${id}`);
}

function getAllQuestions() {
  return axios.get("/api/questions");
}

export { signInUser, signUpUser, getUserData, getAllQuestions };
