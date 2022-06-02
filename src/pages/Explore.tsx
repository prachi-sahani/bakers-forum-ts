import { QuestionCardsSection } from "../components/index";
import { Question } from "../types/Question";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
import { IDLE } from "../utilities/constants/api-status";
import { getQuestions } from "../redux/slices/feedSlice";

export function Explore() {
  const [selectedFilter, setSelectedFilter] =
    React.useState<string>("Trending");
  const dispatch = useAppDispatch();
  const { questions, questionStatus } = useAppSelector(
    (state: RootState) => state.feed
  );
  const [questionsToDisplay, setQuestionsToDisplay] = React.useState<
    Question[]
  >([]);

  const updateSelectedFilter = (type: string) => {
    setSelectedFilter(type);
  };

  React.useEffect(() => {
    if (questionStatus === IDLE) {
      dispatch(getQuestions());
    }
    switch (selectedFilter) {
      case "Latest":
        setQuestionsToDisplay(
          [...questions].sort(
            (a, b) =>
              new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
          )
        );
        break;
      case "Trending":
        setQuestionsToDisplay(
          [...questions].sort(
            (a, b) =>
              b.votes.upvotedBy.length -
              b.votes.downvotedBy.length -
              (a.votes.upvotedBy.length - a.votes.downvotedBy.length)
          )
        );
        break;
      default:
        setQuestionsToDisplay(
          questions.filter(
            (ques) =>
              ques.questionTitle
                .toLowerCase()
                .includes(selectedFilter.toLowerCase()) ||
              ques.questionText
                .toLowerCase()
                .includes(selectedFilter.toLowerCase()) ||
              ques.tags.includes(selectedFilter)
          )
        );
        break;
    }
  }, [questions, selectedFilter]);

  return (
    <QuestionCardsSection
      sortBy={selectedFilter}
      updateSortBy={updateSelectedFilter}
      title="Explore"
      questions={questionsToDisplay}
    />
  );
}
