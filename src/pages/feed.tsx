import { QuestionCardsSection } from "../components/index";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { getQuestions } from "../redux/slices/feedSlice";
import { RootState } from "../redux/store";
import { Question } from "../types/Question";
import { IDLE } from "../utilities/constants/api-status";

export function Feed() {
  const dispatch = useAppDispatch();
  const { questions, questionStatus, searchInput } = useAppSelector(
    (state: RootState) => state.feed
  );
  const { userDetails } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const [tagFilters, setTagFilters] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<string>("Latest");

  const [questionsToDisplay, setQuestionsToDisplay] = React.useState<
    Question[]
  >([]);

  const updateFilter = (tag: string, action: string) => {
    action === "add"
      ? setTagFilters((tags) => [...tags, tag])
      : setTagFilters((tags) => tags.filter((item) => tag !== item));
  };
  const updateSortBy = (sortType: string) => {
    setSortBy(sortType);
  };

  React.useEffect(() => {
    //  fetch questions from db if not already fetched
    if (questionStatus === IDLE) {
      dispatch(getQuestions());
    }
    //  questions posted by the accounts that the user follows and the ones that are not posted by the user
    let questionList =
      tagFilters.length > 0
        ? questions?.filter(
            (ques: Question) =>
              (userDetails.following.includes(ques.username) ||
                userDetails.username === ques.username) &&
              tagFilters.some(
                (tag) =>
                  ques.tags.includes(tag) &&
                  (ques.questionTitle.toLowerCase().includes(searchInput) ||
                  ques.questionText.toLowerCase().includes(searchInput) ||
                  ques.username.toLowerCase().includes(searchInput) ||
                  ques.tags.includes(searchInput))
              )
          )
        : questions?.filter(
            (ques: Question) =>
              (userDetails.following.includes(ques.username) ||
              userDetails.username === ques.username) && (
              ques.questionTitle.toLowerCase().includes(searchInput) ||
              ques.questionText.toLowerCase().includes(searchInput) ||
              ques.username.toLowerCase().includes(searchInput) ||
              ques.tags.includes(searchInput))
          );

    questionList?.sort((a, b) => {
      return sortBy === "Latest"
        ? new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
        : new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf();
    });
    setQuestionsToDisplay((value: Question[]) => (value = [...questionList]));
  }, [questions, tagFilters, sortBy, searchInput]);

  return (
    <QuestionCardsSection
      title="Latest Posts"
      questions={questionsToDisplay}
      tagFilters={tagFilters}
      updateFilter={updateFilter}
      sortBy={sortBy}
      updateSortBy={updateSortBy}
    />
  );
}
