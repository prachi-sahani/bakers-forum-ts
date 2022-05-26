import { FeedOutlinedIcon } from "../utilities/material-ui/material-icons";
import { Box, Typography } from "../utilities/material-ui/material-components";
import { grey } from "../utilities/material-ui/material-colors";

export function NoPostsMessage({ message }: { message: string }) {
  return (
    <Box
      sx={{
        display: "block",
        margin: "auto",
        color: grey[600],
        textAlign: "center",
      }}
    >
      <FeedOutlinedIcon sx={{ fontSize: 60 }} />
      <Typography variant="h6" component="h6">
        {message}
      </Typography>
    </Box>
  );
}
