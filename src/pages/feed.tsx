import { Box } from "../utilities/material-ui/material-components";
import {
  DiscussionCardsSection,
  TrendingSection,
  AddPostMobile,
  Sidenav,
} from "../components/index";
import React from "react";

export function Feed() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box
      sx={{
        display: "flex",
        p: { md: 0, xs: 2 },
        py: { md: 1 },
        gap: 2,
        pr: { md: 2 },
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
      component="main"
    >
      <Sidenav handleOpen={handleOpen} open={open} setOpen={setOpen} />
      <DiscussionCardsSection title="Latest Posts" />
      <TrendingSection />
      <AddPostMobile handleOpen={handleOpen} />
    </Box>
  );
}
