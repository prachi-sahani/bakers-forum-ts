import { QuestionCardsSection } from "../components/index";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { getQuestions } from "../redux/slices/feedSlice";
import { RootState } from "../redux/store";
import { Question } from "../types/Question";
import { IDLE } from "../utilities/constants/api-status";

export function Bookmark() {
  const dispatch = useAppDispatch();
  const { questions, questionStatus, searchInput } = useAppSelector(
    (state: RootState) => state.feed
  );
  const [questionsToDisplay, setQuestionsToDisplay] = React.useState<
    Question[]
  >([]);

  React.useEffect(() => {
    //  fetch questions from db if not already fetched
    if (questionStatus === IDLE) {
      dispatch(getQuestions());
    }
    //  questions bookmarked by the user
    setQuestionsToDisplay((value: Question[]) =>
      questions?.filter(
        (ques: Question) =>
          ques.bookmarked &&
          (ques.questionTitle.toLowerCase().includes(searchInput) ||
            ques.questionText.toLowerCase().includes(searchInput) ||
            ques.username.toLowerCase().includes(searchInput) ||
            ques.tags.includes(searchInput))
      )
    );
  }, [questions,searchInput]);

  return (
    <QuestionCardsSection
      title="Your Bookmarks"
      questions={questionsToDisplay}
    />
  );
}
