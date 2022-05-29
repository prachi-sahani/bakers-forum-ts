import {
  followUser,
  getAllUsers,
  unfollowUser,
} from "../server-request/server-request";

// payload creator callback takes thunkAPI(rejectWithValue) as second argument and hence 1st argument as void
const callGetAllUser = async (_: void, { rejectWithValue }: any) => {
  try {
    const { data } = await getAllUsers();
    return data.users;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callFollowUser = async (
  { token, id }: { token: string; id: string },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await followUser(token, id);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

const callUnfollowUser = async (
  { token, id }: { token: string; id: string },
  { rejectWithValue }: any
) => {
  try {
    const { data } = await unfollowUser(token, id);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
};

export { callFollowUser, callGetAllUser, callUnfollowUser };
