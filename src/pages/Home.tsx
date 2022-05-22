import { Box, Fab } from "../utilities/material-components";
import { DiscussionCardsSection } from "../components/DiscussionCardsSection";
import { Sidenav } from "../components/Sidenav";
import { TrendingSection } from "../components/TrendingSection";
import { AddIcon } from "../utilities/material-icons";
import { useState } from "react";

export function Home() {
  const [open, setOpen] = useState(false);
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
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: { xs: "block", md: "none" },
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
