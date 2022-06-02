import "./App.css";
import { Router } from "./Router";
import { Box } from "./utilities/material-ui/material-components";
import {
  Navbar,
  TrendingSection,
  AddPostMobile,
  Sidenav,
} from "./components/index";
import React from "react";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <React.Fragment>
      <Navbar />
      {location.pathname === "/signIn" ||
      location.pathname === "/signUp" ||
      location.pathname === "/" ? (
        <Router />
      ) : (
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
          <Router />
          <TrendingSection />
          <AddPostMobile handleOpen={handleOpen} />
        </Box>
      )}
    </React.Fragment>
  );
}

export default App;
