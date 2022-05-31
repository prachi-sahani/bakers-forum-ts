import { Box } from "../utilities/material-ui/material-components";
import {
  QuestionCardsSection,
  TrendingSection,
  AddPostMobile,
  Sidenav,
} from "../components/index";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { getQuestions } from "../redux/slices/feedSlice";
import { RootState } from "../redux/store";
import { Question } from "../types/Question";
import { IDLE } from "../utilities/constants/api-status";

export function Feed() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useAppDispatch();
  const { questions, questionStatus } = useAppSelector(
    (state: RootState) => state.feed
  );
  const { userDetails } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const [questionsToDisplay, setQuestionsToDisplay] = React.useState<
    Question[]
  >([]);

  React.useEffect(() => {
    //  fetch questions from db if not already fetched
    if (questionStatus === IDLE) {
      dispatch(getQuestions());
    }
    //  questions posted by the accounts that the user follows and the ones that are not posted by the user
    setQuestionsToDisplay((value: Question[]) =>
      questions?.filter((ques: Question) =>
        userDetails.following.includes(ques.username)
      )
    );
  }, [questions]);

  return (
    <Box
      sx={{
        display: "flex",
        p: { md: "0 1rem 0 0", xs: "1rem" },
        gap: 2,
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
      component="main"
    >
      <Sidenav handleOpen={handleOpen} open={open} setOpen={setOpen} />
      <QuestionCardsSection
        title="Latest Posts"
        questions={questionsToDisplay}
      />
      <TrendingSection />
      <AddPostMobile handleOpen={handleOpen} />
    </Box>
  );
}
