import * as React from "react";
import {
  Box,
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "../utilities/material-components";
import { LogoutIcon } from "../utilities/material-icons";
import { Link, useLocation } from "react-router-dom";
const settings = ["Explore", "Bookmarks", "Notifications", "Profile", "Logout"];

export function Navbar() {
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar disableGutters variant="dense" sx={{ px: 2 }}>
        <Link to="/">
          <Box sx={{ display: { xs: "none", md: "flex" }, height: "2rem" }}>
            <img src="assets/logo.png" alt="Bakers' Forum" />
          </Box>
        </Link>
        <Link to="/">
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              height: "1.5rem",
            }}
          >
            <img src="assets/logo.png" alt="Bakers' Forum" />
          </Box>
        </Link>

        {location.pathname === "/home" && (
          <Box
            sx={{
              flexGrow: 0,
              ml: "auto",
              pr: 1.5,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tooltip title="Logout">
              <IconButton>
                <LogoutIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {location.pathname !== "/" && (
          <Box
            sx={{
              flexGrow: 0,
              ml: "auto",
              display: { xs: "flex", md: "none" },
            }}
          >
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ height: "2rem", width: "2rem" }}
                  alt="User"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "28px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  sx={{ pr: 3 }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
