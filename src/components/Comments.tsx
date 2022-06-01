import { Comment } from "../types/Comment";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "../utilities/material-ui/material-components";
import { grey } from "../utilities/material-ui/material-colors";

export function Comments({ comment }: { comment: Comment }) {
  return (
    <ListItem alignItems="flex-start" sx={{ p: { xs: 0.5, md: 1 }, gap: 2 }}>
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
  );
}
