import React from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../redux/slices/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { CustomSnackbar, FullscreenLoader } from "../components/index";
import { FULFILLED, LOADING } from "../utilities/constants/api-status";

export function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({
    emailError: "",
    passwordError: "",
  });
  const { authStatus, authError, authToken } = useAppSelector(
    (state) => state.authentication
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // if user is already logged in and tries to access signin page, they will be redirected to previous page
    if (authToken) {
      navigate(-1);
    }
  }, []);

  React.useEffect(() => {
    if (authStatus === FULFILLED && authToken) {
      const lastState: any = location?.state;
      const lastRoute: string = lastState?.from?.pathname || "/feed";
      navigate(lastRoute);
    }
  }, [authStatus]);

  const signInUser = (type: string) => {
    if (type === "user") {
      if (!email || !password) {
        let updatedErrorObj = { ...error };
        if (!email) {
          updatedErrorObj = {
            ...updatedErrorObj,
            emailError: "Required Field",
          };
        }
        if (!password) {
          updatedErrorObj = {
            ...updatedErrorObj,
            passwordError: "Required Field",
          };
        }
        setError(updatedErrorObj);
      } else {
        dispatch(signIn({ email, password }));
      }
    } else if (type === "guest") {
      dispatch(signIn({ email: "sample.user@email.com", password: "123456" }));
    }
  };

  return (
    <React.Fragment>
      {authStatus === LOADING && <FullscreenLoader />}
      {authStatus === "error" && <CustomSnackbar message={authError} />}
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              helperText={error.emailError}
              error={error.emailError !== ""}
              onChange={(e) => {
                setEmail(e.target.value);
                setError({ ...error, emailError: "" });
              }}
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
              value={password}
              helperText={error.passwordError}
              error={error.passwordError !== ""}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, passwordError: "" });
              }}
            />
            <Button
              type="button"
              fullWidth
              onClick={() => signInUser("user")}
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Sign In
            </Button>
            <Typography variant="body2" align="center">
              OR
            </Typography>
            <Button
              type="button"
              onClick={() => signInUser("guest")}
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
    </React.Fragment>
  );
}
