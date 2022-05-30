import {
  Box,
  Avatar,
  Typography,
  Button,
} from "../utilities/material-ui/material-components";
import { grey } from "../utilities/material-ui/material-colors";
import { UserDetails } from "../types/UserDetails";
import { EditProfile } from "./EditProfile";
import React from "react";
export function UserProfile({ user }: { user: UserDetails }) {
  const [openEditProfile, setOpenEditProfile] = React.useState(false);
  const openEditModal = () => setOpenEditProfile(true);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        py: 1,
      }}
    >
      <Avatar sx={{ height: "3rem", width: "3rem", fontSize: "1,5rem" }}>
        {user.firstName[0]}
      </Avatar>
      <Box textAlign="center">
        <Typography variant="h5" sx={{ color: grey[900] }}>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography variant="body1" sx={{ color: grey[700] }}>
          @{user.username}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          color: grey[700],
        }}
      >
        <Typography variant="body2">23 posts</Typography>
        <Typography variant="body2">
          {user.followers.length} followers
        </Typography>
        <Typography variant="body2">
          {user.following.length} following
        </Typography>
      </Box>
      <Button
        variant="outlined"
        size="small"
        sx={{ textTransform: "none" }}
        onClick={openEditModal}
      >
        Edit Profile
      </Button>
      <EditProfile
        openEditProfile={openEditProfile}
        setOpenEditProfile={setOpenEditProfile}
        user={user}
      />
      <Typography variant="body2" sx={{ color: grey[600] }} textAlign="center">
        {user.bio}
      </Typography>
    </Box>
  );
}
