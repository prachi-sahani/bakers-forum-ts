import { grey } from "../utilities/material-ui/material-colors";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { followUser, getUsers, unfollowUser } from "../redux/slices/usersSlice";
import { RootState } from "../redux/store";
import { UserDetails } from "../types/UserDetails";
import {
  ERROR,
  FULFILLED,
  IDLE,
  LOADING,
} from "../utilities/constants/api-status";
import {
  Box,
  LoadingButton,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Typography,
} from "../utilities/material-ui/material-components";
import { DataLoader } from "./DataLoader";
import { CustomSnackbar } from "./CustomSnackbar";
import { useLocation, useNavigate } from "react-router-dom";

export function TrendingSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    users,
    usersAPIStatus,
    followUserAPIStatus,
    unfollowUserAPIStatus,
    followUserAPIError,
    unfollowUserAPIError,
  } = useAppSelector((state: RootState) => state.users);
  const { userDetails, authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const [usersToDisplay, setUsersToDisplay] = React.useState<UserDetails[]>([]);
  const [selectedUsername, setSelectedUsername] = React.useState<string>("");
  React.useEffect(() => {
    if (usersAPIStatus === IDLE) {
      dispatch(getUsers());
    }
  }, []);

  React.useEffect(() => {
    setUsersToDisplay(
      authToken
        ? users.filter(
            (user) =>
              !userDetails.following.includes(user.username) &&
              user.username !== userDetails.username
          )
        : users
    );
  }, [users]);

  const isFollowing = (username: string) => {
    // list of accounts that user follows
    const userFollowingList = JSON.parse(
      localStorage.getItem("user") || "{}"
    )?.following;
    // using userdetails from storage coz it has the updated data, once the user refreshes, state will also get updated - this is done to ensure that user can unfollow after following them
    return userFollowingList ? userFollowingList.includes(username) : false;
  };

  const followUnfollowUser = (type: string, item: UserDetails) => {
    if (authToken) {
      setSelectedUsername(item.username);
      if (type === "unfollow") {
        dispatch(unfollowUser({ token: authToken, id: item._id }));
      } else {
        dispatch(followUser({ token: authToken, id: item._id }));
      }
    } else {
      navigate("/signin", { state: { from: location } });
    }
  };
  return (
    <Box sx={{ p: 1, minWidth: "20%" }}>
      <OutlinedInput
        fullWidth
        placeholder="Search posts, people, anything"
        sx={{ fontSize: 14 }}
        inputProps={{ style: { padding: 6 } }}
      />
      <Box sx={{ my: 2, display: { xs: "none", md: "block" } }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          You may also know
        </Typography>
        <List>
          {usersToDisplay.map((item, index) => (
            <ListItem sx={{ p: 0 }} key={index}>
              <ListItemText secondary={`@${item.username}`} />
              {isFollowing(item.username) ? (
                <LoadingButton
                  size="small"
                  variant="text"
                  sx={{ fontSize: 12, textTransform: "none" }}
                  loading={
                    unfollowUserAPIStatus === LOADING &&
                    selectedUsername === item.username
                  }
                  onClick={() => followUnfollowUser("follow", item)}
                >
                  Unfollow
                </LoadingButton>
              ) : (
                <LoadingButton
                  size="small"
                  variant="text"
                  sx={{ fontSize: 12, textTransform: "none" }}
                  onClick={() => followUnfollowUser("follow", item)}
                  loading={
                    followUserAPIStatus === LOADING &&
                    selectedUsername === item.username
                  }
                >
                  Follow +
                </LoadingButton>
              )}
            </ListItem>
          ))}
        </List>
        {followUserAPIStatus === ERROR && (
          <CustomSnackbar message={followUserAPIError} />
        )}
        {unfollowUserAPIStatus === ERROR && (
          <CustomSnackbar message={unfollowUserAPIError} />
        )}
        {usersToDisplay.length === 0 && usersAPIStatus === FULFILLED && (
          <Typography variant="caption" sx={{ color: grey[600] }}>
            No users to display
          </Typography>
        )}
        {usersAPIStatus === ERROR && (
          <Typography variant="caption" sx={{ color: grey[600] }}>
            Some error occurred. Try reloading!
          </Typography>
        )}
        {usersAPIStatus === LOADING && <DataLoader size={25} />}
      </Box>
    </Box>
  );
}
