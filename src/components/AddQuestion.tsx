import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Autocomplete,
} from "../utilities/material-ui/material-components";
import React from "react";

interface AddQuestionProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
};

const tags = ["Business", "Neogcamp", "Invact", "Roc8", "MBA", "Technology"];
export function AddQuestion({ open, setOpen }: AddQuestionProp) {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          New Post
        </Typography>
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
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained">Post</Button>
        </Box>
      </Box>
    </Modal>
  );
}
