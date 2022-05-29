import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../../utilities/constants/api-status";
import { Question } from "../../types/Question";
import {
  callAddComment,
  callAddQuestion,
  callAddVote,
  callGetAllQuestions,
  callGetAllVotes,
} from "../../utilities/services/feed";

interface FeedQuestionType {
  questions: Question[];
  questionStatus: string;
  questionError: string;
  addCommentAPIStatus: string;
  addCommentAPIError: string;
  getVotesAPIStatus: string;
  getVotesAPIError: string;
  addVoteAPIStatus: string;
  addVoteAPIError: string;
  addQuestionAPIStatus: string;
  addQuestionAPIError: string;
}

const initialData: FeedQuestionType = {
  questions: [],
  questionStatus: IDLE,
  questionError: "",
  addCommentAPIStatus: IDLE,
  addCommentAPIError: "",
  getVotesAPIStatus: IDLE,
  getVotesAPIError: "",
  addVoteAPIStatus: IDLE,
  addVoteAPIError: "",
  addQuestionAPIStatus: IDLE,
  addQuestionAPIError: "",
};

export const getQuestions = createAsyncThunk(
  "/feed/questions",
  callGetAllQuestions
);

export const addComment = createAsyncThunk("/feed/addComment", callAddComment);
export const getVotes = createAsyncThunk("/feed/getVotes", callGetAllVotes);
export const addVote = createAsyncThunk("/feed/addVote", callAddVote);
export const addQuestion = createAsyncThunk(
  "/feed/addQuestion",
  callAddQuestion
);

const feedSlice = createSlice({
  name: "feed",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state) => {
      state.questionStatus = LOADING;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questionStatus = FULFILLED;
      state.questions = [...action.payload];
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.questionStatus = ERROR;
      state.questionError = String(action.payload);
    });
    builder.addCase(addComment.pending, (state) => {
      state.addCommentAPIStatus = LOADING;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.addCommentAPIStatus = FULFILLED;
      state.questions = state.questions.map((question) => {
        return question._id === action.payload.questionID
          ? { ...question, comments: [...action.payload.comments] }
          : question;
      });
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.addCommentAPIStatus = ERROR;
      state.addCommentAPIError = String(action.payload);
    });
    builder.addCase(addVote.pending, (state) => {
      state.addVoteAPIStatus = LOADING;
    });
    builder.addCase(addVote.fulfilled, (state, action) => {
      state.addVoteAPIStatus = FULFILLED;
      state.questions = state.questions.map((question) => {
        return question._id === action.payload.questionID
          ? { ...question, votes: action.payload.votes }
          : question;
      });
    });
    builder.addCase(addVote.rejected, (state, action) => {
      state.addVoteAPIStatus = ERROR;
      state.addVoteAPIError = String(action.payload);
    });
    builder.addCase(addQuestion.pending, (state) => {
      state.addQuestionAPIStatus = LOADING;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.addQuestionAPIStatus = FULFILLED;
      state.questions = [...action.payload];
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.addQuestionAPIStatus = ERROR;
      state.addVoteAPIError = String(action.payload);
    });
  },
});

export default feedSlice.reducer;
