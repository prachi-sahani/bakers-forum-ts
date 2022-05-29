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

export function TrendingSection() {
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
      users.filter(
        (user) =>
          !userDetails.following.includes(user.username) &&
          user.username !== userDetails.username
      )
    );
  }, [users]);

  const isFollowing = (username: string) => {
    // using userdetails from storage coz it has the updated data, once the user refreshes, state will also get updated - this is done to ensure that user can unfollow after following them
    return JSON.parse(localStorage.getItem("user") || "{}").following.includes(
      username
    );
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
                  onClick={() => {
                    setSelectedUsername(item.username);
                    dispatch(unfollowUser({ token: authToken, id: item._id }));
                  }}
                >
                  Unfollow
                </LoadingButton>
              ) : (
                <LoadingButton
                  size="small"
                  variant="text"
                  sx={{ fontSize: 12, textTransform: "none" }}
                  onClick={() => {
                    setSelectedUsername(item.username);
                    dispatch(followUser({ token: authToken, id: item._id }));
                  }}
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
        {followUserAPIStatus === FULFILLED && (
          <CustomSnackbar message={`Followed @${selectedUsername}`} />
        )}
        {unfollowUserAPIStatus === FULFILLED && (
          <CustomSnackbar message={`Unfollowed @${selectedUsername}`} />
        )}
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
