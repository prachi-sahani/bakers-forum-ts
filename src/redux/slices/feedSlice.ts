import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllQuestions } from "../../utilities/server-request/server-request";
import { FULFILLED, IDLE, LOADING } from "../../utilities/constants/api-status";
import { Question } from "../../types/Question";

// payload creator callback takes thunkAPI(rejectWithValue) as second argument and hence 1st argument as void
const callGetAllQuestions = async (_: void, { rejectWithValue }: any) => {
  try {
    const { data } = await getAllQuestions();
    return data.questions;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

interface FeedQuestionType {
  questions: Question[];
  questionStatus: typeof IDLE | typeof FULFILLED | typeof LOADING;
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
      console.log(state.questions);
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.questionError = String(action.payload);
    });
  },
});

export default feedSlice.reducer;
