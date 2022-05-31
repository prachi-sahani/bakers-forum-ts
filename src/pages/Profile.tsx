import { Box } from "../utilities/material-ui/material-components";
import {
  ProfileSection,
  TrendingSection,
  AddPostMobile,
  Sidenav,
} from "../components/index";
import React from "react";

export function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box
      sx={{
        display: "flex",
        p: { md: "0 1rem 0 0", xs: "1rem" },
        gap: 2,
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
      component="main"
    >
      <Sidenav handleOpen={handleOpen} open={open} setOpen={setOpen} />
      <ProfileSection />
      <TrendingSection />
      <AddPostMobile handleOpen={handleOpen} />
    </Box>
  );
}
