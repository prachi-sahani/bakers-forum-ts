import {
  Box,
  Button,
  Typography,
} from "../utilities/material-ui/material-components";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/customHook";

export function LandingPage() {
  const { authToken } = useAppSelector((state) => state.authentication);
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: "center",
        width: "100%",
        gap: 2,
        justifyContent: "center",
      }}
    >
      <Box
        component="div"
        sx={{
          width: { xs: "calc(100% - 2rem)", sm: "45%" },
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
          height: { xs: "max-content", sm: "calc(100vh - 48px - 3rem)" },
          justifyContent: { sm: "space-evenly", xs: "space-around" },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Bakers' Forum
        </Typography>
        <Box component="div">
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "blue[500]" }}
          >
            Meet you modern{" "}
          </Typography>
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            discussion board
          </Typography>
          <Typography variant="h6">
            Connect with bakers around the world and take your baking skills and
            business to next level
          </Typography>
        </Box>
        {authToken ? (
          <Box component="div">
            <Link to="/explore" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{ width: "max-content", display: "flex", my: 1 }}
              >
                EXPLORE NOW
              </Button>
            </Link>
          </Box>
        ) : (
          <Box component="div">
            <Link to="/signUp" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{ width: "max-content", display: "flex", my: 1 }}
              >
                JOIN NOW
              </Button>
            </Link>
            <Link to="/signIn" style={{ textDecoration: "none" }}>
              <Typography component="span" color="primary" variant="body1">
                Already have an account?
              </Typography>
            </Link>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: { sm: "70vh" },
          width: { xs: "calc(100% - 3rem)", sm: "50%" },
          p: 3,
        }}
      >
        <img
          src="/assets/hero-image.svg"
          alt="Landing Page"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
}
