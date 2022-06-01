import { Box } from "../utilities/material-ui/material-components";
import {
  QuestionCardsSection,
  TrendingSection,
  AddPostMobile,
  Sidenav,
} from "../components/index";
import { Question } from "../types/Question";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
import { IDLE } from "../utilities/constants/api-status";
import { getQuestions } from "../redux/slices/feedSlice";

export function Explore() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useAppDispatch();
  const { questions, questionStatus } = useAppSelector(
    (state: RootState) => state.feed
  );
  const [questionsToDisplay, setQuestionsToDisplay] = React.useState<
    Question[]
  >([]);

  React.useEffect(() => {
    if (questionStatus === IDLE) {
      dispatch(getQuestions());
    }
    setQuestionsToDisplay(questions);
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
      <QuestionCardsSection title="Explore" questions={questionsToDisplay} />
      <TrendingSection />
      <AddPostMobile handleOpen={handleOpen} />
    </Box>
  );
}
