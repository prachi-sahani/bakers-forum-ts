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
        p: { md: 0, xs: 2 },
        gap: 2,
        pr: { md: 2 },
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
