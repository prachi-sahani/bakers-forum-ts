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
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "../utilities/material-ui/material-components";
import { Question } from "../types/Question";
import { VoteSection } from "./VoteSection";
import { CommentSection } from "./CommentSection";
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
          <ExpandComments
            sx={{ m: 0 }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentOutlinedIcon />
          </ExpandComments>
          <IconButton aria-label="share">
            <ShareOutlinedIcon />
          </IconButton>
          <IconButton aria-label="bookmark">
            <BookmarkBorderOutlinedIcon />
          </IconButton>
        </CardActions>
        <CommentSection question={question} expanded={expanded} />
      </Box>
    </Card>
  );
}
