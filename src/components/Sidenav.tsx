import {
  Box,
  Button,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "../utilities/material-ui/material-components";
import React from "react";
import { AddQuestionModal } from "./AddQuestionModal";

const sidenavItem = [
  {
    icon: "feed",
    title: "Feed",
  },
  {
    icon: "rocket",
    title: "Explore",
  },
  {
    icon: "bookmark_border",
    title: "Bookmarks",
  },
  {
    icon: "notifications",
    title: "Notifications",
  },
  {
    icon: "account_circle",
    title: "Profile",
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
  return (
    <Box sx={{ flexShrink: 0, display: { xs: "none", md: "block" } }}>
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ p: 0 }}>
          {sidenavItem.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Icon sx={{ pr: 1 }} baseClassName="material-icons-outlined">
                  {text.icon}
                </Icon>
                <ListItemText primary={text.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button sx={{ m: 2 }} variant="contained" onClick={handleOpen}>
          Create New Post
        </Button>

        <AddQuestionModal open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
}
