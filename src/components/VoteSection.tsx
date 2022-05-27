import { ChangeHistoryIcon } from "../utilities/material-ui/material-icons";
import {
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from "../utilities/material-ui/material-components";
import { Vote } from "../types/Vote";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { addVote } from "../redux/slices/feedSlice";
import { RootState } from "../redux/store";
import { Question } from "../types/Question";

export function VoteSection({
  votes,
  id,
  question,
}: {
  votes: Vote;
  id: string;
  question: Question;
}) {
  const dispatch = useAppDispatch();
  const { authToken, userDetails } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const updateVote = (type: string, key: string) => {
    // if question is already upvoted or downvoted
    if (question.votes[key as keyof Vote].includes(userDetails.username)) {
      dispatch(addVote({ token: authToken, id, vote: "unvote" }));
    } else {
      dispatch(addVote({ token: authToken, id, vote: type }));
    }
  };

  const getVoteTooltipText = (type: string) => {
    const length = question.votes[type as keyof Vote].length;
    // Downvoted/upvoted by: user1, user2, user3
    let finalText =
      length > 0
        ? `@${question.votes[type as keyof Vote].slice(0, 3).join(", @")}`
        : `None`;
    // if number of votes more than 3 -> add  `+ "remaining users" more`
    if (length > 3) {
      finalText += ` + ${length - 3} more`;
    }
    return finalText;
  };

  return (
    <CardActions
      disableSpacing
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 0.5,
      }}
    >
      <Tooltip title={`Upvoted by: ${getVoteTooltipText("upvotedBy")}`}>
        <IconButton
          aria-label="upvote"
          color={
            question.votes.upvotedBy.includes(userDetails.username)
              ? "primary"
              : "default"
          }
          onClick={() => updateVote("upvote", "upvotedBy")}
        >
          <ChangeHistoryIcon sx={{ fontSize: "1.75rem" }} />
        </IconButton>
      </Tooltip>
      <Typography variant="body1" color="primary">
        {votes.upvotedBy.length - votes.downvotedBy.length}
      </Typography>
      <Tooltip title={`Downvote by: ${getVoteTooltipText("downvotedBy")}`}>
        <IconButton
          color={
            question.votes.downvotedBy.includes(userDetails.username)
              ? "primary"
              : "default"
          }
          aria-label="downvote"
          onClick={() => updateVote("downvote", "downvotedBy")}
        >
          <ChangeHistoryIcon
            sx={{ transform: "rotate(180deg)", fontSize: "1.75rem" }}
          />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}
