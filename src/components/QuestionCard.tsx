import * as React from "react";
import { styled } from "../utilities/material-ui/material-styles";
import { IconButtonProps } from "@mui/material/IconButton";
import { grey } from "../utilities/material-ui/material-colors";
import {
  CommentOutlinedIcon,
  ShareOutlinedIcon,
  BookmarkBorderOutlinedIcon,
} from "../utilities/material-ui/material-icons";
import {
  Box,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
  LoadingButton,
} from "../utilities/material-ui/material-components";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
import { Question } from "../types/Question";
import { VoteSection } from "./VoteSection";
import { addComment, getVotes } from "../redux/slices/feedSlice";
import { v4 as uuid } from "uuid";
import { LOADING, FULFILLED } from "../utilities/constants/api-status";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface QuestionCardProp {
  question: Question;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function QuestionCard({ question }: QuestionCardProp) {
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [commentError, setCommentError] = React.useState("");
  const dispatch = useAppDispatch();
  const { userDetails, authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const { addCommentAPIStatus } = useAppSelector(
    (state: RootState) => state.feed
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    if (addCommentAPIStatus === FULFILLED) {
      setComment("");
    }
  }, [addCommentAPIStatus]);
  return (
    <Card sx={{ display: "flex" }}>
      <VoteSection question={question} />
      <Box sx={{ p: 1, px: { xs: 0.5 }, flexGrow: 1 }}>
        <CardHeader
          sx={{ p: 1 }}
          subheader={
            <Typography variant="h6">{question.questionTitle}</Typography>
          }
          title={
            <React.Fragment>
              <ListItem sx={{ p: 0 }}>
                <ListItemAvatar sx={{ minWidth: "2rem" }}>
                  <Avatar
                    sx={{
                      bgcolor: grey[400],
                      height: "1.5rem",
                      width: "1.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    {question.username[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary={`Posted by @${question.username}`} />
              </ListItem>
            </React.Fragment>
          }
        />
        <CardContent sx={{ p: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {question.questionText}
          </Typography>
          <Box sx={{ display: "flex", my: 1, flexWrap: "wrap", gap: 1 }}>
            {question.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary"
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 0.5 },
          }}
        >
          <ExpandMore
            sx={{ m: 0 }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentOutlinedIcon />
          </ExpandMore>
          <IconButton aria-label="share">
            <ShareOutlinedIcon />
          </IconButton>
          <IconButton aria-label="bookmark">
            <BookmarkBorderOutlinedIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem
              alignItems="flex-start"
              sx={{ p: { xs: 0.5, md: 1 }, gap: 2 }}
            >
              <ListItemAvatar sx={{ minWidth: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: grey[400],
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
                      onClick={() => {
                        comment
                          ? dispatch(
                              addComment({
                                token: authToken,
                                id: question._id,
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
                      }}
                    >
                      POST
                    </LoadingButton>
                  </Typography>
                }
              />
            </ListItem>
            {question.comments.map((comment) => (
              <ListItem
                alignItems="flex-start"
                sx={{ p: { xs: 0.5, md: 1 }, gap: 2 }}
                key={comment._id}
              >
                <ListItemAvatar sx={{ minWidth: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: grey[400],
                      height: "2rem",
                      width: "2rem",
                      fontSize: "1rem",
                    }}
                  >
                    {comment.firstName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${comment.firstName} ${comment.lastName}`}
                  secondary={comment.commentText}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    </Card>
  );
}
