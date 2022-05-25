import {
  Snackbar,
  IconButton,
} from "../utilities/material-ui/material-components";
import { CloseIcon } from "../utilities/material-ui/material-icons";
import React from "react";
export function CustomSnackbar({ message }: { message: string }) {
  const [open, setOpen] = React.useState<boolean>(true);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      message={message || "Some error occurred. Try Again!"}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
