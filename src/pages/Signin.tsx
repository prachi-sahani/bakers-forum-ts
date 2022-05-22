import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "../utilities/material-ui/material-components";
import { LockOutlinedIcon } from "../utilities/material-ui/material-icons";
import { createTheme, ThemeProvider } from "../utilities/material-ui/material-styles";
import { Link } from "react-router-dom";

const theme = createTheme();

export function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            my: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Sign In
            </Button>
            <Typography variant="body2" align="center">
              OR
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In as Guest
            </Button>
            <Grid container>
              <Grid item xs sx={{ color: "blue[500]", fontSize: 14 }}>
                <Link to="" style={{ textDecoration: "none" }}>
                  <Typography component="span" color="primary" variant="body2">
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item sx={{ color: "blue[500]", fontSize: 14 }}>
                <Link to="/signUp" style={{ textDecoration: "none" }}>
                  <Typography component="span" color="primary" variant="body2">
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
