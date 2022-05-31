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
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { signUp } from "../redux/slices/authenticationSlice";
import { SignUpDataToSend } from "../types/SignUpDataToSend";
import { CustomSnackbar, FullscreenLoader } from "../components/index";
import { FULFILLED, LOADING } from "../utilities/constants/api-status";
import { RootState } from "../redux/store";

export function SignUp() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { authStatus, authError, authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const [formData, setFormData] = React.useState<SignUpDataToSend>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    bio: "",
    followers: [],
    following: ["prachisahani"], // temporarily added dummy data to view post in user feed
  });
  const [error, setError] = React.useState({
    usernameError: "",
    passwordError: "",
    firstNameError: "",
    lastNameError: "",
  });

  React.useEffect(() => {
    if (authStatus === FULFILLED && authToken) {
      const lastState: any = location?.state;
      const lastRoute: string = lastState?.from?.pathname || "/feed";
      navigate(lastRoute);
    }
  }, [authStatus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formData.username &&
      formData.password &&
      formData.firstName &&
      formData.lastName
    ) {
      const dataToSend: SignUpDataToSend = {
        ...formData,
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
      };
      setFormData(dataToSend);
      dispatch(signUp(dataToSend));
    } else {
      let updatedErrorObj = { ...error };
      // check and set required error for each key in formData
      Object.keys(formData).forEach((item: string) => {
        let fieldValue = formData[item as keyof SignUpDataToSend];
        if (!fieldValue) {
          updatedErrorObj = {
            ...updatedErrorObj,
            [`${item}Error`]: "Required Field",
          };
        }
      });
      setError(updatedErrorObj);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  helperText={error.firstNameError}
                  error={error.firstNameError !== ""}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    setError({ ...error, firstNameError: "" });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  value={formData.lastName}
                  helperText={error.lastNameError}
                  error={error.lastNameError !== ""}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                    setError({ ...error, lastNameError: "" });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="off"
                  value={formData.username}
                  helperText={error.usernameError}
                  error={error.usernameError !== ""}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    setError({ ...error, usernameError: "" });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="bio"
                  label="Bio"
                  name="bio"
                  autoComplete="off"
                  value={formData.bio}
                  onChange={(e) => {
                    setFormData({ ...formData, bio: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={formData.password}
                  helperText={error.passwordError}
                  error={error.passwordError !== ""}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setError({ ...error, passwordError: "" });
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signIn" style={{ textDecoration: "none" }}>
                  <Typography component="span" color="primary" variant="body2">
                    Already have an account? Sign In
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
