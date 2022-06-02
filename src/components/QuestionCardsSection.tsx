import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  ToggleButton,
} from "../utilities/material-ui/material-components";
import { QuestionCard } from "./QuestionCard";
import { FilterListIcon } from "../utilities/material-ui/material-icons";
import React from "react";
import { Filters } from "./Filters";
import { Question } from "../types/Question";
import { useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
import { ERROR, FULFILLED, LOADING } from "../utilities/constants/api-status";
import { DataLoader } from "./DataLoader";
import { NoPostsMessage } from "./NoPostsMessage";
import { grey } from "../utilities/material-ui/material-colors";
import { useLocation } from "react-router-dom";
import { tags } from "../utilities/data/tags";

export function QuestionCardsSection({
  title,
  questions,
}: {
  title: string;
  questions: Question[] | null;
}) {
  const location = useLocation();
  const { questionStatus } = useAppSelector((state: RootState) => state.feed);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {questions && questions?.length > 0 && location.pathname === "/feed" && (
          <React.Fragment>
            <Tooltip title="Filters">
              <IconButton
                aria-label="filter"
                aria-describedby={id}
                onClick={handleClick}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Filters
              open={open}
              id={id}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            />
          </React.Fragment>
        )}
      </Box>
      {/* for now this is static */}
      {location.pathname === "/explore" && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {tags.map((tag, index) => (
            <ToggleButton
              key={index}
              value="check"
              sx={{ py: 0.5 }}
              size="small"
              color="primary"
              selected={index % 4 === 0}
              // onChange={() => {
              //   setSelected(!selected);
              // }}
            >
              {tag}
            </ToggleButton>
          ))}
        </Box>
      )}
      {questions &&
        questions?.length > 0 &&
        questions?.map((question) => (
          <QuestionCard question={question} key={question._id} />
        ))}
      {questionStatus === LOADING && <DataLoader size={50} />}
      {questionStatus === FULFILLED &&
        questions?.length === 0 &&
        location.pathname === "/feed" && (
          <NoPostsMessage message="Start following fellow bakers to view their posts" />
        )}
      {questionStatus === FULFILLED &&
        questions?.length === 0 &&
        (location.pathname === "/profile" ||
          location.pathname === "/bookmarks") && (
          <NoPostsMessage message="No posts found" />
        )}
      {questionStatus === ERROR && (
        <Typography variant="body1" sx={{ color: grey[600] }}>
          Some error occurred. Try reloading!
        </Typography>
      )}
    </Box>
  );
}
