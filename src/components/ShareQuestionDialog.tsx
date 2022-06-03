import { grey } from "../utilities/material-ui/material-colors";
import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  InputBase,
  IconButton,
  Tooltip,
} from "../utilities/material-ui/material-components";
import {
  ContentCopyIcon,
  CloseIcon,
  CheckIcon,
} from "../utilities/material-ui/material-icons";

export function ShareQuestionDialog({
  questionLink,
  open,
  handleClose,
}: {
  questionLink: string;
  open: boolean;
  handleClose: (value: boolean) => void;
}) {
  const [copiedToClipboard, setCopiedToClipboard] =
    React.useState<boolean>(false);

  const closeShareDialog = () => {
    handleClose(false);
    setCopiedToClipboard(false);
  };
  const copyLinkToClipboard = () => {
    setCopiedToClipboard(true);
    navigator.clipboard.writeText(questionLink);
    setTimeout(() => setCopiedToClipboard(false), 3000);
  };

  return (
    <Dialog
      open={open}
      onClose={closeShareDialog}
      fullWidth
      scroll="paper"
      sx={{ p: 1 }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pr: 1,
          }}
        >
          <Typography variant="h6">Copy to Clipboard</Typography>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={closeShareDialog}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            border: "1px solid",
            borderColor: grey[200],
            borderRadius: 1,
            backgroundColor: grey[100],
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflowX: "hidden",
            gap: 2,
            height: "min-content",
            py: 0.5,
            px: 1,
            mb: 1.5,
          }}
        >
          <InputBase
            sx={{ flexGrow: 1, overflowX: "auto" }}
            id="component-outlined"
            value={questionLink}
            inputProps={{ readOnly: true }}
          />
          {copiedToClipboard ? (
            <Tooltip title="Copied">
              <IconButton
                aria-label="check"
                color="inherit"
                sx={{ ml: "auto", flexShrink: 0 }}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Copy">
              <IconButton
                aria-label="copy"
                color="inherit"
                sx={{ ml: "auto", flexShrink: 0 }}
                onClick={copyLinkToClipboard}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
