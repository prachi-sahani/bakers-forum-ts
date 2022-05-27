import { getAllUsers } from "../server-request/server-request";

// payload creator callback takes thunkAPI(rejectWithValue) as second argument and hence 1st argument as void
export const callGetAllUser = async (_: void, { rejectWithValue }: any) => {
  try {
    const { data } = await getAllUsers();
    console.log(data);
    return data.users;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};
