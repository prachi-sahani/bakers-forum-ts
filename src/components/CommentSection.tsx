import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
import { Question } from "../types/Question";
import { AddComment } from "./AddComment";
import { Comments } from "./Comments";
import {
  Collapse,
  Divider,
  List,
  Typography,
} from "../utilities/material-ui/material-components";
export function CommentSection({
  question,
  expanded,
}: {
  question: Question;
  expanded: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {authToken ? (
          <AddComment id={question._id} />
        ) : (
          <Typography
            variant="body1"
            p={1.5}
            color="primary"
            component="p"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/signin", { state: { from: location } })}
            fontWeight={600}
          >
            Sign in to comment
          </Typography>
        )}

        {question.comments.map((comment) => (
          <Comments comment={comment} key={comment._id} />
        ))}
      </List>
    </Collapse>
  );
}
