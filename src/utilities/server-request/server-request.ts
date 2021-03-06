import axios from "axios";
import { Comment } from "../../types/Comment";
import { NewQuestion } from "../../types/NewQuestion";
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

function editUserData(token: string, dataToSend: SignUpDataToSend) {
  return axios.post(
    `/api/users/edit`,
    { userData: dataToSend },
    {
      headers: { authorization: token },
    }
  );
}

function getAllQuestions() {
  return axios.get("/api/questions");
}

function getQuestion(questionId: string) {
  return axios.get(`/api/questions/${questionId}`);
}

function addNewQuestion(token: string, dataToSend: NewQuestion) {
  return axios.post(
    "/api/questions/add",
    { questionData: dataToSend },
    {
      headers: { authorization: token },
    }
  );
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

function followUser(token: string, id: string) {
  return axios.post(
    `/api/users/follow/${id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
}

function unfollowUser(token: string, id: string) {
  return axios.post(
    `/api/users/unfollow/${id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
}

function addBookmarkQuestion(token: string, id: string) {
  return axios.post(
    `/api/question/addBookmark/${id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
}

function removeBookmarkQuestion(token: string, id: string) {
  return axios.post(
    `/api/question/removeBookmark/${id}`,
    {},
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
  editUserData,
  getAllQuestions,
  getQuestion,
  addNewQuestion,
  addComment,
  getAllVotes,
  addVote,
  followUser,
  unfollowUser,
  addBookmarkQuestion,
  removeBookmarkQuestion,
};
