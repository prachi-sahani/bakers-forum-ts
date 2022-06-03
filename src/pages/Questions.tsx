import React from "react";
import { useParams } from "react-router-dom";
import { DataLoader, QuestionCard } from "../components";
import { Question } from "../types/Question";
import { getQuestion } from "../utilities/server-request/server-request";
import { Box } from "../utilities/material-ui/material-components";
import { useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
export function Questions() {
  const [question, setQuestion] = React.useState<Question | undefined>();
  const { questions } = useAppSelector((state: RootState) => state.feed);
  const { questionId } = useParams<string>();

  React.useEffect(() => {
    (async () => {
      if (questionId) {
        const { data } = await getQuestion(questionId);
        setQuestion(data.question);
      }
    })();
  }, [questions]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        gap: 2,
      }}
    >
      {question ? (
        <QuestionCard question={question} />
      ) : (
        <DataLoader size={50} />
      )}
    </Box>
  );
}
