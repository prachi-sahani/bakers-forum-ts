import React from "react";
import { SignUpDataToSend } from "../types/SignUpDataToSend";
import { UserDetails } from "../types/UserDetails";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  LoadingButton,
  Button,
} from "../utilities/material-ui/material-components";
import { Buffer } from "buffer";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { editUser } from "../redux/slices/authenticationSlice";
import { RootState } from "../redux/store";
interface EditProfileProp {
  openEditProfile: boolean;
  setOpenEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserDetails;
}

export function EditProfile({
  openEditProfile,
  setOpenEditProfile,
  user,
}: EditProfileProp) {
  const dispatch = useAppDispatch();
  const { authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const [formData, setFormData] = React.useState<SignUpDataToSend>({
    username: user.username,
    password: Buffer.from(user.password, "base64").toString("ascii"), // decode password
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    followers: [...user.followers],
    following: [...user.following],
  });

  const [error, setError] = React.useState({
    passwordError: "",
    firstNameError: "",
    lastNameError: "",
  });
  const closeEditProfile = () => {
    // reset data to initial value before closing
    setFormData({
      username: user.username,
      password: Buffer.from(user.password, "base64").toString("ascii"), // decode password
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      followers: [...user.followers],
      following: [...user.following],
    });
    setError({
      passwordError: "",
      firstNameError: "",
      lastNameError: "",
    });
    setOpenEditProfile(false);
  };
  const updateProfile = () => {
    if (
      formData.password &&
      formData.firstName &&
      formData.lastName
    ) {
      const dataToSend: SignUpDataToSend = {
        ...formData,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
      };
      setFormData(dataToSend);
      dispatch(editUser({ token: authToken, dataToSend }));
      setOpenEditProfile(false);
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
    <Dialog open={openEditProfile} onClose={closeEditProfile} fullWidth>
      <DialogTitle color="primary"> Edit Profile</DialogTitle>
      <DialogContent sx={{ px: 3, py: 0 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          variant="standard"
          id="first-name"
          label="First Name"
          name="first-name"
          autoComplete="off"
          autoFocus
          value={formData.firstName}
          helperText={error.firstNameError}
          error={error.firstNameError !== ""}
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
            setError({ ...error, firstNameError: "" });
          }}
        />
        <TextField
          margin="normal"
          required
          variant="standard"
          fullWidth
          id="last-name"
          label="Last Name"
          name="last-name"
          autoComplete="off"
          autoFocus
          value={formData.lastName}
          helperText={error.lastNameError}
          error={error.lastNameError !== ""}
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
            setError({ ...error, lastNameError: "" });
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="bio"
          variant="standard"
          label="Bio"
          name="bio"
          autoComplete="off"
          autoFocus
          value={formData.bio}
          onChange={(e) => {
            setFormData({ ...formData, bio: e.target.value });
          }}
        />
        <TextField
          margin="normal"
          variant="standard"
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
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="text" type="button" onClick={closeEditProfile}>
          Cancel
        </Button>
        <LoadingButton
          // loading={addQuestionAPIStatus === LOADING}
          variant="contained"
          type="button"
          onClick={updateProfile}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
