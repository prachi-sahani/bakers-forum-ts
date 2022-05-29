import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { getQuestions } from "../redux/slices/feedSlice";
import { RootState } from "../redux/store";
import { Question } from "../types/Question";
import { Box } from "../utilities/material-ui/material-components";
import { QuestionCardsSection } from "./QuestionCardsSection";
import { UserProfile } from "./UserProfile";

export function ProfileSection() {
  const { userDetails } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state: RootState) => state.feed);
  const [questionsToDisplay, setQuestionsToDisplay] = React.useState<
    Question[]
  >([]);

  React.useEffect(() => {
    if (questions.length === 0) {
      dispatch(getQuestions());
    }
  }, []);
  React.useEffect(() => {
    // questions posted by the user
    setQuestionsToDisplay((value: Question[]) =>
      questions?.filter(
        (ques: Question) => userDetails.username === ques.username
      )
    );
  }, [questions]);
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        gap: 2,
      }}
    >
      <UserProfile user={userDetails} />
      <QuestionCardsSection title="My Posts" questions={questionsToDisplay} />
    </Box>
  );
}
