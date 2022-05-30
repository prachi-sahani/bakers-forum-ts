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
} from "../utilities/material-ui/material-components";
import { LogoutIcon } from "../utilities/material-ui/material-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/customHook";
import { logout } from "../redux/slices/authenticationSlice";
import { RootState } from "../redux/store";
const dropDownItem = [
  {
    title: "Feed",
    route: "/feed",
  },
  {
    title: "Explore",
    route: "/explore",
  },
  {
    title: "Bookmarks",
    route: "/bookmarks",
  },
  {
    title: "Notifications",
    route: "/notifications",
  },
  {
    title: "Profile",
    route: "/profile",
  },
];
export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authToken, userDetails } = useAppSelector(
    (state: RootState) => state.authentication
  );

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

        {(location.pathname === "/feed" ||
          location.pathname === "/profile") && (
          <Box
            sx={{
              flexGrow: 0,
              ml: "auto",
              pr: 1.5,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tooltip title="Logout">
              <IconButton onClick={() => dispatch(logout())}>
                <LogoutIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {authToken && (
          <Box
            sx={{
              flexGrow: 0,
              ml: "auto",
              display: { xs: "flex", md: "none" },
            }}
          >
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ height: "2rem", width: "2rem" }}>
                  {userDetails.firstName[0]}
                </Avatar>
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
              {dropDownItem.map(
                (item) =>
                  location.pathname !== item.route && (
                    <MenuItem
                      component="button"
                      key={item.title}
                      onClick={() => {
                        navigate(item.route);
                        handleCloseUserMenu();
                      }}
                      sx={{ pr: 3, width: "100%" }}
                    >
                      <Typography textAlign="center">{item.title}</Typography>
                    </MenuItem>
                  )
              )}
              <MenuItem
                component="button"
                key="Logout"
                onClick={() => {
                  dispatch(logout());
                  handleCloseUserMenu();
                }}
                sx={{ pr: 3 }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
