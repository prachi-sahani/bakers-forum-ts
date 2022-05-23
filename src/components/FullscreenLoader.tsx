import {
  Backdrop,
  CircularProgress,
} from "../utilities/material-ui/material-components";
import { blue } from "../utilities/material-ui/material-colors";

export function FullscreenLoader() {
  return (
    <Backdrop open sx={{ color: blue[500], zIndex: 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
