import {
  Button,
  LoadingButton,
  TextField,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "../utilities/material-ui/material-components";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { addQuestion } from "../redux/slices/feedSlice";
import { RootState } from "../redux/store";
import { NewQuestion } from "../types/NewQuestion";
import { FULFILLED, LOADING } from "../utilities/constants/api-status";

interface AddQuestionProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const tags = [
  "Cake",
  "Baking",
  "Baking Tools",
  "Recipes",
  "Cake Decoration",
  "Pastry",
  "Donuts",
  "Breads",
  "Wheat Bread",
  "Cookies",
  "Business",
  "Icing",
  "Experience",
  "Bakers",
];

interface AddQuestionErrorsType {
  questionTitleError: string;
  questionTextError: string;
  tagsError: string;
}
export function AddQuestionModal({ open, setOpen }: AddQuestionProp) {
  const dispatch = useAppDispatch();
  const { authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const { addQuestionAPIStatus } = useAppSelector(
    (state: RootState) => state.feed
  );
  const [addQuestionData, setAddQuestionData] = React.useState<NewQuestion>({
    questionTitle: "",
    questionText: "",
    tags: [],
  });
  const [addQuestionDataError, setAddQuestionDataError] =
    React.useState<AddQuestionErrorsType>({
      questionTitleError: "",
      questionTextError: "",
      tagsError: "",
    });

  useEffect(() => {
    if (addQuestionAPIStatus === FULFILLED) {
      handleClose();
    }
  }, [addQuestionAPIStatus]);
  const handleClose = () => {
    // reset form data
    setAddQuestionData({
      questionTitle: "",
      questionText: "",
      tags: [],
    });
    // reset errors
    setAddQuestionDataError({
      questionTitleError: "",
      questionTextError: "",
      tagsError: "",
    });
    setOpen(false);
  };

  const updateFormData = (type: string, value: string | string[]) => {
    setAddQuestionDataError({ ...addQuestionDataError, [`${type}Error`]: "" });
    if (type === "tags") {
      setAddQuestionData({ ...addQuestionData, [type]: [...value] });
    } else {
      setAddQuestionData({ ...addQuestionData, [type]: value });
    }
  };

  const postQuestion = () => {
    if (
      addQuestionData.questionTitle &&
      addQuestionData.questionText &&
      addQuestionData.tags.length <= 3
    ) {
      dispatch(addQuestion({ token: authToken, question: addQuestionData }));
    } else {
      let updatedErrorObj = { ...addQuestionDataError };
      Object.keys(addQuestionData).forEach((data) => {
        if (data === "tags") {
          // more than 3 tags not allowed
          if (addQuestionData.tags.length > 3) {
            updatedErrorObj = {
              ...updatedErrorObj,
              tagsError: "Upto three tags allowed",
            };
          }
        } else {
          if (!addQuestionData[data as keyof NewQuestion])
            updatedErrorObj = {
              ...updatedErrorObj,
              [`${data}Error`]: "Required",
            };
        }
        setAddQuestionDataError({ ...updatedErrorObj });
      });
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color="primary"> New Post</DialogTitle>
      <DialogContent sx={{ px: 3, py: 0 }}>
        <TextField
          id="question title"
          label="Post Title"
          placeholder="Title of the post"
          variant="standard"
          value={addQuestionData.questionTitle}
          fullWidth
          required
          autoFocus
          error={addQuestionDataError.questionTitleError !== ""}
          helperText={addQuestionDataError.questionTitleError}
          onChange={(event) =>
            updateFormData("questionTitle", event.target.value)
          }
          sx={{ my: 1 }}
          autoComplete="false"
        />
        <TextField
          id="question-text"
          label="Description"
          value={addQuestionData.questionText}
          placeholder="Write description of the post"
          multiline
          sx={{ mb: 1 }}
          rows={4}
          variant="standard"
          required
          error={addQuestionDataError.questionTextError !== ""}
          helperText={addQuestionDataError.questionTextError}
          onChange={(event) =>
            updateFormData("questionText", event.target.value)
          }
          fullWidth
          autoComplete="false"
        />
        <Autocomplete
          multiple
          size="small"
          freeSolo
          sx={{ my: 1 }}
          id="tags-standard"
          value={addQuestionData.tags}
          onChange={(event, value) => updateFormData("tags", value)}
          options={tags}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              error={addQuestionDataError.tagsError !== ""}
              helperText={addQuestionDataError.tagsError}
              placeholder="Choose 3 tags for the post"
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="text" type="button" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton
          loading={addQuestionAPIStatus === LOADING}
          variant="contained"
          type="button"
          onClick={postQuestion}
        >
          Post
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
