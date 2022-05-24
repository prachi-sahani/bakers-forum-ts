import {
  Button,
  TextField,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "../utilities/material-ui/material-components";
import React from "react";

interface AddQuestionProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const tags = ["Business", "Neogcamp", "Invact", "Roc8", "MBA", "Technology"];
export function AddQuestion({ open, setOpen }: AddQuestionProp) {
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color="primary"> New Post</DialogTitle>
      <DialogContent sx={{ px: 3, py: 0 }}>
        <TextField
          id="title"
          label="Post Title"
          placeholder="Title of the post"
          variant="standard"
          fullWidth
          autoFocus
          sx={{ my: 1 }}
          autoComplete="false"
        />
        <TextField
          id="description"
          label="Description"
          placeholder="Write description of the post"
          multiline
          sx={{ mb: 1 }}
          rows={4}
          variant="standard"
          fullWidth
          autoComplete="false"
        />
        <Autocomplete
          multiple
          size="small"
          sx={{ my: 1 }}
          id="tags-standard"
          options={tags}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              placeholder="Choose 3 tags for the post"
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained">Post</Button>
      </DialogActions>
    </Dialog>
  );
}
