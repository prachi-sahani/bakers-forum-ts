import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../../utilities/constants/api-status";
import { Question } from "../../types/Question";
import { callGetAllQuestions } from "../../utilities/services/feed";

interface FeedQuestionType {
  questions: Question[];
  questionStatus:
    | typeof IDLE
    | typeof FULFILLED
    | typeof LOADING
    | typeof ERROR;
  questionError: string;
}

const initialData: FeedQuestionType = {
  questions: [],
  questionStatus: IDLE,
  questionError: "",
};

export const getQuestions = createAsyncThunk(
  "/feed/questions",
  callGetAllQuestions
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
      state.questionError = String(action.payload);
    });
  },
});

export default feedSlice.reducer;
