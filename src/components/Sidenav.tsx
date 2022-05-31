import {
  Box,
  Button,
  Icon,
  List,
  ListItemButton,
  ListItemText,
} from "../utilities/material-ui/material-components";
import React from "react";
import { AddQuestionModal } from "./AddQuestionModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";

const sidenavItem = [
  {
    icon: "feed",
    title: "Feed",
    route: "/feed",
  },
  {
    icon: "rocket",
    title: "Explore",
    route: "/explore",
  },
  {
    icon: "bookmark_border",
    title: "Bookmarks",
    route: "/bookmarks",
  },
  {
    icon: "notifications",
    title: "Notifications",
    route: "/notifications",
  },
  {
    icon: "account_circle",
    title: "Profile",
    route: "/profile",
  },
];

export function Sidenav({
  handleOpen,
  open,
  setOpen,
}: {
  handleOpen: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { authToken } = useAppSelector(
    (state: RootState) => state.authentication
  );

  const createNewPost = () => {
    authToken
      ? handleOpen()
      : navigate("/signin", { state: { from: location } });
  };
  return (
    <Box sx={{ flexShrink: 0, display: { xs: "none", md: "block" } }}>
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ p: 0 }}>
          {sidenavItem.map((text, index) => (
            <Link
              to={text.route}
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton selected={location.pathname === text.route}>
                <Icon sx={{ pr: 1 }} baseClassName="material-icons-outlined">
                  {text.icon}
                </Icon>
                <ListItemText
                  sx={{ textDecoration: "none" }}
                  primary={text.title}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <Button sx={{ m: 2 }} variant="contained" onClick={createNewPost}>
          Create New Post
        </Button>

        <AddQuestionModal open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
}
