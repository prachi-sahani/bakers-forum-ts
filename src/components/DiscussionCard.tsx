import * as React from "react";
import { styled } from "../utilities/material-styles";
import { IconButtonProps } from "@mui/material/IconButton";
import { grey } from "../utilities/material-colors";
import {
  CommentOutlinedIcon,
  ShareOutlinedIcon,
  BookmarkBorderOutlinedIcon,
  ChangeHistoryIcon,
} from "../utilities/material-icons";
import {
  Box,
  Button,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "../utilities/material-components";
import { Discussion } from "../types/Discussion";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface DiscussionCardProp {
  discussion: Discussion;
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

export function DiscussionCard({ discussion }: DiscussionCardProp) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ display: "flex" }}>
      <CardActions
        disableSpacing
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <IconButton aria-label="upvote" color="primary">
          <ChangeHistoryIcon sx={{ fontSize: "1.75rem" }} />
        </IconButton>
        <Typography variant="body1" color="primary">
          {discussion.votes}
        </Typography>
        <IconButton aria-label="downvote">
          <ChangeHistoryIcon
            sx={{ transform: "rotate(180deg)", fontSize: "1.75rem" }}
          />
        </IconButton>
      </CardActions>
      <Box sx={{ p: 1 }}>
        <CardHeader
          sx={{ p: 1 }}
          subheader={<Typography variant="h6">{discussion.title}</Typography>}
          title={
            <React.Fragment>
              <ListItem sx={{ p: 0 }}>
                <ListItemAvatar sx={{ minWidth: "2rem" }}>
                  <Avatar
                    alt={discussion.postedBy[1]}
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      bgcolor: grey[400],
                      height: "1.5rem",
                      width: "1.5rem",
                      fontSize: "1rem",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  secondary={`Posted by ${discussion.postedBy} | ${discussion.time}m ago`}
                />
              </ListItem>
            </React.Fragment>
          }
        />
        <CardContent sx={{ p: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {discussion.description}
          </Typography>
          <Box sx={{ display: "flex", my: 1, flexWrap: "wrap", gap: 1 }}>
            {discussion.tags.map((tag, index) => (
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
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
          {/* <CardContent>
            <ListItem sx={{ p: 0 }}>
              <ListItemAvatar sx={{ minWidth: "2rem" }}>
                <Avatar
                  alt={discussion.postedBy[1]}
                  src="/static/images/avatar/2.jpg"
                  sx={{ bgcolor: grey[300], color: blue[600], height: "1.5rem", width: "1.5rem", fontSize: "1rem" }}
                />
              </ListItemAvatar>
              <ListItemText primary={`${discussion.postedBy} | ${discussion.time}m ago`} />
            </ListItem>
            <Typography variant="body2" color="text.secondary">
              {discussion.description}
            </Typography>
          </CardContent> */}
          <Divider />
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start" sx={{ py: "4px", gap: 2 }}>
              <ListItemAvatar sx={{ minWidth: 0 }}>
                <Avatar
                  alt="Prachi Sahani"
                  sx={{
                    bgcolor: grey[400],
                    height: "2rem",
                    width: "2rem",
                    fontSize: "1rem",
                  }}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Prachi Sahani"
                secondary={
                  <Typography
                    component="div"
                    sx={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <Input
                      placeholder="Add a comment..."
                      sx={{ flexGrow: 1, fontSize: 14 }}
                    />
                    <Button variant="text" size="small" sx={{ ml: "auto" }}>
                      POST
                    </Button>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start" sx={{ py: "4px", gap: 2 }}>
              <ListItemAvatar sx={{ minWidth: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    bgcolor: grey[400],
                    height: "2rem",
                    width: "2rem",
                    fontSize: "1rem",
                  }}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Remy Sharp"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>

            <ListItem alignItems="flex-start" sx={{ py: "4px", gap: 2 }}>
              <ListItemAvatar sx={{ minWidth: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    bgcolor: grey[400],
                    height: "2rem",
                    width: "2rem",
                    fontSize: "1rem",
                  }}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Remy Sharp"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>

            <ListItem alignItems="flex-start" sx={{ py: "4px", gap: 2 }}>
              <ListItemAvatar sx={{ minWidth: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    bgcolor: grey[400],
                    height: "2rem",
                    width: "2rem",
                    fontSize: "1rem",
                  }}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Remy Sharp"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </Box>
    </Card>
  );
}
