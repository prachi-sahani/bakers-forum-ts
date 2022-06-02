import * as React from "react";
import { styled } from "../utilities/material-ui/material-styles";
import { IconButtonProps } from "@mui/material/IconButton";
import { grey } from "../utilities/material-ui/material-colors";
import {
  CommentOutlinedIcon,
  ShareOutlinedIcon,
  BookmarkBorderOutlinedIcon,
  BookmarkIcon,
} from "../utilities/material-ui/material-icons";
import {
  Box,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Tooltip,
} from "../utilities/material-ui/material-components";
import { Question } from "../types/Question";
import { VoteSection } from "./VoteSection";
import { CommentSection } from "./CommentSection";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { addBookmark, removeBookmark } from "../redux/slices/feedSlice";
import { RootState } from "../redux/store";
interface ExpandCommentsProps extends IconButtonProps {
  expand: boolean;
}

interface QuestionCardProp {
  question: Question;
}

const ExpandComments = styled((props: ExpandCommentsProps) => {
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
  const dispatch = useAppDispatch();
  const { authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                      backgroundColor: grey[400],
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
          <ExpandComments
            sx={{ m: 0 }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Tooltip title="Comments">
              <CommentOutlinedIcon />
            </Tooltip>
          </ExpandComments>
          <Tooltip title="Share">
            <IconButton aria-label="share">
              <ShareOutlinedIcon />
            </IconButton>
          </Tooltip>
          {question.bookmarked && authToken ? (
            <Tooltip title="Remove Bookmark">
              <IconButton
                aria-label="bookmark"
                onClick={() =>
                  dispatch(
                    removeBookmark({
                      token: authToken,
                      questionId: question._id,
                    })
                  )
                }
              >
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add Bookmark">
              <IconButton
                aria-label="bookmark"
                onClick={() =>
                  dispatch(
                    addBookmark({ token: authToken, questionId: question._id })
                  )
                }
              >
                <BookmarkBorderOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
        <CommentSection question={question} expanded={expanded} />
      </Box>
    </Card>
  );
}
