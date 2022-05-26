import { grey } from "../utilities/material-ui/material-colors";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { getUsers } from "../redux/slices/usersSlice";
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
  Button,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Typography,
} from "../utilities/material-ui/material-components";
import { DataLoader } from "./DataLoader";

export function TrendingSection() {
  const dispatch = useAppDispatch();
  const { users, usersAPIStatus } = useAppSelector(
    (state: RootState) => state.users
  );
  const { userDetails } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const [usersToDisplay, setUsersToDisplay] = React.useState<UserDetails[]>([]);
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
              <Button
                size="small"
                variant="text"
                sx={{ fontSize: 12, textTransform: "none" }}
              >
                Follow +
              </Button>
            </ListItem>
          ))}
        </List>
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
