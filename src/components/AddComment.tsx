import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
import { FULFILLED, LOADING } from "../utilities/constants/api-status";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
  LoadingButton,
} from "../utilities/material-ui/material-components";
import { grey } from "../utilities/material-ui/material-colors";
import { addComment } from "../redux/slices/feedSlice";
import { v4 as uuid } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

export function AddComment({ id }: { id: string }) {
  const location = useLocation();
  const { userDetails, authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const [commentError, setCommentError] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addCommentAPIStatus } = useAppSelector(
    (state: RootState) => state.feed
  );
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    if (addCommentAPIStatus === FULFILLED) {
      setComment("");
    }
  }, [addCommentAPIStatus]);

  const addNewComment = () => {
    if (authToken) {
      comment
        ? dispatch(
            addComment({
              token: authToken,
              id,
              commentData: {
                _id: uuid(),
                username: userDetails.username,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                commentText: comment,
              },
            })
          )
        : setCommentError("Required");
    } else {
      navigate("/signin", { state: { from: location } });
    }
  };

  return (
    <ListItem alignItems="flex-start" sx={{ p: { xs: 0.5, md: 1 }, gap: 2 }}>
      <ListItemAvatar sx={{ minWidth: 0 }}>
        <Avatar
          sx={{
            backgroundColor: grey[400],
            height: "2rem",
            width: "2rem",
            fontSize: "1rem",
          }}
        >
          {userDetails.firstName[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${userDetails.firstName} ${userDetails.lastName}`}
        secondary={
          <Typography
            component="div"
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            <TextField
              placeholder="Add a comment..."
              variant="standard"
              multiline
              value={comment}
              sx={{ flexGrow: 1, fontSize: 14 }}
              error={commentError !== ""}
              helperText={commentError}
              onChange={(e) => {
                setComment(e.target.value);
                setCommentError("");
              }}
            />
            <LoadingButton
              loading={addCommentAPIStatus === LOADING}
              variant="text"
              size="small"
              sx={{ ml: "auto" }}
              onClick={addNewComment}
            >
              POST
            </LoadingButton>
          </Typography>
        }
      />
    </ListItem>
  );
}
