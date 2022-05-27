import axios from "axios";
import { Comment } from "../../types/Comment";
import { SignInDataToSend } from "../../types/SignInDataToSend";
import { SignUpDataToSend } from "../../types/SignUpDataToSend";

function signInUser({ username, password }: SignInDataToSend) {
  return axios.post("/api/auth/login", { username, password });
}

function signUpUser(dataToSend: SignUpDataToSend) {
  return axios.post("/api/auth/signup", dataToSend);
}

function getAllUsers() {
  return axios.get(`/api/users`);
}

function getUserData(id: string) {
  return axios.get(`/api/users/${id}`);
}

function getAllQuestions() {
  return axios.get("/api/questions");
}

function addComment(token: string, id: string, dataToSend: Comment) {
  return axios.post(
    `/api/comments/add/${id}`,
    { commentData: dataToSend },
    {
      headers: { authorization: token },
    }
  );
}

function getAllVotes(id: string) {
  return axios.get(`/api/votes/${id}`);
}

function addVote(token: string, id: string, dataToSend: string) {
  return axios.post(
    `/api/votes/react/${id}`,
    { reaction: dataToSend },
    {
      headers: { authorization: token },
    }
  );
}

export {
  signInUser,
  signUpUser,
  getAllUsers,
  getUserData,
  getAllQuestions,
  addComment,
  getAllVotes,
  addVote,
};
