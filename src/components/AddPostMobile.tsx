import { AddIcon } from "../utilities/material-ui/material-icons";
import { Fab } from "../utilities/material-ui/material-components";

export function AddPostMobile({ handleOpen }: { handleOpen: () => void }) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        fontSize: 32,
        display: { xs: "block", md: "none" },
      }}
      onClick={handleOpen}
    >
      <AddIcon />
    </Fab>
  );
}
