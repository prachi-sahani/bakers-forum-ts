import { getAllQuestions } from "../server-request/server-request";

// payload creator callback takes thunkAPI(rejectWithValue) as second argument and hence 1st argument as void
export const callGetAllQuestions = async (
  _: void,
  { rejectWithValue }: any
) => {
  try {
    const { data } = await getAllQuestions();
    return data.questions;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};
