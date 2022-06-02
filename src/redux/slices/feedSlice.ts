import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../../utilities/constants/api-status";
import { Question } from "../../types/Question";
import {
  callAddBookmark,
  callAddComment,
  callAddQuestion,
  callAddVote,
  callGetAllQuestions,
  callGetAllVotes,
  callRemoveBookmark,
} from "../../utilities/services/feed";

interface FeedQuestionType {
  searchInput: string;
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
  addBookmarkQuestionAPIStatus: string;
  addBookmarkQuestionAPIError: string;
  removeBookmarkQuestionAPIStatus: string;
  removeBookmarkQuestionAPIError: string;
}

const initialData: FeedQuestionType = {
  searchInput: "",
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
  addBookmarkQuestionAPIStatus: IDLE,
  addBookmarkQuestionAPIError: "",
  removeBookmarkQuestionAPIStatus: IDLE,
  removeBookmarkQuestionAPIError: "",
};

export const getQuestions = createAsyncThunk(
  "/feed/questions",
  callGetAllQuestions
);

export const addComment = createAsyncThunk("/feed/addComment", callAddComment);
export const getVotes = createAsyncThunk("/feed/getVotes", callGetAllVotes);
export const addVote = createAsyncThunk("/feed/addVote", callAddVote);
export const addBookmark = createAsyncThunk(
  "/feed/addBookmark",
  callAddBookmark
);
export const removeBookmark = createAsyncThunk(
  "/feed/removeBookmark",
  callRemoveBookmark
);
export const addQuestion = createAsyncThunk(
  "/feed/addQuestion",
  callAddQuestion
);

const feedSlice = createSlice({
  name: "feed",
  initialState: initialData,
  reducers: {
    updateSearch: (state, action) => {
      state.searchInput = action.payload.toLowerCase();
    },
  },
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
    builder.addCase(addBookmark.pending, (state) => {
      state.addBookmarkQuestionAPIStatus = LOADING;
    });
    builder.addCase(addBookmark.fulfilled, (state, action) => {
      state.addBookmarkQuestionAPIStatus = FULFILLED;
      state.questions = state.questions.map((question) =>
        question._id === action.payload._id ? action.payload : question
      );
    });
    builder.addCase(addBookmark.rejected, (state, action) => {
      state.addBookmarkQuestionAPIStatus = ERROR;
      state.addBookmarkQuestionAPIError = String(action.payload);
    });
    builder.addCase(removeBookmark.pending, (state) => {
      state.removeBookmarkQuestionAPIStatus = LOADING;
    });
    builder.addCase(removeBookmark.fulfilled, (state, action) => {
      state.removeBookmarkQuestionAPIStatus = FULFILLED;
      state.questions = state.questions.map((question) =>
        question._id === action.payload._id ? action.payload : question
      );
    });
    builder.addCase(removeBookmark.rejected, (state, action) => {
      state.removeBookmarkQuestionAPIStatus = ERROR;
      state.removeBookmarkQuestionAPIError = String(action.payload);
    });
  },
});

export const { updateSearch } = feedSlice.actions;
export default feedSlice.reducer;
