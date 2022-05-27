import { CircularProgress } from "../utilities/material-ui/material-components";
export function DataLoader({ size }: { size: number }) {
  return (
    <CircularProgress size={size} sx={{ display: "block", margin: "auto" }} />
  );
}
