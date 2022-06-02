import { QuestionCardsSection } from "../components/index";
import { Question } from "../types/Question";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
import { IDLE } from "../utilities/constants/api-status";
import { getQuestions } from "../redux/slices/feedSlice";

export function Explore() {
  const [selectedFilter, setSelectedFilter] =
    React.useState<string>("Latest");
  const dispatch = useAppDispatch();
  const { questions, questionStatus, searchInput } = useAppSelector(
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
    let questionList = [...questions];
    switch (selectedFilter) {
      case "Latest":
        // setQuestionsToDisplay(
        questionList.sort(
          (a, b) =>
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
        );
        // );
        break;
      case "Trending":
        // setQuestionsToDisplay(
        questionList.sort(
          (a, b) =>
            b.votes.upvotedBy.length -
            b.votes.downvotedBy.length -
            (a.votes.upvotedBy.length - a.votes.downvotedBy.length)
        );
        // );
        break;
      default:
        // setQuestionsToDisplay(
        questionList = questionList.filter(
          (ques) =>
            ques.questionTitle
              .toLowerCase()
              .includes(selectedFilter.toLowerCase()) ||
            ques.questionText
              .toLowerCase()
              .includes(selectedFilter.toLowerCase()) ||
            ques.tags.includes(selectedFilter)
        );
        break;
    }
    setQuestionsToDisplay(
      questionList.filter( ques =>
        ques.questionTitle.toLowerCase().includes(searchInput) ||
          ques.questionText.toLowerCase().includes(searchInput) ||
          ques.username.toLowerCase().includes(searchInput) ||
          ques.tags.includes(searchInput)
      )
    );
  }, [questions, selectedFilter,searchInput]);

  return (
    <QuestionCardsSection
      sortBy={selectedFilter}
      updateSortBy={updateSelectedFilter}
      title="Explore"
      questions={questionsToDisplay}
    />
  );
}
