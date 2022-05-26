import { ChangeHistoryIcon } from "../utilities/material-ui/material-icons";
import {
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from "../utilities/material-ui/material-components";
import { Vote } from "../types/Vote";
export function VoteSection({ votes }: { votes: Vote }) {
  return (
    <CardActions
      disableSpacing
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 1 },
      }}
    >
      <Tooltip title="Upvote">
        <IconButton aria-label="upvote" color="primary" sx={{ px: { xs: 0 } }}>
          <ChangeHistoryIcon sx={{ fontSize: "1.75rem" }} />
        </IconButton>
      </Tooltip>
      <Typography variant="body1" color="primary">
        {votes.upvotedBy.length - votes.downvotedBy.length}
      </Typography>
      <Tooltip title="Downvote">
        <IconButton aria-label="downvote" sx={{ px: { xs: 0 } }}>
          <ChangeHistoryIcon
            sx={{ transform: "rotate(180deg)", fontSize: "1.75rem" }}
          />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}
