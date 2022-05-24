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
import { CustomSnackbar } from "../components/CustomSnackbar";
import { FullscreenLoader } from "../components/FullscreenLoader";
import { FULFILLED, LOADING } from "../utilities/constants/api-status";

export function SignUp() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { authStatus, authError, authToken } = useAppSelector(
    (state) => state.authentication
  );
  const [formData, setFormData] = React.useState<SignUpDataToSend>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = React.useState({
    emailError: "",
    passwordError: "",
    firstNameError: "",
    lastNameError: "",
  });
  React.useEffect(() => {
    // if user is already logged in and tries to access signup page, they will be redirected to previous page
    if (authToken) {
      navigate(-1);
    }
  }, []);
  React.useEffect(() => {
    if (authStatus === FULFILLED && authToken) {
      const lastState: any = location?.state;
      const lastRoute: string = lastState?.from?.pathname || "/home";
      navigate(lastRoute);
    }
  }, [authStatus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formData.email &&
      formData.password &&
      formData.firstName &&
      formData.lastName
    ) {
      const dataToSend: SignUpDataToSend = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      setFormData(dataToSend);
      dispatch(signUp(dataToSend));
    } else {
      let updatedErrorObj = { ...error };
      if (!formData.email) {
        updatedErrorObj = {
          ...updatedErrorObj,
          emailError: "Required Field",
        };
      }
      if (!formData.password) {
        updatedErrorObj = {
          ...updatedErrorObj,
          passwordError: "Required Field",
        };
      }
      if (!formData.firstName) {
        updatedErrorObj = {
          ...updatedErrorObj,
          firstNameError: "Required Field",
        };
      }
      if (!formData.lastName) {
        updatedErrorObj = {
          ...updatedErrorObj,
          lastNameError: "Required Field",
        };
      }
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
                  autoComplete="given-name"
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
                  autoComplete="family-name"
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  helperText={error.emailError}
                  error={error.emailError !== ""}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setError({ ...error, emailError: "" });
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
                  autoComplete="new-password"
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
