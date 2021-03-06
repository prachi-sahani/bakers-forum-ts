import { addBookmark } from "../../redux/slices/feedSlice";
import { Comment } from "../../types/Comment";
import { NewQuestion } from "../../types/NewQuestion";
import {
  addBookmarkQuestion,
  addComment,
  addNewQuestion,
  addVote,
  getAllQuestions,
  getAllVotes,
  removeBookmarkQuestion,
} from "../server-request/server-request";

// payload creator callback takes thunkAPI(rejectWithValue) as second argument and hence 1st argument as void
const callGetAllQuestions = async (_: void, { rejectWithValue }: any) => {
  try {
    const { data } = await getAllQuestions();
    return data.questions;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callAddComment = async (
  {
    token,
    id,
    commentData,
  }: { token: string; id: string; commentData: Comment },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await addComment(token, id, commentData);
    return { comments: data.comments, questionID: id };
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callGetAllVotes = async (id: string, { rejectWithValue }: any) => {
  try {
    const { data } = await getAllVotes(id);
    return data.votes;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callAddVote = async (
  { token, id, vote }: { token: string; id: string; vote: string },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await addVote(token, id, vote);
    return { votes: data.votes, questionID: id };
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callAddQuestion = async (
  { token, question }: { token: string; question: NewQuestion },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await addNewQuestion(token, question);
    return data.questions;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callAddBookmark = async (
  { token, questionId }: { token: string; questionId: string },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await addBookmarkQuestion(token, questionId);
    return data.question;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callRemoveBookmark = async (
  { token, questionId }: { token: string; questionId: string },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await removeBookmarkQuestion(token, questionId);
    return data.question;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

export {
  callGetAllQuestions,
  callAddComment,
  callGetAllVotes,
  callAddVote,
  callAddQuestion,
  callAddBookmark,
  callRemoveBookmark,
};
